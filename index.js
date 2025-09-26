import express from "express";
import useDb from "./middlewares/useDbMiddleware.js"
import infoCrud from "./modules/infoCrud.js"
import userCrud from "./modules/userCrud.js"

const app = express();
const port = 3000;

app.use(express.json())

app.use(useDb)

app.use(infoCrud)

app.use(userCrud)

app.get("/", (req, res) => {
    res.send("Welcome to my App !")
})

app.listen(port, () => {
    console.log("I'm listening on port 3000")
})