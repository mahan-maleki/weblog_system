/*
  Warnings:

  - You are about to drop the `info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."info";

-- CreateTable
CREATE TABLE "public"."Info" (
    "id" SERIAL NOT NULL,
    "desc" VARCHAR(80) NOT NULL,
    "type" "public"."Type" NOT NULL DEFAULT 'NEWS',

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
