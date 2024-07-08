/*
  Warnings:

  - Added the required column `apellido` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `genero` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `rol` VARCHAR(191) NOT NULL,
    ADD COLUMN `usuario` VARCHAR(191) NOT NULL;
