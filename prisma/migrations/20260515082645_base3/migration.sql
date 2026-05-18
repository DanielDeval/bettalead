-- CreateTable
CREATE TABLE "Templatesparts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "Introduction" TEXT NOT NULL,
    "Offer" TEXT NOT NULL,
    "Porfolio" TEXT NOT NULL,
    "Outro" TEXT NOT NULL,
    "Links" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "TemplatesID" TEXT NOT NULL,

    CONSTRAINT "Templatesparts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Templatesparts" ADD CONSTRAINT "Templatesparts_TemplatesID_fkey" FOREIGN KEY ("TemplatesID") REFERENCES "Templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
