let express = require("express");
const exphbs = require("express-handlebars");
let axios = require("axios");
let cheerio = require("cheerio");
let mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

let app = express();

let db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrape";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



app.get("/",(req,res) => {
    db.Article.find({}).then(dbArticle => {
        res.render("index", dbArticle);
    }).catch(err => {
        res.json(err);
    });
});

app.get("/articles/:id",(req,res) => {
    db.Article.findOne({ _id: req.params.id }).populate("comment").then(dbArticle => {
        //console.log(dbArticle);
        res.render("comment",dbArticle);
    }).catch(err => {
        res.json(err);
    });
});

app.get("/scrape",(req,res) => {
    axios.get("http://eldeforma.com/").then(response => {
        let $ = cheerio.load(response.data);
        //console.log(response.data);
        $("article").attr("class","article").each((i,ele) => {
            let arr = ele.children.filter(word => {
                return word.name == 'a';
            });
            //console.log(ele.children);
            if (arr[0]) {
                let result = {};
                result.title = arr[0].attribs.title.replace("Continuar leyendo : ", "");
                result.link = arr[0].attribs.href;
                
                db.Article.find({}).then(dbArticle => {
                    let isIt = dbArticle.filter(art => {
                        return art.title == result.title;
                    });
                    if(isIt.length <= 0) {
                        db.Article.create(result).then(dbArticle => {
                            console.log(dbArticle);
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                }).catch(function (err) {
                    res.json(err);
                });
            };
        });
        res.send("Scrape Complete");
    });
});

app.post("/comment/:id", (req, res) => {
    db.Comment.create(req.body).then(dbComment => {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    }).then(dbArticle => {
        res.json(dbArticle);
    }).catch(err => {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log("App running on port " + PORT + "!");
});