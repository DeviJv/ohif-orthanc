
const fs = require('fs');

async function checkImagingStudy() {
    const envPath = '/Users/tva/Quantum/project/ohif-orthanc/dicom-router/.env';
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = Object.fromEntries(envContent.split('\n').filter(l => l.includes('=')).map(l => l.split('=').map(s => s.trim())));

    const ACCESS_TOKEN_URL = `${env.SATUSEHAT_URL}/oauth2/v1/accesstoken?grant_type=client_credentials`;
    const authRes = await fetch(ACCESS_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `client_id=${env.CLIENT_ID}&client_secret=${env.CLIENT_SECRET}`
    });
    const { access_token } = await authRes.json();

    const accession = 'test-4444';
    console.log(`🔍 Mengecek ImagingStudy di SatuSehat untuk Accession: ${accession}...`);

    // Mencari ImagingStudy berdasarkan identifier accession
    const url = `${env.SATUSEHAT_URL}/fhir-r4/v1/ImagingStudy?identifier=http://sys-ids.kemkes.go.id/acsn/${env.ORG_ID}|${accession}`;
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${access_token}` } });
    const data = await res.json();

    if (data.total > 0) {
        console.log("✅ BERHASIL! ImagingStudy ditemukan di SatuSehat.");
        console.log("ID ImagingStudy:", data.entry[0].resource.id);
        console.log("Status:", data.entry[0].resource.status);
        console.log("Jumlah Series:", data.entry[0].resource.numberOfSeries);
    } else {
        console.log("❌ Belum ditemukan. Cek kembali log dicom-router apakah ada error saat upload.");
    }
}

checkImagingStudy().catch(console.error);
