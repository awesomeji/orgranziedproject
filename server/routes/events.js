const express = require("express");
const router = express.Router();
const { Events } = require("../models/events");

const { auth } = require("../middleware/auth");

 router.post('/create-event',(req,res)=>{ 
   let event = new Events(req.body);
   event.save((err,eventData)=>{
     if(err) return res.json({success:false,err});
     return res.status(200).json({
       success:true , eventData
     })
   })
 })

 router.get('/getEvents/',(req,res) => {
 Events.find() //bring eventss from db
  .populate('writer')
  .exec((err,blogs)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true, blogs})
  })

})

module.exports = router;