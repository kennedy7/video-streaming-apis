const userRouter = require('express').Router()
const passport = require ('passport')
const {registerUser} = require ('../controllers/userController')

userRouter.get('/signup', (req, res)=>{
    res.render('register')
})

userRouter.post('/signup', registerUser )

userRouter.get('/login', (req, res)=>{
 res.render('login')
})
userRouter.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
)

module.exports = userRouter;

// exports.logoutUser = function (req, res) {
//     req.logout();
//     res.redirect("/");
// }
