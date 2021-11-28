require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session")
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require('passport');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// const bodyParser = require('body-parser')
//Database connection
mongoose.connect("mongodb://localhost:27017/pizzaDB", { useNewUrlParser: true });

//Session configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
     store: MongoDbStore.create({
         mongoUrl:'mongodb://localhost:27017/pizzaDB'
     }) // 24 hour
  })
);

const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());
app.use((req,res,next)=>{
  res.locals.session=req.session
  res.locals.user=req.user
  next()
})
require("./routes/web.js")(app);
//Assets

app.use(express.static("public"));
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))

//set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
