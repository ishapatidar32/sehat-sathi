const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("./models/user.js");
const Ayaush = require("./models/ayaush.js");
const session = require("express-session");


main().then(() => {console.log("connection successful")})
  .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/SehatSathi");
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use(session({
  secret: "mysecretkey",   // change to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set true if using https
}));



app.get("/ayaush", async (req, res) => {
  try {
    const alldata = await Ayaush.find({});
    res.render("./ayashulib/page1.ejs", { alldata ,user: req.session.user });
  } catch (err) {
    console.log(err);
  }
});

app.get("/ayaush/remedi" , async(req,res) =>{
  
  res.render("./ayashulib/addnewrem.ejs" , {user: req.session.user});
});

app.post("/ayaush" , async(req , res) =>{
    const { title, category, image, description, benefits, ingredients, preparation, usage, precautions } = req.body;
    const newAyaush = new  Ayaush({
      title,
      category,
      image,
      description,
      benefits,
      ingredients,
      preparation,
      usage,
      precautions
    });
    await newAyaush.save();
    res.redirect("/ayaush");
});

app.delete("/ayaush/:id",async (req,res) =>{ 
     await Ayaush.findByIdAndDelete(req.params.id);
      res.redirect("/ayaush");
});
app.get("/user" ,(req,res) =>{
    res.render("./library/index.ejs");
});

app.get("/user/register",(req,res) =>{
   if (req.session.user) {
    return res.render("./library/main.ejs", { user: req.session.user });
  }
    res.render("./library/register.ejs");
});

app.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.send("User already registered!");
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      name,
      email,
      password,
    });
     
    await newUser.save();
      req.session.user = { name, email };
      res.redirect("/main"); 
     } catch (err) {
    console.log(err);
  }
});





app.get("/user/login", (req, res) => {
  res.render("./library/login.ejs");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("No user found with this email");

    
    if (password !== user.password) return res.send("Invalid credentials");

   /* const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials");*/

    // Save session
    req.session.user = { name: user.name, email: user.email };
    res.redirect("/main");
  } catch (err) {
    console.log(err);
    res.send("Error logging in.");
  }
});

// Main page
app.get("/main", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // force login if not registered/logged in
  }
  res.render("./library/main.ejs", { user: req.session.user });
});


// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/user");
});

app.listen(3000, () => {
    console.log("server is listening to port 3000")
});
