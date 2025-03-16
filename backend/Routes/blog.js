import express from 'express'
const router =express.Router({mergeParams:true});
import Blog from './../models/Blog.js'
import User from './../models/User.js'
import mongoose from 'mongoose';
router.post("/post", async(req, res) => {
try{
  const newBlog=req.body;
  const blog = new Blog(newBlog);
  await blog.save();

  const user= await User.findOne({_id:newBlog.author});
  if(!user) return res.status(404).json({error:"User not found"});
  console.log(user);
  user.Blogs.push(blog._id);
  await user.save();
  res.json(newBlog);

}
catch(err){
  
  res.status(500).json({error:err});
  console.log(err);}
});


router.get("/:id", async(req, res) => {
  try{
    const id= req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    const blogs= await Blog.findOne({_id:id});
    if(!blogs) return res.status(404).json({error:"Blog not found"});
    return res.json(blogs);
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
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    const blogs= await Blog.findOneAndDelete({_id:id});
    if(!blogs) return res.status(404).json({error:"Blog not found"}); 
    res.json(blogs);
  }
  catch(err){
    res.status(500).json({error:err});
    console.log(err);
  } 
}
);

router.patch("/:id", async(req, res) => {
  try{
    
    const id= req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    const blogs= await Blog.findOneAndUpdate({_id:id},{$set: req.body},{new:true,runValidators:true});
    if(!blogs) return res.status(404).json({error:"Blog not found"});
    res.json(blogs);
  }
  catch(err){
    res.status(500).json({error:err});
    console.log(err);
  }
});







export default router;