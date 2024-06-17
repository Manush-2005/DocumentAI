-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'AGENT');

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "pdfName" TEXT NOT NULL,
    "pdfurl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileKey" TEXT,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "messageid" TEXT NOT NULL,
    "chatid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "role" NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("messageid")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatid_fkey" FOREIGN KEY ("chatid") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
