import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { accessionNumber, patientName, patientId } = await req.json();

        if (!accessionNumber) {
            return NextResponse.json({ error: "Accession Number is required" }, { status: 400 });
        }

        const orthancUrl = process.env.ORTHANC_URL || "http://localhost:8042";
        const username = process.env.ORTHANC_USERNAME || "quantum";
        const password = process.env.ORTHANC_PASSWORD || "quantum123";

        const auth = Buffer.from(`${username}:${password}`).toString("base64");

        const response = await fetch(`${orthancUrl}/tools/create-dicom`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${auth}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "SOPClassUID": "1.2.840.10008.5.1.4.1.1.2",
                "PatientName": patientName || "Pasien Test Router",
                "PatientID": patientId || "P02478375538",
                "AccessionNumber": accessionNumber,
                "Modality": "CT",
                "StudyDescription": `Uji Integrasi Router - ${accessionNumber}`,
                "PatientSex": "M",
                "PatientBirthDate": "19900101"
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json({ error: `Orthanc error: ${error}` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ 
            message: "DICOM creation successful", 
            id: data.ID,
            studyId: data.ParentStudy,
            logs: [
                `Instance created in Orthanc with ID: ${data.ID}`,
                `Study ID: ${data.ParentStudy}`,
                `Accession Number: ${accessionNumber}`
            ]
        });
    } catch (error: any) {
        console.error("Error creating test DICOM:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
