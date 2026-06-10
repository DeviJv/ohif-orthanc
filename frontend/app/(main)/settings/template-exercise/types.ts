export interface UserBasic {
    name: string;
}

export interface TemplateExercise {
    id: string;
    userId: string;
    nama: string;
    template: string;
    createdAt: string;
    updatedAt: string;
    user?: UserBasic;
}

export interface TemplateExerciseResponse {
    items: TemplateExercise[];
    total: number;
    page: number;
    totalPages: number;
}
