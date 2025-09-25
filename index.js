import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to my App !")
})

app.listen(port, () => {
    console.log("I'm listening on port 3000")
})