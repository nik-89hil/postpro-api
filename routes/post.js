const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require('multer');
const path = require("path");

const {rootlibrary,searcher} = require('../util/root')

const storage = multer.diskStorage({
    destination:`./upload/`,
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage,
})


// post route ----

router.get("/",async(req,res)=>{
    const result = await Post.find();


    res.json({
        success:true,
        result,
        root:rootlibrary,
    })
    res.end();
})


router.post("/",async(req,res)=>{


   const id = req.body.id;
//    console.log(id,"___")
    const result = await Post.findById(id);
    // console.log(result,"____>")
    res.json({
        success:true,
        result,
    })
    res.end();
})

router.post("/image",upload.single("file"),(req,res)=>{
    // console.log(req.file,"---")
    res.json({
        success:true,
        filename:req.file,
    })

})

router.post("/images",upload.array('files'),(req,res)=>{
    // console.log(req.files,"___multiple");
    res.json({
        success:true,
        filename:req.files,
    })

})

// `http://localhost:8080/images/${


router.post("/createpost", async(req,res)=>{

    // console.log(req.body,"_____")
    
    const {intro,tags,summary,conc,author,imgarr, title} = req.body;
    const new_post = await Post.create({
        intro,
        tags:tags.split(" "),
        summary,
        conc,
        author,
        imgarr,
        title,
    })


    const result = await new_post.save();
    // console.log(result)
    res.json({
        data:result,
        success:true
    });

    res.end();
})



router.get("/topic/:topic",async(req,res)=>{
    // console.log(rootlibrary);
    let givenstr = req.params.topic;
    // console.log(givenstr);
    const db = await Post.find();
    const result = searcher.recordfound(db,givenstr);

    // console.log(result,"==")

    res.json({
        data:result,
    })
    res.end();

})

router.get("/delete/:title/:id",async(req,res)=>{
    const {title,id} = req.params;

    const result = await Post.deleteOne({title,_id:id})
    // console.log(result);
    // console.log(title)
    res.json({
        result,
    })
    res.end();
})



module.exports=router;