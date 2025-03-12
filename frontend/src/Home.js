// frontend/src/Home.js
import { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";

function Home() {
  const [posts, setPosts] = useState([]);

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to handle deleting a post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${id}`);
      fetchPosts(); // Refresh the posts list after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Form to create a new post */}
      <CreatePost onPostCreated={fetchPosts} />

      <h2>Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleDelete(post.id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
