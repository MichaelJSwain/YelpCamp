const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
seedDB = require("./seeds")

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


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
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
    res.render("campgrounds/new");
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
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});


// ===============================
// COMMENTS ROUTES
// ===============================

app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

app.post("/campgrounds/:id/comments", function (req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
            // connect new comment to campground
            // redirect to campground show page
        }
    });
});

app.listen(3005, () => console.log("YelpCamp server has started!"));