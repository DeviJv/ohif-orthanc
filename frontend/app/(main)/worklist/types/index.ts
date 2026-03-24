export interface Study {
    ID: string;
    MainDicomTags: {
        PatientName: string;
        PatientID: string;
        StudyDate: string;
        StudyTime?: string;
        StudyDescription: string;
        AccessionNumber: string;
        StudyInstanceUID: string;
        StudyID?: string;
        PatientTelephoneNumbers?: string;
        ReferringPhysicianName?: string;
        InstitutionName?: string;
    };
    PatientMainDicomTags?: {
        PatientName: string;
        PatientID?: string;
        PatientBirthDate?: string;
        PatientSex?: string;
        PatientTelephoneNumbers?: string;
    };
    Series: string[];
    Labels: string[];
}

export interface Series {
    ID: string;
    MainDicomTags: {
        SeriesNumber: string;
        SeriesDescription: string;
        Modality: string;
        SeriesDate?: string;
        SeriesTime?: string;
        ProtocolName?: string;
        BodyPartExamined?: string;
        SeriesInstanceUID: string;
    };
    Instances: string[];
}

export interface Instance {
    ID: string;
    IndexInSeries: number;
    MainDicomTags: {
        InstanceNumber: string;
        SOPInstanceUID: string;
    };
    FileSize: number;
}

export interface DicomTag {
    Name: string;
    Value: unknown;
}

export type DicomTags = Record<string, DicomTag>;
