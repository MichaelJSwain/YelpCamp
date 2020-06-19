const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const campgrounds = [
    { name: "Salmon Creek", image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s810/Campsites.jpg" },
    { name: "Granite Hill", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
    { name: "Mountain Goat's Rest", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
    { name: "Salmon Creek", image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s810/Campsites.jpg" },
    { name: "Granite Hill", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
    { name: "Mountain Goat's Rest", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
    { name: "Salmon Creek", image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s810/Campsites.jpg" },
    { name: "Granite Hill", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
    { name: "Mountain Goat's Rest", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" }
];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {


    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
    const newCampground = {
        name: req.body.name,
        image: req.body.image
    }
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

app.listen(3005, () => console.log("YelpCamp server has started!"));