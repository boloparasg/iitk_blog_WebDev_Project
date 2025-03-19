import Tag from './../models/Tag.js'
import Blog from './../models/Blog.js'
import mongoose from 'mongoose'

async function postTag(req, res) {
  try {
     const newTag = req.body;
     const blog = await Blog.findOne({ _id: newTag.blogs });
     if (!blog) return res.status(404).json({ error: "Blog not found" });
 
     const tag = new Tag(newTag);
     await tag.save();
 
     blog.tags.push(tag._id);
     await blog.save();
     res.json(newTag);
   }
   catch (err) {
     res.status(500).json({ error: err });
     console.log(err);
   }
}

async function getTag(req, res) {
     try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid tag ID" });
        }
        const tags = await Tag.findOne({ _id: id });
        if (!tags) return res.status(404).json({ error: "Tag not found" });
        res.json(tags);
      }
      catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
      }
}

async function deleteTag(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }
    const tags = await Tag.findOneAndDelete({ _id: id });
    if (!tags) return res.status(404).json({ error: "Tag not found" });
    res.json(tags);
  }
  catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }

}

async function patchTag(req, res) {

     try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid tag ID" });
        }
        console.log(req.body);
        console.log(req.body.blogs)
        const tags = await Tag.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, runValidators: true });
        if (!tags) return res.status(404).json({ error: "Tag not found" });
        res.json(tags);
      }
      catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
      }

    }


    async function putTag(req, res) {
     try {
         const id = req.params.id;
         if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ error: "Invalid tag ID" });
         }
         const blog_id = req.body.blog_id;
         const tag = await Tag.findOne({ _id: id });
         if (!tag) return res.status(404).json({ error: "Tag not found" });
         const blog = await Blog
           .findOne({ _id: blog_id });
         if (!blog) { return res.status(404).json({ error: "Blog not found" }) }
         Blog.tags.push(tag._id);
         await blog.save();
         tag.blogs.push(blog._id);
         await tag.save();
         return res.json(tag);
       }
       catch (err) {
         res.status(500).json({ error: err });
         console.log(err);
       }
    }

export { postTag, getTag, deleteTag, patchTag, putTag }