const express = require("express");
const app = express();
const port = 3000;

const request = require("request");
const hbs = require("hbs");
const path = require("path");
const url =
  "https://newsapi.org/v2/top-headlines?country=eg&apiKey=0d9bb6acdbe04e3d9293ed9c5c272a03";

app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

const partialsPAth = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPAth);

app.get("", (req, res) => {
  request(url, (err, res2) => {
      
    if(err){
        res.render('404')
    }else{
        const data = JSON.parse(res2.body);
        res.render("index", {
            title: "news page",
            data,
          });
    }
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
  });
});

app.listen(port, () => {
  console.log("listenning on port 3000");
});
