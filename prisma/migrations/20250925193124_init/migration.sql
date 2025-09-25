-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('NEWS', 'JOKE');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- CreateTable
CREATE TABLE "public"."info" (
    "id" SERIAL NOT NULL,
    "desc" VARCHAR(80) NOT NULL,
    "type" "public"."Type" NOT NULL DEFAULT 'NEWS',

    CONSTRAINT "info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "fname" VARCHAR(20) NOT NULL,
    "lname" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
