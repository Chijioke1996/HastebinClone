const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const Document = require("./model/Document")

app.set("view engine", "ejs")
app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true}))

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
    `  Welcome to Hastein!,
    Use the commands in the top right corner 
    to create a new file to share with others.`

    res.render("code_display", {code, language : "plaintext"})
})

app.get("/new", (req, res) => {

    res.render("new")
})

app.post("/save", async (req, res) => {
    const value = req.body.value
    try {
       const document =  await Document.create({value})
       console.log(document );
       res.redirect(`/${document.id}`)
    } catch (error) {
        res.render("new", { value})
    }
})

app.get("/:id", async (req, res) => {
    const id = req.params.id

    try {
       const document = await Document.findById(id) 
       res.render("code_display", { code : document.value})
    } catch (error) {
        res.redirect("/")
    }
}) 

// app.get("/:id/duplicate", async (req, res) => {
  
//     const id = req.params.id

//     try {
//        const document = await Document.findById(id) 
//        res.render("new", { value : document.value})
//     } catch (error) {
//         res.redirect(`${id}`)
//     }

// })  










app.listen(port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`App listening on port ${port}`)
    }
})