import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/users', async (req, res) => {
    const showUsers = await prisma.user.findMany();
    res.json(showUsers)
})

router.post('/users', async (req, res) => {
    const { username, fname, lname, email, password, role } = req.body;

    try {
        if (!username || username.trim() === '') {
            res.status(400).send("Bad Request: Please enter username value")
        } else if (!fname || fname.trim() === '') {
            res.status(400).send("Bad Request: Please enter first name value")
        } else if (!lname || lname.trim() === '') {
            res.status(400).send("Bad Request: Please enter last name value")
        } else if (!email || email.trim() === '') {
            res.status(400).send("Bad Request: Please enter email value")
        } else if (!password || password.trim() === '') {
            res.status(400).send("Bad Request: Please enter password value")
        } else if (!role || role.trim() === '') {
            res.status(400).send("Bad Request: Please enter role value")
        }

        await prisma.user.create({
            data: {
                username,
                fname,
                lname,
                email,
                password,
                role: role || 'USER'
            }
        });

        const showUsers = await prisma.user.findMany();
        res.json(showUsers)
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
            console.log("Username is already exists !")
        } else if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            console.log("email is already exists")
        } else {
            console.log(error)
        }
    }
})

export default router;