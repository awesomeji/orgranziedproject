const express = require("express");
const router = express.Router();
const { Quests } = require("../models/quests");

const { auth } = require("../middleware/auth");

router.post('/create-quest',(req,res)=>{ 
  let quest = new Quests(req.body);
  quest.save((err,questData)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true ,questData
    })
  })
})

router.get('/getQuests',(req,res)=>{
  Quests.find()
  .populate('writer')
  .exec((err,quests)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true,quests})
  })
})


router.post('/updatebar',(req,res)=>{
  Quests.findOneAndUpdate({"_id":req.body.questId},{$inc:{"percent":req.body.percent}})
  .exec((err,quests)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true,quests})
  })

})

module.exports = router;