const express = require('express');

const path = require('path');

const PORT = 3001;

const app = express();


app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"))

});

app.get("../css/style.css", (req,res) =>{
    res.sendFile(path.join(__dirname, "../css/style.css"))
});

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "../../index.html"))
});


app.listen(PORT, () => {
console.log("sever is up!")
});