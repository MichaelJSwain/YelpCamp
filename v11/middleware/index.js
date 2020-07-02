const Campground = require("../models/campground");
const Comment = require("../models/comment");

// all the middleware goes here
let middlewareObj = {};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the comment?
                // need to use '.equals' instead of === because one is a string
                // and the other is a mongoose object
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the campground?
                // need to use '.equals' instead of === because one is a string
                // and the other is a mongoose object
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // flash message won't display until redirected to the
    // next page (/login) 
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}



module.exports = middlewareObj;