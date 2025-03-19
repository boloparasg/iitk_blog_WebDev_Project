import Blog from './../models/Blog.js'
import User from './../models/User.js'
import Tag from './../models/Tag.js'
import Comment from './../models/Comment.js'
import mongoose from 'mongoose';

async function createBlog(req , res){
    try {
        const newBlog = req.body;
    
        const user = await User.findOne({ _id: newBlog.author });
        if (!user) return res.status(404).json({ error: "User not found" });
        console.log(user);
    
        const blog = new Blog(newBlog);
        await blog.save();
        user.Blogs.push(blog._id);
        await user.save();
        res.json(newBlog);
    
    
      }
      catch (err) {
    
        res.status(500).json({ error: err });
        console.log(err);
    }
}

async function getBlog(req , res){
     try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid blog ID" });
        }
        const blogs = await Blog.findOne({ _id: id });
        if (!blogs) return res.status(404).json({ error: "Blog not found" });
        return res.json(blogs);
      }
      catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
      }
}

async function deleteBlog(req , res){
     try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid blog ID" });
        }
        await User.updateMany({ Blogs: { $in: [id] } }, { $pull: { Blogs: id } });
        await Tag.updateMany({ blogs: { $in: [id] } }, { $pull: { blogs: id } });
        await Comment.deleteMany({ ParentBlogId: id });
        const blogs = await Blog.findOneAndDelete({ _id: id });
        if (!blogs) return res.status(404).json({ error: "Blog not found" });
        res.json(blogs);
      }
      catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
      }
}

async function updateBlog(req , res){
    try {
    
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid blog ID" });
        }
        const blogs = await Blog.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, runValidators: true });
        if (!blogs) return res.status(404).json({ error: "Blog not found" });
        res.json(blogs);
      }
      catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
      }
}

async function addCommentOrTags(req , res){
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid blog ID" });
        }
        const blog = await Blog
          .findOne({ _id: id });
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        const tag_id = req.body.tag_id;
        const comment_id = req.body.comment_id;
        if (tag_id == null && comment_id == null) return res.status(400).json({ error: "Tag_id or Comment_id is required" });
        if (tag_id != null) {
          const tag = await Tag.findOne({
            _id:
              tag_id
          });
          if (!tag) return res.status(404).json({ error: "Tag not found" });
          tag.blogs.push(blog._id);
          await tag.save();
          blog.tags.push(tag._id);
          await blog.save();
        }
        else {
          console.log("Tag_id is required");
        }
        if (comment_id != null) {
          const comment = await Comment.findOne({ _id: comment_id });
          if (!comment) return res.status(404).json({ error: "Comment not found" });
          blog.comments.push(comment._id);
          await blog.save();
        }
        else {
          console.log("Comment_id is required");
        }
        res.json(blog);
      }
      catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
      }
}

export {createBlog , getBlog , deleteBlog , updateBlog , addCommentOrTags}