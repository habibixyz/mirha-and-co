/**
 * ⚡ Database Setup — Create AiQueryLog Table
 * 
 * This temporary script runs raw SQL on your Supabase PostgreSQL database using
 * your existing Prisma client to safely sync the schema without triggering
 * cross-schema DB push warnings.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("📡 Connecting to Supabase database...");
  try {
    console.log("⚡ Executing raw SQL to create public.AiQueryLog...");

    // 1. Create the table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AiQueryLog" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "query" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "AiQueryLog_pkey" PRIMARY KEY ("id")
      );
    `);
    console.log("✅ Table public.AiQueryLog created.");

    // 2. Create indices
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "AiQueryLog_userId_idx" ON "AiQueryLog"("userId");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "AiQueryLog_userId_createdAt_idx" ON "AiQueryLog"("userId", "createdAt");
    `);
    console.log("✅ Indices created.");

    // 3. Add Foreign Key Constraint
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "AiQueryLog" 
        ADD CONSTRAINT "AiQueryLog_userId_fkey" 
        FOREIGN KEY ("userId") 
        REFERENCES "User"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
      `);
      console.log("✅ Foreign Key constraints added.");
    } catch (fkError) {
      // If constraint already exists, suppress the warning
      if (fkError.message.includes("already exists")) {
        console.log("ℹ️ Foreign key constraint already exists.");
      } else {
        throw fkError;
      }
    }

    console.log("\n🎉 Database successfully synced!");
  } catch (err) {
    console.error("❌ SQL execution failed:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
