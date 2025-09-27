import express from "express";
import path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from "node:path";
import useDb from "./middlewares/useDbMiddleware.js"
import infoCrud from "./modules/infoCrud.js"
import userCrud from "./modules/userCrud.js"
import login from "./modules/login.js"
import cookieParser from "cookie-parser";
import checkRoleMiddleware from "./middlewares/checkRoleMiddleware.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json())

app.use(cookieParser('AUTH'))

app.use(checkRoleMiddleware)

app.use(useDb)

app.use(infoCrud)

app.use(userCrud)

app.use(login)

app.get("/", checkRoleMiddleware, (req, res) => {
    res.send("Welcome to my App !")
})

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(port, () => {
    console.log("I'm listening on port 3000")
})