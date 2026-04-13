
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Load credentials from the router's .env
const envPath = '/Users/tva/Quantum/project/ohif-orthanc/dicom-router/.env';
const envContent = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
    envContent.split('\n')
        .filter(line => line && line.includes('='))
        .map(line => line.split('='))
);

const ORG_ID = env.ORG_ID;
const CLIENT_ID = env.CLIENT_ID;
const CLIENT_SECRET = env.CLIENT_SECRET;
const BASE_URL = env.SATUSEHAT_URL;
const ACCESSION = 'test-4444';

async function search() {
    console.log(`Searching for Accession: ${ACCESSION} for Org: ${ORG_ID}`);
    
    // 1. Get Token
    const authUrl = `${BASE_URL}/oauth2/v1/accesstoken?grant_type=client_credentials`;
    const authRes = await axios.post(authUrl, `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const token = authRes.data.access_token;
    console.log("Auth Success.");

    const systems = [
        `http://sys-ids.kemkes.go.id/acsn/${ORG_ID}`,
        `https://sys-ids.kemkes.go.id/acsn/${ORG_ID}`,
        `http://sys-ids.kemkes.go.id/servicerequest/${ORG_ID}`,
        `https://sys-ids.kemkes.go.id/servicerequest/${ORG_ID}`,
        `http://sys-ids.kemkes.go.id/acsn`,
        `https://sys-ids.kemkes.go.id/acsn`
    ];

    for (const sys of systems) {
        console.log(`Checking system: ${sys}...`);
        try {
            const res = await axios.get(`${BASE_URL}/fhir-r4/v1/ServiceRequest`, {
                params: { identifier: `${sys}|${ACCESSION}` },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.data.total > 0) {
                console.log(`✅ FOUND! System: ${sys}`);
                console.log(JSON.stringify(res.data.entry[0].resource, null, 2));
                return;
            } else {
                console.log(`❌ Not found with this system.`);
            }
        } catch (e) {
            console.log(`⚠️ Error checking ${sys}: ${e.message}`);
        }
    }
    console.log("Finished searching. No results found.");
}

search().catch(console.error);
