const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function (req, res) {
    // get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

//  CREATE - Add new campground to DB
router.post("/", function (req, res) {
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
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

// SHOW - show more info about a specific campground
router.get("/:id", function (req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground)
            // render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

module.exports = router;