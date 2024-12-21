const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAysnc = require("../utils/wrapAysnc.js");
const {reviewlisting, isLoggedIn, isReviewAuthor}= require("../middleware.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewControllers = require("../controllers/review.js")

  


// post REVIEW route
router.post(
    "/",
    isLoggedIn,
    reviewlisting,
    wrapAysnc(reviewControllers.createreview)
  );
  
  // dlete review route
  
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAysnc(reviewControllers.destroyreview))
  
  module.exports = router ; 