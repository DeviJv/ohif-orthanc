"use server";

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function upsertRadiologyReport(data: any) {
  try {
    const { 
      patientId, 
      studyInstanceUid, 
      studyDate,
      accessionNumber,
      patientName,
      patientSex,
      age,
      examType,
      findings,
      measurementImages,
      selectedSeries,
      doctorId,
      doctorName,
      reportDate,
      orderId
    } = data;

    const report = await prisma.radiologyReport.upsert({
      where: {
        patientId_studyInstanceUid: {
          patientId,
          studyInstanceUid
        }
      },
      update: {
        studyDate,
        accessionNumber,
        patientName,
        patientSex,
        age,
        examType,
        findings,
        measurementImages,
        selectedSeries,
        doctorId,
        doctorName,
        reportDate,
        orderId,
        isExpertise: data.isExpertise ?? false,
        updatedAt: new Date()
      },
      create: {
        patientId,
        studyInstanceUid,
        studyDate,
        accessionNumber,
        patientName,
        patientSex,
        age,
        examType,
        findings,
        measurementImages,
        selectedSeries,
        doctorId,
        doctorName,
        reportDate,
        orderId,
        isExpertise: data.isExpertise ?? false,
      }
    });

    return { success: true, data: report };
  } catch (error) {
    console.error("Error upserting radiology report:", error);
    return { success: false, error: "Failed to save radiology report" };
  }
}

export async function getRadiologyReport(patientId: string, studyInstanceUid: string) {
  try {
    const report = await prisma.radiologyReport.findUnique({
      where: {
        patientId_studyInstanceUid: {
          patientId,
          studyInstanceUid
        }
      },
      include: {
        doctor: true
      }
    });
    return { success: true, data: report };
  } catch (error) {
    console.error("Error fetching radiology report:", error);
    return { success: false, error: "Failed to fetch radiology report" };
  }
}

export async function getDoctors() {
  try {
    // Fetch users who have a role that sounds like "Doctor"
    const doctors = await prisma.user.findMany({
      where: {
        role: { name: { contains: "DOCTOR", mode: "insensitive" } }
      },
      select: {
        id: true,
        name: true,
        email: true,
        signature: true,
        sip: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "asc"
      }
    });
    return { success: true, data: doctors };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return { success: false, error: "Failed to fetch doctors" };
  }
}
