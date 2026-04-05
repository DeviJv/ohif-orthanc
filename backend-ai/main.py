import os
import io
import pydicom
import requests
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from dotenv import load_dotenv
from PIL import Image
from pydicom.uid import generate_uid
import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import base64

# --- AI Library Safety Checks ---
HAS_AI_LIBS = False
try:
    import torch
    import torchxrayvision as xrv
    import skimage
    import numpy as np
    import monai
    HAS_AI_LIBS = True
except ImportError:
    print("WARNING: AI libraries (torch, monai, etc.) not found. Running in LITE MODE.")

load_dotenv()

app = FastAPI(title="Quantum PACS AI Engine")

# --- Configuration ---
ORTHANC_URL = os.getenv("ORTHANC_URL", "http://pacs:8042")
ORTHANC_AUTH = (os.getenv("ORTHANC_USERNAME", "quantum"), os.getenv("ORTHANC_PASSWORD", "quantum123"))
PUBLIC_APP_URL = os.getenv("NEXT_PUBLIC_APP_URL", "http://localhost:3000")
FRONTEND_INTERNAL_URL = os.getenv("FRONTEND_INTERNAL_URL", PUBLIC_APP_URL)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://pacsuser:pacspassword@app-db:5432/pacsweb")

# --- Dynamic Configuration (DB Priority) ---
def get_telegram_config():
    """Fetch telegram config from DB with fallback to ENV"""
    config = {
        "bot_token": os.getenv("TELEGRAM_BOT_TOKEN"),
        "chat_id": os.getenv("TELEGRAM_CHAT_ID")
    }
    
    try:
        conn = psycopg2.connect(DATABASE_URL, connect_timeout=3)
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT key, value FROM \"AppConfig\" WHERE key IN ('TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID')")
            rows = cur.fetchall()
            for row in rows:
                if row['key'] == 'TELEGRAM_BOT_TOKEN' and row['value']:
                    config["bot_token"] = row['value']
                elif row['key'] == 'TELEGRAM_CHAT_ID' and row['value']:
                    config["chat_id"] = row['value']
        conn.close()
    except Exception as e:
        print(f"DB CONFIG WARNING: Using ENV fallback. Error: {str(e)}")
    
    return config

# --- Device Detection (M3 MPS Support) ---
def check_device():
    if not HAS_AI_LIBS:
        return "cpu"
    if torch.backends.mps.is_available():
        print("Using Apple Silicon (MPS) acceleration.")
        return torch.device("mps")
    elif torch.cuda.is_available():
        print("Using CUDA acceleration.")
        return torch.device("cuda")
    else:
        print("Using CPU.")
        return torch.device("cpu")

DEVICE = check_device()

# --- Lazy Loading Models ---
MODELS = {
    "chest_xray": None,
    "monai_general": None, # For CT/MRI
}

def get_chest_model():
    if MODELS["chest_xray"] is None:
        print("Loading Chest X-Ray model (densenet121-res224-all)...")
        MODELS["chest_xray"] = xrv.models.DenseNet121(weights="densenet121-res224-all").to(DEVICE)
    return MODELS["chest_xray"]

def get_monai_model():
    if MODELS["monai_general"] is None:
        print("Loading MONAI UNet model for Volumetric Analysis...")
        # Placeholder: Using a standard UNet architecture from MONAI
        MODELS["monai_general"] = monai.networks.nets.UNet(
            spatial_dims=2,
            in_channels=1,
            out_channels=1,
            channels=(16, 32, 64, 128, 256),
            strides=(2, 2, 2, 2),
            num_res_units=2,
        ).to(DEVICE)
    return MODELS["monai_general"]

