import express from 'express'
const router =express.Router({mergeParams:true});
import Blog from './../models/Blog.js'
import Comment from './../models/Blog.js'


router.post("/post", async (req, res) => {
  try{
  const newComment = req.body;
  const comment = new Comment(newComment);
  await comment.save()
  const blog = await Blog.findOne({
    _id: newComment.blog})

    if(!blog){ return res.status(404).json({error:"Blog not found"})}

    blog.comments.push(comment._id);
    await blog.save();
    res.json(newComment);
  }
  catch(err){
    res.status(500).json({error:err});
    console.log(err);
  }
});

export default router;