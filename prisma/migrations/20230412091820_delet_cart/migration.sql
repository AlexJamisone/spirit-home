/*
  Warnings:

  - You are about to drop the column `text` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartEntry" DROP CONSTRAINT "CartEntry_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartEntry" DROP CONSTRAINT "CartEntry_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderEntry" DROP CONSTRAINT "OrderEntry_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderEntry" DROP CONSTRAINT "OrderEntry_productId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "text",
ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "CartEntry";

-- DropTable
DROP TABLE "OrderEntry";
