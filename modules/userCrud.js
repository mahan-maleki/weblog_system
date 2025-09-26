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

router.put('/users', async (req, res) => {
    const { userId, role, password } = req.body;

    if (userId == undefined) {
        return res.status(400).send("Bad Request: Please enter 'userId' value in request body.");
    } else if (!userId) {
        return res.status(400).send("Bad Request: 'userId' cannot be empty or whitespace.");
    } else if (password == undefined) {
        return res.status(400).send("Bad Request: Please enter 'password' value in request body.");
    } else if (!password || password.trim() === "") {
        return res.status(400).send("Bad Request: 'password' cannot be empty or whitespace.");
    } else if (role == undefined) {
        return res.status(400).send("Bad Request: Please enter 'role' value in request body.");
    } else if (!role || role.trim() === "") {
        return res.status(400).send("Bad Request: 'role' cannot be empty or whitespace.");
    }

    try {
        await prisma.user.update({
            where: {
                userId: userId
            }, data: {
                password: password,
                role: role
            }
        })

        const showUsers = await prisma.user.findMany();
        res.json(showUsers)
    } catch (error) {
        console.log(`[Error Message]: ${error}`)
    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    id = parseInt(id)

    try {
        if (!id || id.length == 0) {
            return res.status(400).send("Bad Request: 'userId' cannot be empty or whitespace.");
        }

        await prisma.user.delete({
            where: { userId: id }
        })

        const showUsers = await prisma.user.findMany();
        res.json(showUsers)
    } catch (error) {
        console.log(`[Error Message]: ${error}`)
    }
})

export default router;