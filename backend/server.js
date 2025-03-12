// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;
const db=require('./config/db');
app.use(cors());
app.use(express.json());

// Sample data: an array of blog posts
const blogPosts = [
  { id: 1, title: "First Post", content: "This is the first post content." },
  { id: 2, title: "Second Post", content: "This is the second post content." }
];

// GET endpoint for the root URL
app.get("/", (req, res) => {
  res.json({ message: "hello there, this is backend!" });
});

// GET endpoint for /api/about
app.get("/api/about", (req, res) => {
  res.json({ message: "this is about!" });
});

// GET endpoint for /api/posts
app.get("/api/posts", (req, res) => {
  res.json(blogPosts);
});

// POST endpoint for /api/posts to add a new blog post
app.post("/api/posts", (req, res) => {
  const newPost = req.body;
  // Basic validation: ensure title and content are provided
  if (!newPost || !newPost.title || !newPost.content) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Auto-assign an id (incrementing the last id)
  newPost.id = blogPosts.length ? blogPosts[blogPosts.length - 1].id + 1 : 1;
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// DELETE endpoint for /api/posts/:id to delete a post by its id
app.delete("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const index = blogPosts.findIndex(post => post.id === postId);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  const deletedPost = blogPosts.splice(index, 1);
  res.json(deletedPost[0]); // Return the deleted post data
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
