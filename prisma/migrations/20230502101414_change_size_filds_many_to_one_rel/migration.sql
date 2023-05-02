/*
  Warnings:

  - You are about to drop the `_ProductToSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToSize" DROP CONSTRAINT "_ProductToSize_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSize" DROP CONSTRAINT "_ProductToSize_B_fkey";

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProductToSize";

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
