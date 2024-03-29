-- CreateTable
CREATE TABLE "WgHousingOffer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "contactUrl" TEXT,
    "address" TEXT,
    "district" INTEGER,
    "description" TEXT,
    "numTenants" INTEGER,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "contactName" TEXT,
    "rentPrice" INTEGER,
    "extraPrice" INTEGER,
    "otherPrice" INTEGER,
    "depositPrice" INTEGER,
    "transferPrice" INTEGER,
    "furnished" BOOLEAN NOT NULL,
    "washingMachine" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "nonSmoking" BOOLEAN,
    "englishOk" BOOLEAN NOT NULL,
    "students" BOOLEAN,
    "lgbtqOk" BOOLEAN,
    "malesOk" BOOLEAN NOT NULL,
    "contacted" BOOLEAN NOT NULL DEFAULT false
);
