const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds")

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

seedDB();

app.get("/", function (req, res) {
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function (req, res) {
    // get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

//  CREATE - Add new campground to DB
app.post("/campgrounds", function (req, res) {
    const newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW - Show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

// SHOW - show more info about a specific campground
app.get("/campgrounds/:id", function (req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground)
            // render show template with that campground
            res.render("show", { campground: foundCampground });
        }
    });
});

app.listen(3005, () => console.log("YelpCamp server has started!"));