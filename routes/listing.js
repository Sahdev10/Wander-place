const express = require("express");
const router = express.Router();
const wrapAysnc = require("../utils/wrapAysnc.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isowner, validatlisting } = require("../middleware.js");
const listingsController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage } = require("../cloudconfig1.js")
const upload = multer({ storage })


router
  .route("/")
  .get(wrapAysnc(listingsController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validatlisting,
    wrapAysnc(listingsController.createlisting)
  )
  

  
//New Route
router.get("/new", isLoggedIn, listingsController.renderNew);

//Show Route
router
  .route("/:id")
  .get(wrapAysnc(listingsController.showlisting))
  .put(
    isLoggedIn,
    isowner,
    upload.single('listing[image]'),
    validatlisting,
    wrapAysnc(listingsController.updateslisting)
  )
  .delete(isLoggedIn, isowner, wrapAysnc(listingsController.destroylisting));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isowner,
  wrapAysnc(listingsController.editlisting)
);

module.exports = router;
