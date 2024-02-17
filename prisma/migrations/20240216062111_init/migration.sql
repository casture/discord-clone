-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServerItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemTypeId" TEXT NOT NULL DEFAULT 'MESSAGE',
    "serverId" INTEGER NOT NULL,
    CONSTRAINT "ServerItem_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "ServerItemType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ServerItem_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ServerItem" ("id", "itemTypeId", "name", "serverId") SELECT "id", "itemTypeId", "name", "serverId" FROM "ServerItem";
DROP TABLE "ServerItem";
ALTER TABLE "new_ServerItem" RENAME TO "ServerItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