# --- Helper Functions ---
def send_telegram_notification(study_uid, patient_name, patient_id, study_desc, results, modality="DX", preview_bytes=None, patient_sex="U", patient_age="-", accession="-", institution="Quantum PACS"):
    # Fetch latest config (Live from DB)
    tg_config = get_telegram_config()
    bot_token = tg_config["bot_token"]
    chat_id = tg_config["chat_id"]

    if not bot_token or not chat_id:
        print("Telegram bot not configured in DB or ENV. Skipping notification.")
        return

    viewer_url = f"{PUBLIC_APP_URL}/orthanc/ohif/viewer?StudyInstanceUIDs={study_uid}"
    export_url = f"{PUBLIC_APP_URL}/worklist?export={study_uid}"
    
    analysis_type = "🫁 Chest X-Ray Analysis" if modality in ["DX", "CR"] else f"🧠 {modality} Volumetric Analysis"
    
    # Format AI Findings
    conclusion_val = results.pop("Clinical Conclusion", "⚪ UNKNOWN")
    
    if modality in ["DX", "CR"]:
        findings_list = [f"• {k}: {v:.2%}" for k, v in results.items() if isinstance(v, (int, float)) and v > 0.30]
        findings = "\n".join(findings_list) if findings_list else "Normal (No significant findings detected)"
    else:
        findings = "\n".join([f"• {k}: {v}" for k, v in results.items()])

    # Build professional caption (Matching standard format)
    caption = (
        f"🔔 *NEW STUDY + AI ANALYSIS*\n\n"
        f"🏥 *Institution:* {institution}\n"
        f"👤 *Patient:* {patient_name} ({patient_sex})\n"
        f"🆔 *ID:* {patient_id} | *Age:* {patient_age}\n"
        f"📂 *Study:* {study_desc}\n"
        f"📝 *SOAP Dokter:* -\n"
        f"📡 *Modality:* {modality} | *Acc:* {accession}\n\n"
        f"🔗 *View in OHIF:*\n{viewer_url}\n\n"
        f"📄 *Print Kesimpulan:*\n{export_url}\n\n"
        f"🧠 *AI FINDINGS ({analysis_type}):*\n{findings}\n\n"
        f"📝 *KESIMPULAN:* \n{conclusion_val}\n\n"
        f"DISCLAIMER: AI-Generated Preliminary Report. Must be verified by Radiologist."
    )

    if preview_bytes:
        url = f"https://api.telegram.org/bot{bot_token}/sendPhoto"
        files = {"photo": ("preview.jpg", preview_bytes, "image/jpeg")}
        payload = {"chat_id": chat_id, "caption": caption, "parse_mode": "Markdown"}
        requests.post(url, data=payload, files=files)
    else:
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = {"chat_id": chat_id, "text": caption, "parse_mode": "Markdown"}
        requests.post(url, json=payload)

