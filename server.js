let express = require("express");
const exphbs = require("express-handlebars");
let axios = require("axios");
let cheerio = require("cheerio");
let mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get("/",(req,res) => {
    res.render("index");
});



app.listen(PORT, () => {
    console.log("App running on port " + PORT + "!");
});