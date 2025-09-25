import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/info', async (req, res) => {
    const showInfos = await prisma.info.findMany();

    res.json(showInfos);
});

router.post('/info', async (req, res) => {
    const { desc, type } = req.body;

    if (desc == undefined) {
        return res.status(400).send("Bad Request: Please enter 'desc' value in request body.");
    } else if (!desc || desc.trim() === "") {
        return res.status(400).send("Bad Request: 'desc' cannot be empty or whitespace.");
    }


    try {
        await prisma.info.create({
            data: { desc, type }
        });

        const showInfos = await prisma.info.findMany();
        res.json(showInfos);
    } catch (error) {
        res.status(500).send(`Server Error: ${error.message}`);
    }
});


export default router;
