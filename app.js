if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");

const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const dbUrl = process.env.ATLASDB_URL
const MongoStore = require('connect-mongo');
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });
const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter:24*3600,
})

store.on("error",()=>{
  console.log("ERROR FO MONGO SESSION STORE",err)
})
const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found!!"));
});

app.use((err, req, res, next) => {
  let { stautscode = 500, message = "something went wrong" } = err;
  console.log(message);
  res.status(stautscode).render("listings/error.ejs", { message });
});
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
