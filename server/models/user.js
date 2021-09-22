const mongoose = require('mongoose');
const bcrypt = require('bcrypt');//encrypt password
const saltRounds = 10;
const jwt = require('jsonwebtoken');// web distinguish user and admin with token
const userSchema = mongoose.Schema({

//user's name
 name:{
   type:String,
   maxlength:50,
 },
 email:{
   type:String,
   trim:true,
   unique:1, //which means true
 },
 password:{
   type:String,
   minlength:6,
 },
 lastname:{
   type:String,
   maxlength:50,
 },
 role:{
   type:Number,
   default:0, //normal user
 },
 token:{
   type:String,
 },
 tokenExp:{
   type:Number,
 }


})

// which mean i am gonna do this function before save userSchema
userSchema.pre('save',function(next){
  var user =this; 
  if(user.isModified('password')){

  
  bcrypt.genSalt(saltRounds, function(err,salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err,hash){
      if(err) return next(err);
      user.password = hash;
      next();
    })

  })
} else {
  next ()
}
});
//////////////////////////
userSchema.methods.comparePassword = function(plainpassword,cb){
  bcrypt.compare(plainpassword, this.password, function(err,isMatch){
    if(err) return cb(err);
    cb(null,isMatch);
  })
}
////////////////////////////////////
userSchema.methods.generateToken = function(cb){
  var user = this;
  var token = jwt.sign(user._id.toHexString(),'secret');

  user.token = token;
  user.save(function(err,user){
    if(err) return cb(err);
    cb(null,user);
  })
}
//_id is a mongoose method 
// send something to the mongodb 
//and check browse collection 
// _id is created automatically

////function to compare
userSchema.statics.findByToken = function(token,cb){
  var user = this;
  jwt.verify(token,'secret',function(err,decode){
   user.findOne({"_id":decode, "token":token},function(err,user){
     if(err) return cb(err);
     cb(null,user);
   })
  })
}

const User =  mongoose.model('User', userSchema);

module.exports = {User}