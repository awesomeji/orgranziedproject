const express = require("express");
const app = express(); // web framework to write node.js sever script easily
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose"); // package manager for using mongodb database
const { User } = require("./models/user");
const {auth} = require("./middleware/auth")
const config = require("./config/key");
const path = require('path');

// when I have to write private things in development mode
// I make config folder and create dev.js and prod.js
// and write the private things in dev.js and create key.js 
// and write if statement to tell I use private things only when I develop and not deploy
// check config folder for more detail  
// P.S don't forget to add dev.js to .gitignore!
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

// mongoose
//   .connect(
//     config.mongoURI,
//     { useNewUrlParser: true },
//     { useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("connected to MGDB");
    
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.use(express.json());
// so when user register on website, they filled in their information and submit it
// then frontend make their data into Object and stringfy into json and send it to server(POST)
// but when server(node.js) read body they read body as undefined
// so to read(parse) data from body, we use "bodyParser"
// which is a middleware that parses the request body as form data.
// but express.js has a built-in parser for JSON data so we just use that like this app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookieParser(secretKey(to use encrypted cookie), optionObj)



app.use('/api/users', require('./routes/users'));
app.use('/api/blog', require('./routes/blog'));

app.use('/api/calendar', require('./routes/events'))

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});

