const express = require('express')
const app = express()
const port =  process.env.PORT  || 3002
const session = require('express-session')
const flash = require('express-flash')
const bodyParser = require ("body-parser");
const dbSetup = require('./db')
const userRouter = require ('./routes/userRoutes');
const Vrouter = require ("./routes/videoRoutes");
const passport = require("passport")
const initializePassport = require("./passportConfig");
initializePassport(passport);

//EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use (express.urlencoded({ extended:true}));

//body parser
app.use (bodyParser.urlencoded({ extended:false}));
      
app.use(
    session({
      secret: 'secret', 
      resave: false,
      saveUninitialized: false
    }));

  dbSetup()

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.use(express.json());
app.use(userRouter);
app.use(Vrouter);




app.listen(port, ()=>{
    console.log(`App started on port ${port}...`)
})






