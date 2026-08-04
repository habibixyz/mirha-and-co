-- AlterTable
ALTER TABLE "B2BApiKey" ADD COLUMN "allowedOrigins" TEXT NOT NULL DEFAULT '*';
ALTER TABLE "B2BApiKey" ADD COLUMN "customCatalog" JSONB;
