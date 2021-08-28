const express = require("express");
const app = express(); // web framework to write node.js sever script easily
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose"); // package manager for using mongodb database
const { User } = require("./models/user");
const {auth} = require("./middleware/auth")
const config = require("./config/key");
// when I have to write private things in development mode
// I make config folder and create dev.js and prod.js
// and write the private things in dev.js and create key.js 
// and write if statement to tell I use private things only when I develop and not deploy
// check config folder for more detail  
// P.S don't forget to add dev.js to .gitignore!
mongoose
  .connect(
    config.mongoURI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to MGDB");
    
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
// so when user register on website, they filled in their information and submit it
// then frontend make their data into Object and stringfy into json and send it to server(POST)
// but when server(node.js) read body they read body as undefined
// so to read(parse) data from body, we use "bodyParser"
// which is a middleware that parses the request body as form data.
// but express.js has a built-in parser for JSON data so we just use that like this app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookieParser(secretKey(to use encrypted cookie), optionObj)

app.get("/",(req,res)=>{
  res.json({"dongkyun":"i made it lol and it seems that I can't not type korean properly here lol"})
})


app.get("/api/users/auth",auth, (req, res) => {
 res.status(200).json({
   _id:req._id,
   isAuth:true,
   email: req.user.email,
   name: req.user.name,
   lastname:req.user.lastname,
   role: req.user.role
 }) 
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  
  // before save, I have to encrpy password, so i use bcrypt
  // go check user.js for more detail

  user.save((err,doc)=>{
    if(err) return res.json({sucsess: false, err});
    res.status(200).json({
      success:true,
      userData: doc
    })
  })


});
/////////////
app.post('/api/users/login', (req,res)=>{
  //find email
  User.findOne({email: req.body.email}, (err,user)=>{
    if(!user)
    return res.json({
      loginSuccess:false,
      message:"email not found"
    })

    //compare password
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch){
        return res.json({loginSuccess:false, message:"wrong password"})

      }
    })
  

    //generate token
    // when we register user.js make a special token(jwt) to individual users
    // below function means server will gonna write my token as property value of x_auth at cookie
    user.generateToken((err,user)=>{
      if(err) return res.status(400).send(err);
      res.cookie('x_auth',user.token).status(200).json({
        loginSuccess:true
      })
      
    })
  })
})

app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({
      success:true
    })
    

  })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});