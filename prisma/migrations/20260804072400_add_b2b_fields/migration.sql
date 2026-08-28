-- CreateTable
CREATE TABLE "B2BApiKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "keyHash" TEXT,
    "email" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'growth',
    "billing" TEXT NOT NULL DEFAULT 'monthly',
    "monthlyQuota" INTEGER NOT NULL DEFAULT 150000,
    "usageThisMonth" INTEGER NOT NULL DEFAULT 0,
    "quotaResetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "razorpaySubscriptionId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "allowedOrigins" TEXT NOT NULL DEFAULT '*',
    "customCatalog" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "B2BApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B2BUsageLog" (
    "id" TEXT NOT NULL,
    "keyId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "skinType" TEXT,
    "city" TEXT,
    "ppm" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "B2BUsageLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "B2BApiKey_key_key" ON "B2BApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "B2BApiKey_keyHash_key" ON "B2BApiKey"("keyHash");

-- CreateIndex
CREATE INDEX "B2BApiKey_email_idx" ON "B2BApiKey"("email");

-- CreateIndex
CREATE INDEX "B2BApiKey_key_idx" ON "B2BApiKey"("key");

-- CreateIndex
CREATE INDEX "B2BUsageLog_keyId_idx" ON "B2BUsageLog"("keyId");

-- CreateIndex
CREATE INDEX "B2BUsageLog_keyId_createdAt_idx" ON "B2BUsageLog"("keyId", "createdAt");

-- AddForeignKey
ALTER TABLE "B2BUsageLog" ADD CONSTRAINT "B2BUsageLog_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "B2BApiKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
