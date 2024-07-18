CREATE TABLE "scrapers" (
    "id" SERIAL NOT NULL,
    "website" TEXT NOT NULL,
    "image" TEXT [],
    "video" TEXT [],
    "updated_at" timestamp,
    "created_at" timestamp
)