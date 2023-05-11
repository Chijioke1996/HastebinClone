const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")

app.set("view engine", "ejs")
app.use(express.static("./public"))

const db = mongoose.connection
mongoose.connect("mongodb://localhost/hastebin")
db.on("error", (error) => {
    console.error(error)
})

db.once("open", () => {
    console.log("Connected to database")
})

app.get("/", (req, res) => {
    const code = 
    `  Hey dear,
    We've missed you dearly
    come back home as soon as you can.
    come back home as soon as you can.
    come back home as soon as you can.
    come back home as soon as you can.
    come back home as soon as you can.
    come back home as soon as you can.`

    res.render("code_display", {code})
})

app.get("/new", (req, res) => {

    res.render("new")
})








app.listen(port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`App listening on port ${port}`)
    }
})