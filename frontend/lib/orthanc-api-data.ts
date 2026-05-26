export interface ApiEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  category: string;
  parameters?: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  response?: string;
  exampleUrl?: string;
}

export const ORTHANC_API_CATEGORIES = [
  "Patients",
  "Studies",
  "Series",
  "Instances",
  "System & Tools",
  "DICOMweb",
  "Radiology Reports",
  "Create ACSN",
  "Connect Devices",
];

export const ORTHANC_API_DATA: ApiEndpoint[] = [
  // PATIENTS
  {
    id: "patients-list",
    method: "GET",
    path: "/patients",
    description: "List all patients in the PACS server. Returns a list of patient Orthanc IDs.",
    category: "Patients",
    response: '["529e3a6a-73d6-4e52-a58d-71b3e8e7a0a0", ...]',
  },
  {
    id: "patient-details",
    method: "GET",
    path: "/patients/{id}",
    description: "Get comprehensive details about a specific patient including their studies.",
    category: "Patients",
    parameters: [{ name: "id", type: "string", description: "Orthanc Patient ID", required: true }],
  },
  {
    id: "patient-studies",
    method: "GET",
    path: "/patients/{id}/studies",
    description: "List all studies belonging to a specific patient.",
    category: "Patients",
  },
  {
    id: "patient-delete",
    method: "DELETE",
    path: "/patients/{id}",
    description: "Permanently delete a patient and all their associated studies/series/instances.",
    category: "Patients",
  },

  // STUDIES
  {
    id: "studies-list",
    method: "GET",
    path: "/studies",
    description: "List all studies available in the PACS server.",
    category: "Studies",
  },
  {
    id: "study-details",
    method: "GET",
    path: "/studies/{id}",
    description: "Get full details of a study, including the list of series IDs it contains.",
    category: "Studies",
  },
  {
    id: "study-instances",
    method: "GET",
    path: "/studies/{id}/instances",
    description: "List all instances (images) in a given study.",
    category: "Studies",
  },
  {
    id: "study-archive",
    method: "GET",
    path: "/studies/{id}/archive",
    description: "Download the entire study as a ZIP file containing DICOM files.",
    category: "Studies",
  },
  {
    id: "study-delete",
    method: "DELETE",
    path: "/studies/{id}",
    description: "Delete a specific study.",
    category: "Studies",
  },

  // SERIES
  {
    id: "series-list",
    method: "GET",
    path: "/series",
    description: "List all series in the PACS.",
    category: "Series",
  },
  {
    id: "series-details",
    method: "GET",
    path: "/series/{id}",
    description: "Get details for a specific series, including its instance IDs.",
    category: "Series",
  },
  {
    id: "series-ordered-instances",
    method: "GET",
    path: "/series/{id}/ordered-instances",
    description: "Get list of instances in a series, sorted by instance number.",
    category: "Series",
  },

  // INSTANCES
  {
    id: "instances-list",
    method: "GET",
    path: "/instances",
    description: "List all instances.",
    category: "Instances",
  },
  {
    id: "instance-preview",
    method: "GET",
    path: "/instances/{id}/preview",
    description: "Get a JPEG preview of the DICOM instance (default frame).",
    category: "Instances",
  },
  {
    id: "instance-tags",
    method: "GET",
    path: "/instances/{id}/tags",
    description: "Get all DICOM tags for the specific instance as a JSON object.",
    category: "Instances",
  },
  {
    id: "instance-file",
    method: "GET",
    path: "/instances/{id}/file",
    description: "Download the raw .dcm file for the instance.",
    category: "Instances",
  },

  // SYSTEM & TOOLS
  {
    id: "system-info",
    method: "GET",
    path: "/system",
    description: "Get server metrics, version info, and storage status.",
    category: "System & Tools",
  },
  {
    id: "statistics",
    method: "GET",
    path: "/statistics",
    description: "Get overall storage size, patient count, and study count.",
    category: "System & Tools",
    response: '{"CountInstances": 125, "CountPatients": 12, "CountSeries": 45, "CountStudies": 15, "TotalDiskSize": "450MB"}',
  },
  {
    id: "changes",
    method: "GET",
    path: "/changes",
    description: "Get list of recent changes (new instances, deletions, etc.). Useful for sync.",
    category: "System & Tools",
  },

  // DICOMWEB
  {
    id: "qido-rs",
    method: "GET",
    path: "/dicom-web/studies",
    description: "Search for studies based on DICOM query parameters (QIDO-RS).",
    category: "DICOMweb",
  },
  {
    id: "wado-rs",
    method: "GET",
    path: "/dicom-web/studies/{study}/series/{series}/instances/{instance}",
    description: "Retrieve a specific instance as DICOM or other media type (WADO-RS).",
    category: "DICOMweb",
  },
  {
    id: "stow-rs",
    method: "POST",
    path: "/dicom-web/studies",
    description: "Upload DICOM files via DICOMweb standard (STOW-RS).",
    category: "DICOMweb",
  },

  // CREATE ORDER (SIMRS Integration)
  {
    id: "create-order-acsn",
    method: "POST",
    path: "/api/external/study/accession",
    description: "Update study Accession Number using Patient ID or Order ID, and Study Date. Designed for SIMRS integration when StudyInstanceUID is unknown.",
    category: "Create ACSN",
    parameters: [
      { name: "patientId", type: "string", description: "Patient ID (DICOM PatientID). Opsional jika menggunakan orderId.", required: false },
      { name: "orderId", type: "string", description: "Order ID (StudyID). Opsional jika menggunakan patientId.", required: false },
      { name: "studyDate", type: "string", description: "Required Study Date (Format: YYYYMMDD)", required: true },
      { name: "accessionNumber", type: "string", description: "The new Accession Number to assign", required: true },
      { name: "patientName", type: "string", description: "Optional Patient Name for better matching", required: false },
      { name: "description", type: "string", description: "Optional Study Description to narrow down search", required: false },
    ],
    response: '{"success": true, "message": "Accession Number updated", "newStudyId": "..."}'
  },

  // CONNECT DEVICES
  {
    id: "how-to-connect-devices",
    method: "GET",
    path: "Configuration",
    description: "Informasi konfigurasi untuk menghubungkan alat radiologi (Modality) ke PACS Quantum.",
    category: "Connect Devices",
    parameters: [
      { name: "AE Title", type: "string", description: "QTM", required: true },
      { name: "DICOM Port", type: "number", description: "4242", required: true },
      { name: "IP Address", type: "string", description: "your-server-ip", required: true },
    ],
  },

  // RADIOLOGY REPORTS (SIMRS Integration)
  {
    id: "get-radiology-report",
    method: "GET",
    path: "/api/external/reports",
    description: "Ambil data laporan radiologi (hasil bacaan) untuk integrasi SIMRS. Jika parameter dikosongkan, API akan mengembalikan SEMUA laporan (List All). Gunakan parameter patientId dan studyDate untuk mengambil detail spesifik.",
    category: "Radiology Reports",
    parameters: [
      { name: "patientId", type: "string", description: "ID Pasien (Opsional, gunakan bersama studyDate untuk mengambil 1 detail spesifik)", required: false },
      { name: "studyDate", type: "string", description: "Tanggal Pemeriksaan Format YYYYMMDD (Opsional)", required: false },
    ],
    response: `{
  "success": true,
  "data": {
    "patientId": "12345",
    "patientName": "JOHN DOE",
    "examType": "Rontgen Thorax",
    "findings": "Normal Cor dan Pulmo...",
    "conclusion": "Normal",
    "measurementImages": [
       { "name": "screenshot1.png", "base64": "data:image/png;base64,..." }
    ],
    "doctor": { "name": "dr. Ahmad, Sp.Rad" }
  }
}`
  },
  {
    id: "get-report-by-accession",
    method: "GET",
    path: "/api/external/reports/by-accession",
    description: "Ambil detail laporan radiologi menggunakan Accession Number. API ini melakukan pencarian spesifik (exact match) dan mengembalikan 1 data laporan lengkap beserta gambar hasil (measurementImages).",
    category: "Radiology Reports",
    parameters: [
      { name: "accessionNumber", type: "string", description: "Accession Number dari studi terkait.", required: true },
    ],
    response: `{
  "success": true,
  "data": {
    "accessionNumber": "ACSN-001",
    "patientId": "12345",
    "patientName": "JOHN DOE",
    "findings": "Normal Cor dan Pulmo...",
    "conclusion": "Normal",
    "measurementImages": [
       { "name": "screenshot1.png", "base64": "data:image/png;base64,..." }
    ],
    "doctor": { "name": "dr. Ahmad, Sp.Rad" }
  }
}`
  },
  {
    id: "search-reports",
    method: "GET",
    path: "/api/external/reports/search",
    description: "Cari laporan radiologi berdasarkan sebagian karakter Accession Number, Nama Pasien, atau ID Pasien (partial search). Mengembalikan list laporan tanpa gambar (measurementImages) agar response tetap ringan.",
    category: "Radiology Reports",
    parameters: [
      { name: "q", type: "string", description: "Kata kunci pencarian. Akan otomatis mencari kecocokan pada Accession Number, Nama Pasien, atau ID Pasien.", required: true },
    ],
    response: `{
  "success": true,
  "count": 2,
  "data": [
    {
      "accessionNumber": "ACSN-001",
      "patientId": "12345",
      "patientName": "JOHN DOE",
      "findings": "Normal...",
      "conclusion": "Normal"
    },
    {
      "accessionNumber": "ACSN-001-A",
      "patientId": "12346",
      "patientName": "JANE DOE",
      "findings": "Pneumonia...",
      "conclusion": "Abnormal"
    }
  ]
}`
  },
];
