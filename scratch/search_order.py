
import json
import os
import requests

def search():
    # Load credentials from the router's .env
    env_path = '/Users/tva/Quantum/project/ohif-orthanc/dicom-router/.env'
    env = {}
    with open(env_path, 'r') as f:
        for line in f:
            if '=' in line:
                k, v = line.strip().split('=', 1)
                env[k] = v

    ORG_ID = env.get('ORG_ID')
    CLIENT_ID = env.get('CLIENT_ID')
    CLIENT_SECRET = env.get('CLIENT_SECRET')
    BASE_URL = env.get('SATUSEHAT_URL')
    ACCESSION = 'test-4444'

    print(f"🔍 Mencari Accession: {ACCESSION} untuk Org: {ORG_ID}")
    
    # 1. Get Token
    auth_url = f"{BASE_URL}/oauth2/v1/accesstoken?grant_type=client_credentials"
    auth_res = requests.post(auth_url, data={
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    
    auth_data = auth_res.json()
    token = auth_data.get('access_token')
    if not token:
        print(f"❌ Gagal mendapatkan token: {auth_data}")
        return
    print("✅ Auth Sukses.")

    # Daftar system yang mungkin
    systems = [
        f"http://sys-ids.kemkes.go.id/acsn/{ORG_ID}",
        f"https://sys-ids.kemkes.go.id/acsn/{ORG_ID}",
        f"http://sys-ids.kemkes.go.id/servicerequest/{ORG_ID}",
        f"https://sys-ids.kemkes.go.id/servicerequest/{ORG_ID}",
        f"http://sys-ids.kemkes.go.id/acsn",
        f"http://sys-ids.kemkes.go.id/accession/{ORG_ID}",
        f"https://sys-ids.kemkes.go.id/accession/{ORG_ID}",
        f"http://sys-ids.kemkes.go.id/order-id/{ORG_ID}"
    ]

    headers = {'Authorization': f'Bearer {token}'}

    for sys in systems:
        print(f"Testing system: {sys}... ", end='', flush=True)
        try:
            url = f"{BASE_URL}/fhir-r4/v1/ServiceRequest"
            params = {'identifier': f"{sys}|{ACCESSION}"}
            res = requests.get(url, params=params, headers=headers)
            data = res.json()
            
            if data.get('total', 0) > 0:
                print(f"\n\n🎯 KETEMU! System yang benar adalah: {sys}")
                print("Resource identifier structure:")
                print(json.dumps(data['entry'][0]['resource']['identifier'], indent=2))
                return
            else:
                print("❌ Kosong.")
        except Exception as e:
            print(f"⚠️ Error: {str(e)}")

    print("\n🏁 Selesai. Tidak ada yang cocok.")

if __name__ == "__main__":
    search()
