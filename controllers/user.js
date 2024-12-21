const User = require("../models/user.js")

module.exports.signupuser = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registerUser = await User.register(newUser, password);
      console.log(registerUser);
      req.login(registerUser,(err)=>{
        if(err){
          next(err);
        }
        req.flash("success", "Welcome to Wonderlust!");
        res.redirect("/listings");
      })
  
      
  
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

  module.exports.loginuser = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust!");
    let redirecturl = res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
  }

  module.exports.logoutuser = (req,res,next)=>{
    req.logout((err)=>{
      if(err){
        next(err);
      }
      req.flash("success","you are logged out!");
      res.redirect("/listings");
  
  
    })
  }