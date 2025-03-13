// backend/server.js

import Blog from './models/Blog.js';
import mongoose from 'mongoose';
import User from './models/User.js';
import Comment from './models/Comment.js';
import Tag from './models/Tag.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from './config/db.js';


app.get("/", (req, res) => {
  res.json({ message: "hello there, this is backend!" });
});


app.get("/api/about", (req, res) => {
  res.json({ message: "this is about!" });
});


app.post("/api/post/Blogs",(req, res) => {
  const newPost = req.body;
  const blog=new Blog(newPost);
  blog.save()
  .then(()=>{console.log('Blog saved');
  res.json(newPost);}
  )
  .catch((err)=>{console.log(err);
})

});

app.post("/api/post/Users", (req, res) => {
   const newUser = req.body;
   const new_User= new User(newUser);
   new_User.save()
  .then(()=>{console.log('User saved');
  res.json(newUser);})
  .catch((err)=>{
    res.status(500).json({error:err});
    console.log(err); 
  })
});

app.post("/api/post/Comments", (req, res) => {
  const newComment = req.body;
  const comment=new Comment(newComment);
  comment.save()
  .then(()=>{console.log('Comment saved');
  res.json(newComment);}
  )
  .catch((err)=>{console.log(err);
})
});

app.post("/api/post/Tags", (req, res) => {
  const newTag = req.body;
  const tag=new Tag(newTag);
  tag.save()
  .then(()=>{console.log('Tag saved');
  res.json(newTag);}
  )
  .catch((err)=>{console.log(err);
})
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
