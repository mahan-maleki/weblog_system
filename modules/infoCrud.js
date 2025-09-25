import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/info', async (req, res) => {
    try {
        const items = await prisma.info.findMany();
        let html = "";

        items.forEach(item => {
            html += `<h1>Info Table</h1><ul><li><strong>ID:</strong> ${item.id} | <strong>Desc:</strong> ${item.desc} | <strong>Type:</strong> ${item.type}</li></ul>`;
        });

        res.send(html);
    } catch (error) {
        res.status(500).send(`<h2 style="color:red;">Error fetching info: ${error.message}</h2>`);
    }
});

export default router;