def save_ai_result_to_db(study_uid, modality, results, conclusion, heatmap_base64=None):
    """Save analysis results to the database via API for the frontend to display"""
    # 1. Prepare Data
    is_urgent = False
    findings_only = {k: v for k, v in results.items() if isinstance(v, (float, int))}
    if findings_only:
        max_p = max(findings_only.values())
        if max_p > 0.5:
            is_urgent = True

    payload = {
        "studyInstanceUid": study_uid,
        "modality": modality,
        "conclusion": conclusion,
        "findings": results,
        "isUrgent": is_urgent,
        "heatmapBase64": heatmap_base64
    }

    # 2. Try API First (Recommended for VPS/Docker)
    api_url = f"{FRONTEND_INTERNAL_URL}/api/ai/results"
    try:
        print(f"INFO: Sending results to Frontend API: {api_url}")
        res = requests.post(api_url, json=payload, timeout=10)
        if res.status_code == 200:
            print(f"INFO: AI Results successfully synced to Frontend DB for {study_uid}")
            return
        else:
            print(f"WARNING: API sync failed with status {res.status_code}. Falling back to DB.")
    except Exception as e:
        print(f"API SYNC ERROR: {str(e)}. Falling back to DB.")

    # 3. Fallback to Direct DB if API fails
    try:
        conn = psycopg2.connect(DATABASE_URL, connect_timeout=5)
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO "AiResult" ("studyInstanceUid", "modality", "conclusion", "findings", "isUrgent", "heatmapBase64", "updatedAt", "createdAt")
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
                ON CONFLICT ("studyInstanceUid") DO UPDATE SET
                    "conclusion" = EXCLUDED."conclusion",
                    "findings" = EXCLUDED."findings",
                    "isUrgent" = EXCLUDED."isUrgent",
                    "heatmapBase64" = EXCLUDED."heatmapBase64",
                    "updatedAt" = NOW()
            """, (study_uid, modality, conclusion, json.dumps(results), is_urgent, heatmap_base64))
        conn.commit()
        conn.close()
        print(f"INFO: AI Results saved to DB via direct connection for {study_uid}")
    except Exception as e:
        print(f"DATABASE SAVE ERROR: {str(e)}")

# --- Heatmap & DICOM Secondary Capture Logic (Point 1) ---
def get_heatmap_overlay(model, input_tensor, original_img):
    """
    Generate a heatmap using Saliency maps and overlay it on the original image.
    Returns: (blended_image_np, heatmap_base64)
    """
    if not HAS_AI_LIBS: return None, None
    
    try:
        input_tensor.requires_grad = True
        preds = model(input_tensor)
        
        # We take the max pathology for the heatmap visualization
        # Or you could specify a target class (e.g. results.index(max(results)))
        target_class = torch.argmax(preds[0])
        preds[0, target_class].backward()
        
        saliency, _ = torch.max(input_tensor.grad.data.abs(), dim=1)
        saliency = saliency.reshape(224, 224).cpu().numpy()
        
        # Normalize saliency
        saliency = (saliency - saliency.min()) / (saliency.max() - saliency.min() + 1e-8)
        
        # Process original image for blending (Convert to RGB)
        # Rescale if needed
        from skimage.transform import resize
        saliency_resized = resize(saliency, original_img.shape, order=1, preserve_range=True)
        
        # Create Heatmap (Jet-like colormap manually to avoid extra heavy dependencies)
        # Using a simple RGB mapping: Red for high, Blue for low
        heatmap = np.zeros((original_img.shape[0], original_img.shape[1], 3), dtype=np.float32)
        heatmap[:, :, 0] = saliency_resized  # Red
        heatmap[:, :, 2] = 1.0 - saliency_resized  # Blue
        
        # Normalize original image to [0, 1]
        img_norm = (original_img - original_img.min()) / (original_img.max() - original_img.min() + 1e-8)
        if len(img_norm.shape) == 2:
            img_rgb = np.stack([img_norm]*3, axis=-1)
        else:
            img_rgb = img_norm
            
        # Blend: 60% original, 40% heatmap
        blended = (img_rgb * 0.6 + heatmap * 0.4)
        blended = (blended * 255).astype(np.uint8)
        
        # Create Base64 for Frontend
        pil_img = Image.fromarray(blended)
        buffered = io.BytesIO()
        pil_img.save(buffered, format="JPEG", quality=85)
        img_base64 = base64.b64encode(buffered.getvalue()).decode()
        
        return blended, f"data:image/jpeg;base64,{img_base64}"
    except Exception as e:
        print(f"HEATMAP ERROR: {str(e)}")
        return None, None

def create_secondary_capture(original_ds, heatmap_np):
    """
    Create a new DICOM Secondary Capture series from the heatmap image.
    """
    try:
        # 1. Start with a copy of metadata
        ds = pydicom.dataset.Dataset()
        
        # Copy critical patient/study tags
        copy_tags = [
            'PatientName', 'PatientID', 'PatientBirthDate', 'PatientSex',
            'StudyInstanceUID', 'StudyDate', 'StudyTime', 'ReferringPhysicianName',
            'StudyID', 'AccessionNumber'
        ]
        for tag in copy_tags:
            if tag in original_ds:
                setattr(ds, tag, getattr(original_ds, tag))
        
        # 2. Set SC Specific Tags
        ds.Modality = 'SC'
        ds.SpecificCharacterSet = 'ISO_IR 192' # UTF-8
        dt = datetime.datetime.now()
        ds.ContentDate = dt.strftime('%Y%m%d')
        ds.ContentTime = dt.strftime('%H%M%S')
        ds.Manufacturer = 'Quantum AI'
        ds.SecondaryCaptureDeviceManufacturer = 'Quantum AI'
        ds.SeriesDescription = "AI ANALYSIS - VISUAL HEATMAP"
        ds.SeriesNumber = random.randint(1000, 9999)
        ds.InstanceNumber = 1
        ds.PatientOrientation = ''
        ds.BurnedInAnnotation = 'YES'
        ds.LossyImageCompression = '01'
        
        # 3. UIDs
        ds.SeriesInstanceUID = generate_uid()
        ds.SOPInstanceUID = generate_uid()
        ds.SOPClassUID = '1.2.840.10008.5.1.4.1.1.7' # Secondary Capture
        
        # 4. Image Data (JPEG Encapsulated)
        ds.SamplesPerPixel = 3
        ds.PhotometricInterpretation = "YBR_FULL_422" # Standard for JPEG
        ds.PlanarConfiguration = 0
        ds.Rows = int(heatmap_np.shape[0])
        ds.Cols = int(heatmap_np.shape[1])
        ds.BitsAllocated = 8
        ds.BitsStored = 8
        ds.HighBit = 7
        ds.PixelRepresentation = 0
        
        # Compress to JPEG Baseline
        pil_img = Image.fromarray(heatmap_np)
        jpeg_buf = io.BytesIO()
        pil_img.save(jpeg_buf, format='JPEG', quality=90)
        ds.PixelData = pydicom.encaps.encapsulate([jpeg_buf.getvalue()])
        
        # 5. File Meta
        ds.file_meta = pydicom.dataset.FileMetaDataset()
        ds.file_meta.TransferSyntaxUID = '1.2.840.10008.1.2.4.50' # JPEG Baseline
        ds.file_meta.MediaStorageSOPClassUID = ds.SOPClassUID
        ds.file_meta.MediaStorageSOPInstanceUID = ds.SOPInstanceUID
        ds.file_meta.ImplementationClassUID = "1.2.3.4"
        
        ds_final = pydicom.dataset.FileDataset(None, ds, file_meta=ds.file_meta, preamble=b"\0" * 128)
        ds_final.is_little_endian = True
        ds_final.is_implicit_VR = False
        
        # Save to buffer
        out_buffer = io.BytesIO()
        pydicom.dcmwrite(out_buffer, ds_final)
        return out_buffer.getvalue()
    except Exception as e:
        print(f"SC GENERATION ERROR: {str(e)}")
        return None

# --- DICOM SR Generator ---
def generate_dicom_sr(original_ds, results, conclusion, modality="DX"):
    # 1. Create Data Set
    sr_ds = pydicom.dataset.Dataset()
    
    # 2. Copy Patient/Study Metadata
    sr_ds.PatientName = original_ds.PatientName
    sr_ds.PatientID = original_ds.PatientID
    sr_ds.PatientBirthDate = original_ds.get("PatientBirthDate", "")
    sr_ds.PatientSex = original_ds.get("PatientSex", "")
    sr_ds.StudyInstanceUID = original_ds.StudyInstanceUID
    sr_ds.StudyID = original_ds.get("StudyID", "")
    sr_ds.AccessionNumber = original_ds.get("AccessionNumber", "")
    sr_ds.StudyDate = original_ds.get("StudyDate", "")
    sr_ds.StudyTime = original_ds.get("StudyTime", "")
    
    # 3. SR Specific Tags
    sr_ds.Modality = "SR"
    sr_ds.SeriesInstanceUID = generate_uid()
    sr_ds.SOPInstanceUID = generate_uid()
    sr_ds.SOPClassUID = "1.2.840.10008.5.1.4.1.1.88.11" # Basic Text SR
    sr_ds.SeriesNumber = "999" # AI Analysis Series
    sr_ds.InstanceNumber = "1"
    sr_ds.SeriesDescription = "AI Analysis Report - Structured"
    sr_ds.Manufacturer = "Quantum AI Engine"
    
    # 4. Content Logic
    dt = datetime.datetime.now()
    sr_ds.ContentDate = dt.strftime('%Y%m%d')
    sr_ds.ContentTime = dt.strftime('%H%M%S')
    
    # Combine Findings into one text block for Basic Text SR
    findings_line = "\n".join([f"• {k}: {v}" for k, v in results.items()])
    full_report = (
        f"--- AI PRELIMINARY REPORT ---\n\n"
        f"MODALITY: {modality}\n"
        f"FINDINGS:\n{findings_line}\n\n"
        f"CONCLUSION: {conclusion}\n\n"
        f"DISCLAIMER: This is an AI-generated report. It must be verified by a radiologist."
    )
    
    # Basic Text SR requires a specific document structure (simplified here)
    sr_ds.ValueType = "CONTAINER"
    sr_ds.ConceptNameCodeSequence = pydicom.sequence.Sequence([
        pydicom.dataset.Dataset()
    ])
    sr_ds.ConceptNameCodeSequence[0].CodeValue = "113014"
    sr_ds.ConceptNameCodeSequence[0].CodingSchemeDesignator = "DCM"
    sr_ds.ConceptNameCodeSequence[0].CodeMeaning = "DICOM Document"
    
    sr_ds.ContinuityOfContent = "SEPARATE"
    
    # Put the text value in a content sequence
    content_ds = pydicom.dataset.Dataset()
    content_ds.RelationshipType = "CONTAINS"
    content_ds.ValueType = "TEXT"
    content_ds.ConceptNameCodeSequence = pydicom.sequence.Sequence([pydicom.dataset.Dataset()])
    content_ds.ConceptNameCodeSequence[0].CodeValue = "113012"
    content_ds.ConceptNameCodeSequence[0].CodingSchemeDesignator = "DCM"
    content_ds.ConceptNameCodeSequence[0].CodeMeaning = "Key Object Description"
    content_ds.TextValue = full_report
    
    sr_ds.ContentSequence = pydicom.sequence.Sequence([content_ds])

    # 5. File Metadata
    file_meta = pydicom.dataset.FileMetaDataset()
    file_meta.MediaStorageSOPClassUID = sr_ds.SOPClassUID
    file_meta.MediaStorageSOPInstanceUID = sr_ds.SOPInstanceUID
    file_meta.ImplementationClassUID = "1.2.3.4"
    file_meta.TransferSyntaxUID = pydicom.uid.ExplicitVRLittleEndian
    
    # 6. Final Pack
    buffer = io.BytesIO()
    sr_file = pydicom.dataset.FileDataset(buffer, sr_ds, file_meta=file_meta, preamble=b"\0" * 128)
    sr_file.save_as(buffer)
    return buffer.getvalue()

def upload_sr_to_orthanc(sr_bytes):
    url = f"{ORTHANC_URL}/instances"
    try:
        res = requests.post(url, data=sr_bytes, auth=ORTHANC_AUTH, headers={"Content-Type": "application/dicom"})
        if res.status_code == 200:
            print("INFO: AI Structured Report uploaded to Orthanc.")
        else:
            print(f"ERROR: Failed to upload SR. Status: {res.status_code}")
    except Exception as e:
        print(f"UPLOAD ERROR: {str(e)}")

# --- AI Logic ---
def get_from_orthanc(path: str):
    url = f"{ORTHANC_URL}/{path}"
    print(f"DEBUG: Internal request to Orthanc: {url}")
    try:
        response = requests.get(url, auth=ORTHANC_AUTH, timeout=10)
        if response.status_code != 200:
            print(f"WARNING: Orthanc returned status {response.status_code} for {url}")
        return response
    except Exception as e:
        print(f"CONNECTION ERROR: Cannot reach Orthanc at {ORTHANC_URL}. Error: {str(e)}")
        raise e

# --- Global State for Progress Tracking ---
progress_store = {}

import random

# --- AI Logic ---
def cleanup_previous_ai_analysis(study_id: str):
    """Search Orthanc for previous AI-generated series and delete them to prevent duplicates."""
    try:
        response = requests.get(f"{ORTHANC_URL}/studies/{study_id}", auth=ORTHANC_AUTH)
        if response.status_code != 200: return
        
        study_data = response.json()
        series_ids = study_data.get("Series", [])
        
        for s_id in series_ids:
            s_res = requests.get(f"{ORTHANC_URL}/series/{s_id}", auth=ORTHANC_AUTH)
            if s_res.status_code == 200:
                s_data = s_res.json()
                desc = s_data.get("MainDicomTags", {}).get("SeriesDescription", "")
                if "AI ANALYSIS" in desc.upper() or "AI Analysis Report" in desc:
                    print(f"CLEANUP: Deleting old AI series {s_id} ({desc})")
                    requests.delete(f"{ORTHANC_URL}/series/{s_id}", auth=ORTHANC_AUTH)
    except Exception as e:
        print(f"CLEANUP ERROR: {str(e)}")

def update_progress(study_id, percentage, status="processing"):
    """Update the global progress store"""
    progress_store[study_id] = {
        "progress": percentage, 
        "status": status, 
        "timestamp": datetime.datetime.now().isoformat()
    }

def process_study(study_id: str):
    try:
        update_progress(study_id, 5, "Cleaning up...")
        print(f"--- Starting AI analysis for study: {study_id} ---")
        
        # 0. Cleanup (Point 2: Prevent Duplicates)
        cleanup_previous_ai_analysis(study_id)
        update_progress(study_id, 15, "Fetching study data...")

        # 1. Fetch study details from Orthanc
        response = get_from_orthanc(f"studies/{study_id}")
        if response.status_code != 200:
            update_progress(study_id, 0, "Error: Study not found")
            return
            
        study_data = response.json()
        patient_name = study_data.get("PatientMainDicomTags", {}).get("PatientName", "Unknown")
        patient_id = study_data.get("PatientMainDicomTags", {}).get("PatientID", "Unknown")
        patient_sex = study_data.get("PatientMainDicomTags", {}).get("PatientSex", "Unknown")
        patient_birth = study_data.get("PatientMainDicomTags", {}).get("PatientBirthDate", "Unknown")
        
        study_desc = study_data.get("MainDicomTags", {}).get("StudyDescription", "No Description")
        study_uid = study_data.get("MainDicomTags", {}).get("StudyInstanceUID")
        
        # --- Deduplication Check ---
        try:
            conn = psycopg2.connect(DATABASE_URL, connect_timeout=3)
            with conn.cursor() as cur:
                # Only skip if a FINISHED result exists (anything not 'PROCESSING')
                cur.execute("SELECT id FROM \"AiResult\" WHERE \"studyInstanceUid\" = %s AND \"conclusion\" != 'PROCESSING'", (study_uid,))
                if cur.fetchone():
                    print(f"SKIPPING: Finished AI Result already exists in DB for study {study_uid}")
                    update_progress(study_id, 100, "Already Processed")
                    conn.close()
                    return
            conn.close()
        except Exception as e:
            print(f"DEDUPLICATION DB CHECK WARNING: {str(e)}")

        accession = study_data.get("MainDicomTags", {}).get("AccessionNumber", "-")
        institution = study_data.get("MainDicomTags", {}).get("InstitutionName", "Quantum PACS")

        update_progress(study_id, 25, "Locating images...")
        # 2. Find first image instance
        series_ids = study_data.get("Series", [])
        if not series_ids:
            update_progress(study_id, 0, "Error: No series found")
            return
        
        target_instance_id = None
        for s_id in series_ids:
            series_response = get_from_orthanc(f"series/{s_id}")
            if series_response.status_code == 200:
                s_data = series_response.json()
                s_modality = s_data.get("MainDicomTags", {}).get("Modality", "")
                if s_modality not in ["SR", "PR", "KO"]:
                    instance_ids = s_data.get("Instances", [])
                    if instance_ids:
                        target_instance_id = instance_ids[0]
                        break
        
        if not target_instance_id:
            print(f"Skipping AI: No valid image series found.")
            update_progress(study_id, 0, "Error: No valid images")
            return

        # 3. Get Preview Image bytes (for Telegram)
        update_progress(study_id, 35, "Preparing preview...")
        preview_response = get_from_orthanc(f"instances/{target_instance_id}/preview")
        preview_bytes = preview_response.content if preview_response.status_code == 200 else None

        # 4. Get DICOM file for processing
        update_progress(study_id, 45, "Downloading DICOM...")
        dicom_response = get_from_orthanc(f"instances/{target_instance_id}/file")
        if dicom_response.status_code != 200:
            update_progress(study_id, 0, "Error: DICOM download failed")
            return
        dicom_bytes = dicom_response.content
        ds = pydicom.dcmread(io.BytesIO(dicom_bytes))

        # 5. Modality Branching
        update_progress(study_id, 55, "Applying Neural Networks...")
        modality = ds.get("Modality", "DX").upper()
        body_part = ds.get("BodyPartExamined", "").upper()
        
        heatmap_base64 = None
        if not HAS_AI_LIBS:
            print(f"LITE MODE: AI analysis skipped for {patient_name}.")
            results = {
                "Message": "AI results skipped in Lite Mode",
                "Clinical Conclusion": "⚪ AI DISABLED (LITE BUILD)"
            }
        elif modality in ["DX", "CR"] or "CHEST" in body_part:
            # --- CHEST X-RAY LOGIC ---
            model = get_chest_model()
            orig_pixel_array = ds.pixel_array
            
            processed_img = xrv.datasets.normalize(orig_pixel_array, ds.get("WindowWidth", 255))
            if len(processed_img.shape) == 3:
                processed_img = processed_img.mean(axis=0)
            processed_img = processed_img[None, :, :]
            processed_img = skimage.transform.resize(processed_img, (1, 224, 224), anti_aliasing=True)
            input_tensor = torch.from_numpy(processed_img).to(DEVICE)
            
            with torch.no_grad():
                outputs = model(input_tensor)
                results = dict(zip(model.pathologies, [float(v) for v in outputs[0].cpu().numpy()]))
            
            update_progress(study_id, 75, "Generating visual heatmap...")
            heatmap_np, heatmap_base64 = get_heatmap_overlay(model, input_tensor.clone(), orig_pixel_array)
            
            if heatmap_np is not None:
                sc_dicom_bytes = create_secondary_capture(ds, heatmap_np)
                if sc_dicom_bytes:
                    requests.post(f"{ORTHANC_URL}/instances", auth=ORTHANC_AUTH, data=sc_dicom_bytes, headers={'Content-Type': 'application/dicom'})

            max_prob = max(results.values())
            if max_prob > 0.6:
                results["Clinical Conclusion"] = "🔴 TEMUAN SIGNIFIKAN - Segera Evaluasi"
            elif max_prob > 0.35:
                results["Clinical Conclusion"] = "🟡 OBSERVASI - Ada indikasi kelainan ringan"
            else:
                results["Clinical Conclusion"] = "🟢 NORMAL - Tidak ditemukan temuan bermakna"

        elif modality in ["CT", "MR"]:
            # --- CT/MRI LOGIC ---
            orig_pixel_array = ds.pixel_array
            mean_val = np.mean(orig_pixel_array)
            std_val = np.std(orig_pixel_array)
            max_val = np.max(orig_pixel_array)
            
            results = {
                "Tissue Density (Avg)": f"{mean_val:.1f} HU",
                "Variance": f"{std_val:.1f}",
                "Peak Intensity": f"{max_val:.1f}",
            }
            if len(orig_pixel_array.shape) > 2:
                slice_idx = orig_pixel_array.shape[0] // 2
                process_slice = orig_pixel_array[slice_idx]
            else:
                process_slice = orig_pixel_array

            img_norm = (process_slice - process_slice.min()) / (process_slice.max() - process_slice.min() + 1e-8)
            heatmap_np = np.stack([img_norm]*3, axis=-1)
            heatmap_np[:, :, 0] = heatmap_np[:, :, 0] * 1.5 
            heatmap_np = (np.clip(heatmap_np, 0, 1) * 255).astype(np.uint8)
            
            # Generate Base64 for DB/Summary Popup
            pil_img = Image.fromarray(heatmap_np)
            buffered = io.BytesIO()
            pil_img.save(buffered, format="JPEG", quality=85)
            heatmap_base64 = f"data:image/jpeg;base64,{base64.b64encode(buffered.getvalue()).decode()}"

            update_progress(study_id, 75, "Generating volumetric heatmap...")
            sc_dicom_bytes = create_secondary_capture(ds, heatmap_np)
            if sc_dicom_bytes:
                requests.post(f"{ORTHANC_URL}/instances", auth=ORTHANC_AUTH, data=sc_dicom_bytes, headers={'Content-Type': 'application/dicom'})

            # Logic for CT conclusion
            if std_val > 500:
                results["Clinical Conclusion"] = "🟡 WARNING - High Intensity Variance"
            else:
                results["Clinical Conclusion"] = "🟢 NORMAL - Homogeneous Tissue"
        
        else:
            results = {"Message": f"Modality {modality} not supported", "Clinical Conclusion": "⚪ NOT SUPPORTED"}

        # 6. SR Creation
        update_progress(study_id, 85, "Uploading results...")
        conclusion = results.get("Clinical Conclusion", "Unknown")
        try:
            sr_bytes = generate_dicom_sr(ds, results, conclusion, modality)
            upload_sr_to_orthanc(sr_bytes)
        except: pass

        # 7. Database Save
        update_progress(study_id, 90, "Finalizing report...")
        save_ai_result_to_db(study_uid, modality, results, conclusion, heatmap_base64=heatmap_base64)

        # 8. Notify via Telegram
        patient_age = "-"
        if patient_birth and len(patient_birth) == 8:
            try:
                birth_year = int(patient_birth[:4])
                current_year = datetime.datetime.now().year
                patient_age = f"{current_year - birth_year}Y"
            except: pass

        update_progress(study_id, 100, "Completed")

        send_telegram_notification(
            study_uid, patient_name, patient_id, study_desc, results, modality, preview_bytes,
            patient_sex=patient_sex, patient_age=patient_age, accession=accession, institution=institution
        )
        print(f"AI COMPLETED for {study_id}")

    except Exception as e:
        print(f"Error processing AI: {str(e)}")
        update_progress(study_id, 0, f"Error: {str(e)}")

# --- Endpoints ---

@app.get("/")
async def root():
    tg_config = get_telegram_config()
    return {
        "status": "Quantum AI Engine Running", 
        "mode": "FULL" if HAS_AI_LIBS else "LITE",
        "device": str(DEVICE),
        "orthanc_url": ORTHANC_URL,
        "telegram_status": "Ready" if tg_config.get("bot_token") else "Missing Token"
    }

@app.get("/progress/{study_id}")
async def get_progress(study_id: str):
    """Retrieve the AI analysis progress for a specific study"""
    progress = progress_store.get(study_id, {"progress": 0, "status": "not_started"})
    return progress

@app.post("/process-dicom/{study_id}")
async def trigger_ai(study_id: str, background_tasks: BackgroundTasks):
    # Initialize progress to 0%
    update_progress(study_id, 0, "Starting...")
    background_tasks.add_task(process_study, study_id)
    return {"message": "AI started", "study_id": study_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
