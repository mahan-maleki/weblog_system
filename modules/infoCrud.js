import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/info", async (req, res) => {
    const showInfos = res.locals.prisma.info.findMany();
})