const express = require("express");
const router = express.Router();
const { Blog } = require("../models/blog");
const multer = require("multer");
const { auth } = require("../middleware/auth");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
          return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
      }
      cb(null, true)
  }
});

const upload = multer({ storage: storage }).single("file");
//=================================
//             Blog
//=================================


router.post('/uploadfiles',(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      return res.json({success:false,err})

    }
    return res.json({success:true, url:res.req.file.path, fileName:res.req.file.filename})
  })
})


router.post('/createPost',(req,res)=>{
let blog = new Blog(req.body);

  blog.save((err,postInfo)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true, postInfo
    })
  })
})

router.get('/getBlogs',(req,res) => {
  Blog.find() //bring posts from db
  .populate('writer')
  .exec((err,blogs)=>{
    
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true, blogs})
  })

})
//blogs.writer._id
router.post('/getPost', (req,res)=>{
  
  Blog.findOne({"_id":req.body.postId})
  .populate('writer')
  .exec((err,post)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true, post})
  })
})

router.post('/delete',(req,res)=>{
  Blog.findOneAndDelete({"_id":req.body.postId},(err,doc)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true
    })
  })

})

module.exports = router;