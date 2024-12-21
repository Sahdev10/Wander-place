const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const { listingschema, reviewShema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to creat listings!");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isowner = async(req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","You are not the owner of this listing");
       return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatlisting = (req, res, next) => {
    let { error } = listingschema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, error);
    } else {
      next();
    }
  };

  module.exports.reviewlisting = (req, res, next) => {
    let { error } = reviewShema.validate(req.body);
    if (error) {
      let errMsg = error.details
 
      throw new ExpressError(400, error);
    } else {
      next();
    }
  };

  module.exports.isReviewAuthor = async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.authore.equals(res.locals.currUser._id)){
      req.flash("error","You are not the authore of this review");
       return res.redirect(`/listings/${id}`);
    }
    next();
}