/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN "imageUrl" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Channel";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ServerItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemTypeId" TEXT NOT NULL DEFAULT 'message',
    "serverId" INTEGER NOT NULL,
    CONSTRAINT "ServerItem_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "ServerItemType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ServerItem_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServerItemType" (
    "id" TEXT NOT NULL PRIMARY KEY
);
