-- CreateTable
CREATE TABLE "TemplateExercise" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TemplateExercise" ADD CONSTRAINT "TemplateExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
