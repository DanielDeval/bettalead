-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_organisationID_fkey";

-- DropForeignKey
ALTER TABLE "Templates" DROP CONSTRAINT "Templates_organisationID_fkey";

-- DropForeignKey
ALTER TABLE "Templatesparts" DROP CONSTRAINT "Templatesparts_TemplatesID_fkey";

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_organisationID_fkey" FOREIGN KEY ("organisationID") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_organisationID_fkey" FOREIGN KEY ("organisationID") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templatesparts" ADD CONSTRAINT "Templatesparts_TemplatesID_fkey" FOREIGN KEY ("TemplatesID") REFERENCES "Templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
