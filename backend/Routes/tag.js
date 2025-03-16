import express from 'express'
const router =express.Router({mergeParams:true});
import Tag from './../models/Tag.js'
import Blog from './../models/Blog.js'
import mongoose from 'mongoose';

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
   
router.get("/:id", async(req, res) => {
    try{
      const id= req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid tag ID" });
      }
      const tags= await Tag.findOne({_id:id});
      if(!tags) return res.status(404).json({error:"Tag not found"});
      res.json(tags);
    }
    catch(err){
      res.status(500).json({error:err});
      console.log(err);
    }
});

router.delete("/:id", async(req, res) => {
    try{
      const id= req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid tag ID" });
      }
      const tags= await Tag.findOneAndDelete({_id:id});
      if(!tags) return res.status(404).json({error:"Tag not found"}); 
      res.json(tags);
    }
    catch(err){
      res.status(500).json({error:err});
      console.log(err);
    } 
});

router.patch("/:id", async(req, res) => {
    try{
      const id= req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid tag ID" });
      }
      const tags= await Tag.findOneAndUpdate({_id:id},{$set: req.body},{new:true,runValidators:true});
      if(!tags) return res.status(404).json({error:"Tag not found"});
      res.json(tags);
    }
    catch(err){
      res.status(500).json({error:err});
      console.log(err);
    }
});

export default router;