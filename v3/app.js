const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds")

seedDB();

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite"
//     }, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     }
// );

// const campgrounds = [
//     { name: "Salmon Creek", image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s810/Campsites.jpg" },
//     { name: "Granite Hill", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
//     { name: "Mountain Goat's Rest", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
//     { name: "Salmon Creek", image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s810/Campsites.jpg" },
//     { name: "Granite Hill", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
//     { name: "Mountain Goat's Rest", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
//     { name: "Salmon Creek", image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s810/Campsites.jpg" },
//     { name: "Granite Hill", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" },
//     { name: "Mountain Goat's Rest", image: "https://grist.files.wordpress.com/2017/05/tent-campsite-by-river.jpg?w=1024&h=576&crop=1" }
// ];

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
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render show template with that campground
            res.render("show", { campground: foundCampground });
        }
    });
});

app.listen(3005, () => console.log("YelpCamp server has started!"));