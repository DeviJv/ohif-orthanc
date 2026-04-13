#!/bin/bash

# Load credentials from the router's .env
ENV_FILE="/Users/tva/Quantum/project/ohif-orthanc/dicom-router/.env"
ORG_ID=$(grep ORG_ID $ENV_FILE | cut -d'=' -f2 | tr -d '\r')
CLIENT_ID=$(grep CLIENT_ID $ENV_FILE | cut -d'=' -f2 | tr -d '\r')
CLIENT_SECRET=$(grep CLIENT_SECRET $ENV_FILE | cut -d'=' -f2 | tr -d '\r')
BASE_URL=$(grep SATUSEHAT_URL $ENV_FILE | cut -d'=' -f2 | tr -d '\r')
ACCESSION="test-4444"

echo "🔍 Mencari Accession: $ACCESSION untuk Org: $ORG_ID"

# 1. Get Token
TOKEN=$(curl -s -X POST "$BASE_URL/oauth2/v1/accesstoken?grant_type=client_credentials" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET" | jq -r '.access_token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    echo "❌ Gagal mendapatkan token."
    exit 1
fi
echo "✅ Auth Sukses."

# Daftar system yang mungkin
SYSTEMS=(
    "http://sys-ids.kemkes.go.id/acsn/$ORG_ID"
    "https://sys-ids.kemkes.go.id/acsn/$ORG_ID"
    "http://sys-ids.kemkes.go.id/servicerequest/$ORG_ID"
    "https://sys-ids.kemkes.go.id/servicerequest/$ORG_ID"
    "http://sys-ids.kemkes.go.id/acsn"
    "http://sys-ids.kemkes.go.id/accession/$ORG_ID"
    "https://sys-ids.kemkes.go.id/accession/$ORG_ID"
    "http://sys-ids.kemkes.go.id/order-id/$ORG_ID"
)

for sys in "${SYSTEMS[@]}"; do
    echo -n "Testing system: $sys... "
    URL="$BASE_URL/fhir-r4/v1/ServiceRequest?identifier=$(echo -n "$sys|$ACCESSION" | jq -sRr @uri)"
    RES=$(curl -s -H "Authorization: Bearer $TOKEN" "$URL")
    
    TOTAL=$(echo "$RES" | jq -r '.total')
    
    if [ "$TOTAL" != "null" ] && [ "$TOTAL" -gt 0 ]; then
        echo -e "\n\n🎯 KETEMU! System yang benar adalah: $sys"
        echo "Resource details:"
        echo "$RES" | jq '.entry[0].resource.identifier'
        exit 0
    else
        echo "❌ Kosong."
    fi
done

echo -e "\n🏁 Selesai. Tidak ada yang cocok."
