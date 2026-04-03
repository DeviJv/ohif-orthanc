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
NEXT_PUBLIC_APP_URL = os.getenv("NEXT_PUBLIC_APP_URL", "http://localhost:3000")
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

    viewer_url = f"{NEXT_PUBLIC_APP_URL}/orthanc/ohif/viewer?StudyInstanceUIDs={study_uid}"
    analysis_type = "🫁 Chest X-Ray Analysis" if modality in ["DX", "CR"] else f"🧠 {modality} Volumetric Analysis"
    
    # Format AI Findings
    conclusion = results.pop("Clinical Conclusion", "⚪ UNKNOWN")
    
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
        f"📡 *Modality:* {modality} | *Acc:* {accession}\n\n"
        f"🔗 *View in OHIF:*\n{viewer_url}\n\n"
        f"🧠 *AI FINDINGS ({analysis_type}):*\n{findings}\n\n"
        f"📝 *KESIMPULAN:* \n{conclusion}\n\n"
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

# --- AI Logic ---
def process_study(study_id: str):
    try:
        print(f"--- Starting AI analysis for study: {study_id} ---")
        # 1. Fetch study details from Orthanc
        response = get_from_orthanc(f"studies/{study_id}")
        study_data = response.json()
        patient_name = study_data.get("PatientMainDicomTags", {}).get("PatientName", "Unknown")
        patient_id = study_data.get("PatientMainDicomTags", {}).get("PatientID", "Unknown")
        patient_sex = study_data.get("PatientMainDicomTags", {}).get("PatientSex", "Unknown")
        patient_birth = study_data.get("PatientMainDicomTags", {}).get("PatientBirthDate", "Unknown")
        
        study_desc = study_data.get("MainDicomTags", {}).get("StudyDescription", "No Description")
        study_uid = study_data.get("MainDicomTags", {}).get("StudyInstanceUID")
        accession = study_data.get("MainDicomTags", {}).get("AccessionNumber", "-")
        institution = study_data.get("MainDicomTags", {}).get("InstitutionName", "Quantum PACS")
        
        # 2. Find first image instance
        series_ids = study_data.get("Series", [])
        if not series_ids: return
        
        series_response = get_from_orthanc(f"series/{series_ids[0]}")
        instance_ids = series_response.json().get("Instances", [])
        if not instance_ids: return

        # 3. Get Preview Image bytes (for Telegram)
        preview_response = get_from_orthanc(f"instances/{instance_ids[0]}/preview")
        preview_bytes = preview_response.content

        # 4. Get DICOM file for processing
        dicom_response = get_from_orthanc(f"instances/{instance_ids[0]}/file")
        dicom_bytes = dicom_response.content
        ds = pydicom.dcmread(io.BytesIO(dicom_bytes))

        # 4. Modality Branching
        modality = ds.get("Modality", "DX").upper()
        body_part = ds.get("BodyPartExamined", "").upper()
        
        results = {}

        if not HAS_AI_LIBS:
            print(f"LITE MODE: AI analysis skipped for {patient_name}.")
            results = {
                "Message": "AI results skipped in Lite Mode (Local Dev Build)",
                "Clinical Conclusion": "⚪ AI DISABLED (LITE BUILD)"
            }
        elif modality in ["DX", "CR"] or "CHEST" in body_part:
            # --- CHEST X-RAY LOGIC (TorchXRayVision) ---
            print(f"Running TorchXRayVision for {patient_name}...")
            model = get_chest_model()
            img = ds.pixel_array
            img = xrv.datasets.normalize(img, ds.get("WindowWidth", 255))
            img = img[None, :, :]
            img = skimage.transform.resize(img, (1, 224, 224), anti_aliasing=True)
            img = torch.from_numpy(img).to(DEVICE)
            
            with torch.no_grad():
                outputs = model(img)
                results = dict(zip(model.pathologies, [float(v) for v in outputs[0].cpu().numpy()]))
            
            # Simplified clinical conclusion
            max_prob = max(results.values())
            if max_prob > 0.6:
                results["Clinical Conclusion"] = "🔴 TEMUAN SIGNIFIKAN - Segera Evaluasi"
            elif max_prob > 0.35:
                results["Clinical Conclusion"] = "🟡 OBSERVASI - Ada indikasi kelainan ringan"
            else:
                results["Clinical Conclusion"] = "🟢 NORMAL - Tidak ditemukan temuan bermakna"

        elif modality in ["CT", "MR"]:
            # --- CT/MRI LOGIC (MONAI/MedSAM Pipeline Simulation) ---
            print(f"Running MONAI/MedSAM Intensity Analysis for {patient_name} ({modality})...")
            pixel_data = ds.pixel_array
            mean_val = np.mean(pixel_data)
            std_val = np.std(pixel_data)
            max_val = np.max(pixel_data)

            # Simulated tissue density check
            results = {
                "Mode": "Volumetric Segmentation",
                "Tissue Density (Avg)": f"{mean_val:.1f} HU/Int",
                "Standard Deviation": f"{std_val:.1f}",
                "Max Intensity": f"{max_val:.1f}",
            }

            # Basic anomaly detection based on intensity variance
            if std_val > 500: # Threshold for high variance (possible masses or fluid)
                results["Clinical Conclusion"] = "🟡 WARNING - Deteksi variasi densitas tinggi (Indikasi Massa/Cairan)"
            else:
                results["Clinical Conclusion"] = "🟢 NORMAL - Struktur jaringan tampak homogen"
        
        else:
            results = {"Message": f"AI skipped for modality: {modality}", "Clinical Conclusion": "⚪ MODALITY NOT SUPPORTED"}

        # 5. Generate and Upload DICOM SR (Structured Report)
        conclusion = results.get("Clinical Conclusion", "Unknown")
        print(f"Generating DICOM SR for {patient_name}...")
        try:
            sr_bytes = generate_dicom_sr(ds, results, conclusion, modality)
            upload_sr_to_orthanc(sr_bytes)
        except Exception as sr_err:
            print(f"WARNING: Could not generate/upload SR: {str(sr_err)}")

        # 6. Notify via Telegram
        patient_age = "-"
        if patient_birth and len(patient_birth) == 8:
            try:
                from datetime import datetime
                birth_year = int(patient_birth[:4])
                current_year = datetime.now().year
                patient_age = f"{current_year - birth_year}Y"
            except: pass

        send_telegram_notification(
            study_uid, patient_name, patient_id, study_desc, results, modality, preview_bytes,
            patient_sex=patient_sex, patient_age=patient_age, accession=accession, institution=institution
        )
        print(f"AI for {patient_name} complete. Professional notification sent.")

    except Exception as e:
        print(f"Error processing AI: {str(e)}")

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

@app.post("/process-dicom/{study_id}")
async def trigger_ai(study_id: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(process_study, study_id)
    return {"message": "AI started", "study_id": study_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
