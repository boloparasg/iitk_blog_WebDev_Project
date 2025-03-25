import React, { useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const PostPage = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Mai Sakurajima", time: "02:22 AM", text: "Really liked your views.", likes: 5, avatar: "https://i.pravatar.cc/50?img=10" },
    { id: 2, user: "Kai Centaurus", time: "02:22 AM", text: "Awesome work.", likes: 5, avatar: "https://i.pravatar.cc/50?img=11" }
  ]);

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        user: "You",
        time: "Just now",
        text: comment,
        likes: 0,
        avatar: "https://i.pravatar.cc/50?img=12"
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <img src="https://i.pravatar.cc/50?img=15" alt="User" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-lg font-bold">X_AE_A_13</h2>
            </div>
          </div>
          <h2 className="text-lg font-bold mt-2">Fusion of Societies</h2>
          <p className="text-gray-600 mt-2">
            Cultural fusion has become an increasingly prominent phenomenon in our globalized world, reshaping societies and blending diverse traditions, customs, and practices. 
            This process of cultural integration is evident across various aspects of modern life, from art and cuisine to technology and social norms. 
            The fusion of societies is an ongoing process that reflects the dynamic nature of culture in our interconnected world.
            <br />
            <span className="text-blue-500">#amazing #culture</span>
          </p>

          {/* Reactions */}
          <div className="mt-3 flex items-center gap-6 text-gray-600">
            <button className="flex items-center gap-1">
              <FaHeart className="text-red-500" /> 12
            </button>
            <button className="flex items-center gap-1">
              <FaComment /> 25 Comments
            </button>
            <button className="flex items-center gap-1">
              <FaShare /> Share
            </button>
          </div>

          {/* Comment Input */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Write your comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleCommentSubmit}
            >
              Post
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg">Comments</h3>
          {comments.map((c) => (
            <div key={c.id} className="mt-4 flex items-start space-x-3">
              <img src={c.avatar} alt="User" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{c.user}</span>
                  <span>{c.time}</span>
                </div>
                <p className="text-gray-800">{c.text}</p>
                <button className="flex items-center gap-1 text-gray-500 mt-2">
                  <FaHeart className="text-red-500" /> {c.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
