import express from 'express'
const router =express.Router({mergeParams:true});
import Tag from './../models/Tag.js'
import Blog from './../models/Blog.js'


router.post("/post", async (req, res) => {
    try{
       const newTag=req.body;
       const tag=new Tag(newTag);
       await tag.save();
       const blog = await Blog.findOne({ _id: newTag.blogs });
       if(!blog) return res.status(404).json({error:"Blog not found"});
       blog.tags.push(tag._id);
       await blog.save();
       res.json(newTag);
    }
    catch(err){
      res.status(500).json({error:err});
      console.log(err);
    }
});
   
export default router;