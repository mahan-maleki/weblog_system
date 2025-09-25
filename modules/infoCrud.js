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

router.put('/info', async (req, res) => {
    const { id, desc, type } = req.body;

    if (id == undefined) {
        return res.status(400).send("Bad Request: Please enter 'id' value in request body.");
    } else if (!id) {
        return res.status(400).send("Bad Request: 'id' cannot be empty or whitespace.");
    } else if (desc == undefined) {
        return res.status(400).send("Bad Request: Please enter 'desc' value in request body.");
    } else if (!desc || desc.trim() === "") {
        return res.status(400).send("Bad Request: 'desc' cannot be empty or whitespace.");
    } else if (type == undefined) {
        return res.status(400).send("Bad Request: Please enter 'type' value in request body.");
    } else if (!type || type.trim() === "") {
        return res.status(400).send("Bad Request: 'type' cannot be empty or whitespace.");
    }

    try {
        await prisma.info.update({
            where: {
                id: id
            }, data: {
                desc: desc,
                type: type
            }
        })

        const showInfos = await prisma.info.findMany();
        res.json(showInfos);
    } catch (error) {
        res.status(500).send(`Server Error: ${error.message}`);
    }
})

export default router;
