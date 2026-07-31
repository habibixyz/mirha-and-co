-- CreateTable
CREATE TABLE "BlogPostView" (
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BlogPostView_pkey" PRIMARY KEY ("slug")
);
