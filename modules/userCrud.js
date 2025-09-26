import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/login', async (req, res) => {
    const showUsers = await prisma.user.findMany();
    res.json(showUsers)
})

export default router;