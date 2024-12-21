const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createreview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let reviews1 = new Review(req.body.review);
    reviews1.authore=req.user._id;
    listing.reviews.push(reviews1);
    await reviews1.save();
    let res1 = await listing.save();
    console.log(res1);
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${req.params.id}`);
  }

  module.exports.destroyreview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review Deleted!");
    res.redirect(`/listings/${id}`);
  
  
  }