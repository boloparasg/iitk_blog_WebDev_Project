import User from './../models/User.js'
import mongoose from 'mongoose'
import Blog from './../models/Blog.js'
import Tag from './../models/Tag.js'
import Comment from './../models/Comment.js'

async function createUser(req, res) {
  try {
    const newUser = req.body;
    const new_User = new User(newUser);
    await new_User.save();
    res.json(newUser);
  }
  catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  }
  catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const blogs = await Blog.find({ user: id });

    if (!blogs.length) { console.log("No blogs found") }

    else {
      const blogIds = blogs.map((blog) => blog._id);
      await Tag.updateMany({ blogs: { $in: blogIds } }, { $pull: { blog: { $in: blogIds } } });
      await Comment.deleteMany({ ParentBlogId: { $in: blogIds } });
      await Blog.deleteMany({ user: id });
    }


    const user = await User.findOneAndDelete({ _id: id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  }
  catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = await User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  }
  catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
}

export { createUser, getUser, deleteUser, updateUser }