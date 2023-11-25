/*
  Warnings:

  - Added the required column `profile_picture` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "profile_picture" TEXT NOT NULL;
