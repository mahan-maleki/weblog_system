import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/login', async (req, res) => {
    const { username, password } = req.query;

    const findUsername = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (findUsername.password == password) {
        res.cookie('AUTH', findUsername.userId, { signed: true });
        res.send("Welcome back !")
    } else {
        res.send("Password is not correct")
    }
})

export default router;