-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "pseudo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_pseudo_key" ON "user"("pseudo");
