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
  exampleBody?: string;
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
  "Create Order ID",
  "Connect Devices",
  "Public Worklist API",
  "Public Study API",
];

export const ORTHANC_API_DATA: ApiEndpoint[] = [
  // PATIENTS
  {
    id: "patients-list",
    method: "GET",
    path: "/patients",
    description: "Menampilkan semua daftar pasien di server PACS. Mengembalikan daftar ID Orthanc pasien.",
    category: "Patients",
    response: '["529e3a6a-73d6-4e52-a58d-71b3e8e7a0a0", ...]',
  },
  {
    id: "patient-details",
    method: "GET",
    path: "/patients/{id}",
    description: "Mengambil detail komprehensif tentang pasien tertentu termasuk daftar studinya.",
    category: "Patients",
    parameters: [{ name: "id", type: "string", description: "ID Pasien Orthanc", required: true }],
  },
  {
    id: "patient-studies",
    method: "GET",
    path: "/patients/{id}/studies",
    description: "Menampilkan semua studi yang dimiliki oleh pasien tertentu.",
    category: "Patients",
  },
  {
    id: "patient-delete",
    method: "DELETE",
    path: "/patients/{id}",
    description: "Menghapus pasien secara permanen beserta semua studi/series/instances yang terkait dengannya.",
    category: "Patients",
  },

  // STUDIES
  {
    id: "studies-list",
    method: "GET",
    path: "/studies",
    description: "Menampilkan semua studi yang tersedia di server PACS.",
    category: "Studies",
  },
  {
    id: "study-details",
    method: "GET",
    path: "/studies/{id}",
    description: "Mengambil detail lengkap dari sebuah studi, termasuk daftar ID series di dalamnya.",
    category: "Studies",
  },
  {
    id: "study-instances",
    method: "GET",
    path: "/studies/{id}/instances",
    description: "Menampilkan semua instance (gambar) dalam studi tertentu.",
    category: "Studies",
  },
  {
    id: "study-archive",
    method: "GET",
    path: "/studies/{id}/archive",
    description: "Mengunduh seluruh studi dalam format file ZIP yang berisi file DICOM.",
    category: "Studies",
  },
  {
    id: "study-delete",
    method: "DELETE",
    path: "/studies/{id}",
    description: "Menghapus studi tertentu.",
    category: "Studies",
  },

  // SERIES
  {
    id: "series-list",
    method: "GET",
    path: "/series",
    description: "Menampilkan semua series di PACS.",
    category: "Series",
  },
  {
    id: "series-details",
    method: "GET",
    path: "/series/{id}",
    description: "Mengambil detail dari series tertentu, termasuk ID instance-nya.",
    category: "Series",
  },
  {
    id: "series-ordered-instances",
    method: "GET",
    path: "/series/{id}/ordered-instances",
    description: "Mengambil daftar instance dalam sebuah series, diurutkan berdasarkan nomor instance.",
    category: "Series",
  },

  // INSTANCES
  {
    id: "instances-list",
    method: "GET",
    path: "/instances",
    description: "Menampilkan semua instance.",
    category: "Instances",
  },
  {
    id: "instance-preview",
    method: "GET",
    path: "/instances/{id}/preview",
    description: "Mendapatkan pratinjau format JPEG dari instance DICOM (frame default).",
    category: "Instances",
  },
  {
    id: "instance-tags",
    method: "GET",
    path: "/instances/{id}/tags",
    description: "Mengambil semua tag DICOM untuk instance tertentu dalam format objek JSON.",
    category: "Instances",
  },
  {
    id: "instance-file",
    method: "GET",
    path: "/instances/{id}/file",
    description: "Mengunduh file raw .dcm dari sebuah instance.",
    category: "Instances",
  },

  // SYSTEM & TOOLS
  {
    id: "system-info",
    method: "GET",
    path: "/system",
    description: "Mengambil metrik server, info versi, dan status penyimpanan.",
    category: "System & Tools",
  },
  {
    id: "statistics",
    method: "GET",
    path: "/statistics",
    description: "Mendapatkan total ukuran penyimpanan, jumlah pasien, dan jumlah studi.",
    category: "System & Tools",
    response: '{"CountInstances": 125, "CountPatients": 12, "CountSeries": 45, "CountStudies": 15, "TotalDiskSize": "450MB"}',
  },
  {
    id: "changes",
    method: "GET",
    path: "/changes",
    description: "Mengambil daftar perubahan terbaru (instance baru, penghapusan, dll.). Berguna untuk sinkronisasi.",
    category: "System & Tools",
  },

  // DICOMWEB
  {
    id: "qido-rs",
    method: "GET",
    path: "/dicom-web/studies",
    description: "Mencari studi berdasarkan parameter kueri DICOM (QIDO-RS).",
    category: "DICOMweb",
  },
  {
    id: "wado-rs",
    method: "GET",
    path: "/dicom-web/studies/{study}/series/{series}/instances/{instance}",
    description: "Mengambil instance tertentu sebagai DICOM atau tipe media lainnya (WADO-RS).",
    category: "DICOMweb",
  },
  {
    id: "stow-rs",
    method: "POST",
    path: "/dicom-web/studies",
    description: "Mengunggah file DICOM melalui standar DICOMweb (STOW-RS).",
    category: "DICOMweb",
  },

  // CREATE ORDER (SIMRS Integration)
  {
    id: "create-order-acsn",
    method: "POST",
    path: "/api/external/study/accession",
    description: "Memperbarui Accession Number dari studi menggunakan ID Pasien atau Order ID, dan Tanggal Studi. Dirancang untuk integrasi SIMRS ketika StudyInstanceUID tidak diketahui.",
    category: "Create ACSN",
    parameters: [
      { name: "patientId", type: "string", description: "ID Pasien (DICOM PatientID). Opsional jika menggunakan orderId.", required: false },
      { name: "orderId", type: "string", description: "ID Order (StudyID). Opsional jika menggunakan patientId.", required: false },
      { name: "studyDate", type: "string", description: "Wajib diisi dengan Tanggal Studi (Format: YYYYMMDD)", required: true },
      { name: "accessionNumber", type: "string", description: "Accession Number baru yang akan diberikan", required: true },
      { name: "patientName", type: "string", description: "Opsional Nama Pasien untuk pencarian yang lebih akurat", required: false },
      { name: "description", type: "string", description: "Opsional Deskripsi Studi untuk mempersempit pencarian", required: false },
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
    id: "external-study-order",
    method: "POST",
    path: "/api/external/study/order",
    description: "Memperbarui Order ID (StudyID / RequestedProcedureID) dari studi menggunakan StudyInstanceUID, atau kombinasi ID Pasien dan Tanggal Studi.",
    category: "Create Order ID",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "Wajib diisi dengan API Key", required: true },
      { name: "orderId", type: "body", description: "Order ID baru yang akan diberikan", required: true },
      { name: "studyUuid", type: "body", description: "StudyInstanceUID dari DICOM (Prioritas 1). Jika diisi, parameter lain bisa dikosongkan.", required: false },
      { name: "patientId", type: "body", description: "ID Pasien DICOM (Prioritas 2). Wajib diisi jika studyUuid kosong.", required: false },
      { name: "studyDate", type: "body", description: "Tanggal Studi format YYYYMMDD. Wajib diisi bersama patientId jika studyUuid kosong.", required: false }
    ],
    exampleBody: `{
  "patientId": "12345",
  "studyDate": "20260615",
  "orderId": "ORD-12345"
}`,
    response: '{"success": true, "message": "Order ID updated successfully", "newStudyId": "..."}'
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

  // PUBLIC WORKLIST API
  {
    id: "public-worklist",
    method: "GET",
    path: "/api/public/worklist?page=1&limit=10",
    description: "Ambil daftar study worklist dengan paginasi dan fitur pencarian. Selalu sertakan header x-pacs-key.\n\n*Catatan*: Respons memiliki properti `actionLinks` per study yang berisi:\n- `viewer`: Link yang dapat dibuka di browser untuk langsung menampilkan OHIF Viewer bagi study tersebut.\n- `exportPdf`: Link yang dapat dibuka di browser untuk memicu dialog Export Laporan PDF secara otomatis.",
    category: "Public Worklist API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "Wajib disi dengan API Key (pacs_secret_token_2026)", required: true },
      { name: "page", type: "query", description: "Halaman data (default: 1)", required: false },
      { name: "limit", type: "query", description: "Jumlah data per halaman (default: 10)", required: false },
      { name: "search", type: "query", description: "Pencarian berdasarkan PatientName, PatientID, atau StudyInstanceUID", required: false },
    ],
    response: `{
  "data": [
    {
      "id": "orthanc-id",
      "studyInstanceUid": "1.2.3.4",
      "patientId": "12345",
      "patientName": "JOHN DOE",
      "patientBirthDate": "19900101",
      "patientSex": "M",
      "studyDate": "20260706",
      "studyTime": "120000.000",
      "studyDescription": "CHEST X-RAY",
      "accessionNumber": "ACC123",
      "orderId": "ORD123",
      "referringPhysicianName": "dr. Strange",
      "modalities": ["CR"],
      "labels": [],
      "isStable": true,
      "aiResult": { ... },
      "report": { 
        "doctorName": "dr. Smith", 
        "findings": "Tidak tampak kelainan pada paru dan jantung...", 
        "examType": "Thorax PA", 
        "reportDate": "06 Juli 2026" 
      },
      "satusehat": {
        "accessionNumber": "ACC123",
        "studyInstanceUid": "1.2.3.4",
        "status": "COMPLETED",
        "satusehatId": "ihs-12345"
      },
      "actionLinks": {
        "viewer": "http://localhost/worklist?viewer=1.2.3.4",
        "exportPdf": "http://localhost/worklist?export=1.2.3.4"
      }
    }
  ],
  "meta": { "total": 100, "page": 1, "limit": 10, "totalPages": 10 }
}`
  },
  {
    id: "public-worklist-delete",
    method: "DELETE",
    path: "/api/public/worklist/{id}",
    description: "Hapus study dan data AI-nya dari database.",
    category: "Public Worklist API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "API Key", required: true },
    ]
  },
  {
    id: "public-worklist-modify",
    method: "POST",
    path: "/api/public/worklist/{id}/modify",
    description: "Ubah metadata study (PatientName, PatientID, dll).",
    category: "Public Worklist API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "API Key", required: true },
    ],
    response: '{"success": true, "jobId": "...", "message": "Modification job started"}'
  },
  {
    id: "public-worklist-anonymize",
    method: "POST",
    path: "/api/public/worklist/{id}/anonymize",
    description: "Anonymize study dan hasilkan study baru tanpa identitas asli.",
    category: "Public Worklist API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "API Key", required: true },
    ]
  },
  {
    id: "public-worklist-ai",
    method: "POST",
    path: "/api/public/worklist/{id}/ai",
    description: "Jalankan analisa AI untuk study ini.",
    category: "Public Worklist API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "API Key", required: true },
    ]
  },
  {
    id: "public-worklist-series",
    method: "GET",
    path: "/api/public/worklist/{id}/series",
    description: "Ambil daftar series untuk sebuah study.",
    category: "Public Worklist API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "API Key", required: true },
    ]
  },
  {
    id: "public-worklist-instances",
    method: "GET",
    path: "/api/public/series/{id}/instances",
    description: "Ambil daftar instances (gambar) dari sebuah series.",
    category: "Public Worklist API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "API Key", required: true },
    ]
  },
  {
    id: "public-patient-studies",
    method: "GET",
    path: "/api/public/patient/{patientId}/studies?page=1&limit=10",
    description: "Ambil daftar study milik pasien tertentu (berdasarkan patientId) lengkap dengan paginasi dan URL preview gambar DICOM.",
    category: "Public Study API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "Wajib disi dengan API Key (pacs_secret_token_2026)", required: true },
      { name: "patientId", type: "path", description: "ID Pasien", required: true },
      { name: "page", type: "query", description: "Halaman data (default: 1)", required: false },
      { name: "limit", type: "query", description: "Jumlah data per halaman (default: 10)", required: false }
    ],
    response: `{
  "data": [
    {
      "id": "orthanc-id",
      "studyInstanceUid": "1.2.3.4",
      "patientId": "12345",
      "patientName": "JOHN DOE",
      "dicomImages": [
        "http://localhost/api/orthanc/instances/.../preview"
      ]
      // ... (data lengkap study lainnya seperti endpoint /worklist)
    }
  ],
  "meta": { "total": 10, "page": 1, "limit": 10, "totalPages": 1 }
}`
  },
  {
    id: "public-order-study",
    method: "GET",
    path: "/api/public/order/{orderId}",
    description: "Ambil detail spesifik dari sebuah study berdasarkan orderId (bisa berupa AccessionNumber, StudyID, StudyDate, atau RequestedProcedureID). Hanya menampilkan data detail dasar, measurementReport, satusehat status, dan dicomImages (URL preview).",
    category: "Public Study API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "Wajib disi dengan API Key (pacs_secret_token_2026)", required: true },
      { name: "orderId", type: "path", description: "Order ID / Accession Number / Study ID / Study Date", required: true }
    ],
    response: `{
  "data": {
    "id": "orthanc-id",
    "studyInstanceUid": "1.2.3.4",
    "patientId": "12345",
    "patientName": "JOHN DOE",
    "accessionNumber": "ACC123",
    "orderId": "ORD123",
    "measurementReport": {
      "findings": "Normal Cor dan Pulmo...",
      "measurementImages": [
        { "name": "screenshot1.png", "base64": "data:image/png;base64,..." }
      ]
    },
    "satusehat": {
      "status": "COMPLETED",
      "satusehatId": "ihs-12345"
    },
    "dicomImages": [
      "http://localhost/api/orthanc/instances/.../preview"
    ]
  }
}`
  },
  {
    id: "public-study-detail",
    method: "GET",
    path: "/api/public/study/detail?patientId={patientId}&studyDate={studyDate}&orderId={orderId}&studyId={studyId}",
    description: "Ambil detail studi secara spesifik dan dinamis. Wajib menggunakan parameter patientId. Dapat dikombinasikan dengan studyDate, orderId (berfungsi ganda sebagai AccessionNumber/StudyID/RequestedProcedureID), atau studyId (StudyInstanceUID) untuk pencarian yang lebih akurat. Karena bisa mengembalikan lebih dari 1 studi di hari yang sama, struktur datanya adalah array yang isinya persis seperti endpoint /order/{orderId}.",
    category: "Public Study API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "Wajib disi dengan API Key (pacs_secret_token_2026)", required: true },
      { name: "patientId", type: "query", description: "ID Pasien (DICOM PatientID)", required: true },
      { name: "studyDate", type: "query", description: "Tanggal Studi format YYYYMMDD (Opsional)", required: false },
      { name: "orderId", type: "query", description: "ID Order, Accession Number, atau Study ID (Opsional)", required: false },
      { name: "studyId", type: "query", description: "StudyInstanceUID (Opsional)", required: false }
    ],
    response: `{
  "data": {
    "id": "orthanc-id",
    "studyInstanceUid": "1.2.3.4",
    "patientId": "12345",
    "patientName": "JOHN DOE",
    "accessionNumber": "ACC123",
    "orderId": "ORD123",
    "measurementReport": {
      "findings": "Normal Cor dan Pulmo...",
      "measurementImages": [
        { "name": "screenshot1.png", "base64": "data:image/png;base64,..." }
      ]
    },
    "satusehat": {
      "status": "COMPLETED",
      "satusehatId": "ihs-12345"
    },
    "dicomImages": [
      "http://localhost/api/orthanc/instances/.../preview"
    ]
  }
}`
  },
  {
    id: "public-study-by-uuid",
    method: "GET",
    path: "/api/public/study/[studyId]",
    description: "Mendapatkan detail studi lengkap (termasuk laporan hasil bacaan dan gambar DICOM) menggunakan DICOM StudyInstanceUID langsung di URL.",
    category: "Public Study API",
    parameters: [
      { name: "x-pacs-key", type: "header", description: "Wajib diisi dengan API Key (pacs_secret_token_2026)", required: true },
      { name: "studyId", type: "path", description: "DICOM StudyInstanceUID", required: true }
    ],
    response: `{
  "data": {
    "id": "e0b1c2d3-...",
    "studyInstanceUid": "1.2.840.113619.2.55.3.28311...",
    "patientId": "12345",
    "patientName": "JOHN DOE",
    "studyDate": "20240420",
    "accessionNumber": "ACC123",
    "orderId": "ORD-123",
    "measurementReport": null,
    "satusehat": null,
    "dicomImages": [
      "http://localhost/api/orthanc/instances/.../preview"
    ]
  }
}`
  },
  {
    id: "public-order-export-pdf",
    method: "POST",
    path: "/api/public/export-pdf",
    description: "Generate dan unduh (download) file PDF yang berisi laporan hasil bacaan (jika expertise=true) dan gambar DICOM yang dipilih (berdasarkan array instances uuid). Responsenya berupa file PDF biner. Pastikan Client membaca response sebagai Blob/File.\n*(Catatan: Jika mengetes menggunakan Postman, jangan klik 'Send' biasa, melainkan klik panah bawah dan pilih **'Download response'** atau **'Send and Download'**)*.",
    category: "Public Study API",
    exampleBody: `{
  "orderId": "ACC123",
  "protect_pdf": true,
  "expertise": true,
  "instances": [
    "89f365d7-ab370fbd-197e3a35-1f9e20a4-cf36424e"
  ]
}`,
    parameters: [
      { name: "x-pacs-key", type: "header", description: "Wajib diisi dengan API Key (pacs_secret_token_2026)", required: true },
      { name: "orderId", type: "body", description: "ID Order, Accession Number, Study Date (YYYYMMDD), atau Study ID (StudyInstanceUID)", required: true },
      { name: "protect_pdf", type: "body", description: "Boolean. Jika true, PDF akan dipassword dengan RM pasien", required: true },
      { name: "expertise", type: "body", description: "Boolean. Jika true, PDF akan menyertakan halaman laporan bacaan (Kop Surat, Dokter, Hasil)", required: true },
      { name: "instances", type: "body", description: "Array of string. Kumpulan UUID instance DICOM yang akan dimasukkan (1 halaman = 1 gambar)", required: true }
    ],
    response: `(File PDF langsung di-download / biner application/pdf)`
  }
];


