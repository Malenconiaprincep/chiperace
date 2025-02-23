-- CreateTable
CREATE TABLE "custom_docs" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_docs_pkey" PRIMARY KEY ("id")
);
