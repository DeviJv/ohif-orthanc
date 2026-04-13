
const fs = require('fs');

async function search() {
    // Load credentials from the router's .env
    const envPath = '/Users/tva/Quantum/project/ohif-orthanc/dicom-router/.env';
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = Object.fromEntries(
        envContent.split('\n')
            .filter(line => line && line.includes('='))
            .map(line => {
                const parts = line.split('=');
                return [parts[0].trim(), parts[1].trim()];
            })
    );

    const ORG_ID = env.ORG_ID;
    const CLIENT_ID = env.CLIENT_ID;
    const CLIENT_SECRET = env.CLIENT_SECRET;
    const BASE_URL = env.SATUSEHAT_URL;
    const ACCESSION = 'test-4444';

    console.log(`🔍 Mencari Accession: ${ACCESSION} untuk Org: ${ORG_ID}`);
    
    // 1. Get Token
    const authUrl = `${BASE_URL}/oauth2/v1/accesstoken?grant_type=client_credentials`;
    const authRes = await fetch(authUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    });
    
    const authData = await authRes.json();
    const token = authData.access_token;
    if (!token) {
        console.error("❌ Gagal mendapatkan token:", authData);
        return;
    }
    console.log("✅ Auth Sukses.");

    const systems = [
        `http://sys-ids.kemkes.go.id/acsn/${ORG_ID}`,
        `https://sys-ids.kemkes.go.id/acsn/${ORG_ID}`,
        `http://sys-ids.kemkes.go.id/servicerequest/${ORG_ID}`,
        `https://sys-ids.kemkes.go.id/servicerequest/${ORG_ID}`,
        `http://sys-ids.kemkes.go.id/acsn`,
        `https://sys-ids.kemkes.go.id/acsn`,
        `http://sys-ids.kemkes.go.id/accession/${ORG_ID}`,
        `https://sys-ids.kemkes.go.id/accession/${ORG_ID}`
    ];

    for (const sys of systems) {
        process.stdout.write(`Testing system: ${sys}... `);
        try {
            const url = `${BASE_URL}/fhir-r4/v1/ServiceRequest?identifier=${encodeURIComponent(sys + '|' + ACCESSION)}`;
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            const data = await res.json();
            
            if (data.total > 0) {
                console.log(`\n\n🎯 KETEMU! System yang benar adalah: ${sys}`);
                console.log("Resource identifier structure:");
                console.log(JSON.stringify(data.entry[0].resource.identifier, null, 2));
                return;
            } else {
                console.log(`❌ Kosong.`);
            }
        } catch (e) {
            console.log(`⚠️ Error: ${e.message}`);
        }
    }
    console.log("\n🏁 Selesai. Tidak ada yang cocok. Artinya Order belum terbuat dengan system yang benar.");
}

search().catch(console.error);
