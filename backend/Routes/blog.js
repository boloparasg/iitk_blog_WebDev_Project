import express from 'express'
const router =express.Router({mergeParams:true});
import Blog from './../models/Blog.js'
import User from './../models/User.js'

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

export default router;