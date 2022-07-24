const{User} = require("../models/users");
const passport = require("passport");


exports.registerUser = async (req, res, next) => {
    const { first_name, last_name, email, password, passwordConfirm, } = req.body;
    console.log({ first_name, last_name, email, password, passwordConfirm});

    let errs =[]
    
        if (!first_name || !last_name || !email || !password || !passwordConfirm) {
            errs.push({ message: "please enter all fields"})
          }
          if (password.length < 6) {
            errs.push({ message:  "password should be atleast 6 characters"})
          }
          if (password != passwordConfirm) {
            errs.push({ message:  "passwords do not match"})
          }
          const existingUser = await User.findOne({ email: email })
            if (existingUser){
                errs.push({ message:  "This email is already registered"})
            }
            if(errs.length > 0){
                res.render('register', { errs})
            }
        else{
            try{
            const user = await User.create({
                first_name, 
                last_name,
                email,
                password,
                passwordConfirm,
            })
            console.log(user)
            await user.save(user, (err, user) => {
                if (err) {
                    res.send(err)
                    console.log(err)
                }
                else {
                    req.flash("success_msg", "you are now registered, Please login");
                    res.redirect("/login");
                    console.log('success')
                    console.log(user)
                   
                }
            })
        }catch (err) {
       next(err)
    }
    
}
}

exports.logoutUser = function (req, res) {
    req.logout();
    res.redirect("/");
}

exports.loginUser =function (req, res) {
    passport.authenticate('local', {
        successRedirect: '/video',
        failureRedirect: '/login',
        failureFlash: true
    })
}