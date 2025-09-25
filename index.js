import express from "express";
import useDb from "./middlewares/useDbMiddleware.js"

const app = express();
const port = 3000;

app.use(useDb)

app.get("/", (req, res) => {
    res.send("Welcome to my App !")
})

app.listen(port, () => {
    console.log("I'm listening on port 3000")
})