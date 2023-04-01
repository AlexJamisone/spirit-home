-- CreateTable
CREATE TABLE "Catrgory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Catrgory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Catrgory_id_key" ON "Catrgory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Catrgory_title_key" ON "Catrgory"("title");

-- AddForeignKey
ALTER TABLE "Catrgory" ADD CONSTRAINT "Catrgory_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
