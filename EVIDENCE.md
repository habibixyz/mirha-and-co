# Production Evidence & Execution Logs

This document serves as verification that **Mirha & Co.** is running continuously in production. 

## 1. Live Production Deployment
The application is currently live and serving global traffic via Vercel Edge Network.
- **Production URL:** [https://www.mirhaandco.com](https://www.mirhaandco.com)
- **Database Backend:** Railway (PostgreSQL)

## 2. Live HTTP Request Logs (Vercel Production)
Below is a raw extract of recent live traffic logs hitting our production edge servers, demonstrating active continuous usage:

```text
TIME         HOST                LEVEL                                                                    STATUS
12:42:39.36  www.mirhaandco.com  info   ε GET /                                                           200   
12:39:06.17  www.mirhaandco.com  info   λ GET /blog/best-moisturizer-for-hyperpigmentation-in-lucknow     200   
12:36:35.17  www.mirhaandco.com  info   λ GET /                                                           200   
12:31:28.39  www.mirhaandco.com  info   ◇ GET /_next/image                                                200   
12:27:27.94  www.mirhaandco.com  info   λ GET /blog/best-hair-growth-serum-india                          200   
12:20:06.23  www.mirhaandco.com  info   ε GET /blog/best-body-wash-for-dry-skin-india                     200   
12:18:06.43  www.mirhaandco.com  info   λ GET /product/B09PV4379W                                         200   
12:04:32.38  www.mirhaandco.com  info   λ GET /blog/best-face-wash-for-oily-acne-prone-skin-india         200   
11:59:47.26  www.mirhaandco.com  info   ε GET /blog/barrier-repair-protocol                               404   
11:59:22.03  www.mirhaandco.com  info   ε GET /                                                           200   
11:55:01.11  www.mirhaandco.com  info   ε GET /sitemap.xml                                                200   
```

## 3. Database Execution Schema
Our AI Query Logs and Lead generation capture tables are actively executing on Railway. Below is a snapshot of our Prisma execution model for tracking AI interactions in production:

```prisma
model AiQueryLog {
  id        String   @id @default(uuid())
  userId    String
  query     String
  response  String
  type      String   // e.g., "search" or "consultant"
  metadata  Json?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Lead {
  id        String   @id @default(uuid())
  email     String   @unique
  type      String   // e.g., "hardwater", "dupe"
  data      String?  @db.Text
  createdAt DateTime @default(now())
}
```

## 4. Continuous Integration
All pushes to the `main` branch trigger automated zero-downtime deployments to Vercel and background schema migrations to our Railway database. 
