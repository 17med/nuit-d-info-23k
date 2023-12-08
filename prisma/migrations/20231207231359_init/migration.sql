/*
  Warnings:

  - Added the required column `dataTache` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tache` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dataTache" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tache" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "Tache" (
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taux" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "Titre" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Auteur" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tache_titre_key" ON "Tache"("titre");
