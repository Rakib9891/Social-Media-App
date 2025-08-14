import React, { useState } from "react";
import defaultImg from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit";

function Post({ post, setTriggerReload }) {
  const curUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const posts = JSON.parse(localStorage.getItem("PostUpload")) || [];

  const postUser = users.find((u) => u.username === post.username);
  const profile_pic = postUser?.profilePic || post.profilePic || defaultImg;

  const navigate = useNavigate();
  const [treeDot, setThreeDot] = useState(false);
  const [edit, setEdit] = useState(false);
  const [like, setLike] = useState(false);

  const handleDelete = () => {
    const posts = JSON.parse(localStorage.getItem("PostUpload")) || [];
    // filtering without the delete post
    const updatedPost = posts.filter((p) => String(p.id) !== String(post.id));
    // updatin on local Storage
    localStorage.setItem("PostUpload", JSON.stringify(updatedPost));
    setTriggerReload((prev) => !prev);
  };

  const handleLike = () => {
    setLike(!like);
  };

  // Function to format time ago
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value >= 1) {
        return value === 1 ? `${value} ${key} ago` : `${value} ${key}s ago`;
      }
    }
    return "Just now";
  }
  return (
    <div className="mx-auto relative max-w-xl bg-white border border-gray-300 shadow-md rounded-xl p-4 mb-5">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <div className="flex items-center flex-grow">
          <img
            onClick={() => navigate(`/profile/${postUser.username}`)}
            src={profile_pic || defaultImg}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer border-2 border-sky-400 hover:border-sky-500 transition"
          />
          <div>
            <h2
              onClick={() => navigate(`/profile/${postUser.username}`)}
              className="font-semibold text-base cursor-pointer leading-tight"
            >
              {post.username}
            </h2>
            <div className="text-gray-500 text-xs">
              {timeAgo(post.createdAt)}
            </div>
          </div>
        </div>

        {/* Options Menu */}
        <span
          onClick={() => setThreeDot(!treeDot)}
          className="flex items-center justify-center rounded-full hover:bg-gray-200 w-8 h-8 cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>
        </span>
      </div>

      {/* Three Dot Menu */}
      {treeDot && (
        <div className="absolute right-4 top-14 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10 space-y-2">
          <div
            onClick={() => setThreeDot(false)}
            className="hover:bg-red-500 hover:text-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          {post.username === curUser?.username && (
            <>
              <button
                onClick={() => {
                  setEdit(!edit);
                  setThreeDot(false);
                }}
                className="w-full bg-cyan-600 text-white py-1.5 rounded hover:bg-cyan-700 transition"
              >
                Edit Post
              </button>
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-1.5 rounded hover:bg-red-700 transition"
              >
                Delete Post
              </button>
            </>
          )}

          <button className="w-full bg-green-600 text-white py-1.5 rounded hover:bg-green-700 transition">
            Save
          </button>
        </div>
      )}

      {edit && (
        <Edit
          postId={post.id}
          setEdit={setEdit}
          setTriggerReload={setTriggerReload}
        />
      )}

      {/* Post Content */}
      <p className="text-gray-700 mb-3 text-sm">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-2 w-full max-h-[300px] rounded-lg object-cover"
        />
      )}

      {/* Post Actions */}
      <div className="post-like flex justify-around mt-4 text-gray-300 border-t pt-3">
        <button onClick={handleLike} className="w-1/3 space-x-2">
          <i
            className={`fa-solid fa-thumbs-up text-lg ${
              like ? "text-sky-500" : "text-gray-400"
            }`}
          ></i>
        </button>
        <button className="w-1/3 space-x-2">
          <i className="fa-regular fa-comment text-lg"></i>
        </button>
        <button className="w-1/3 space-x-2">
          <i className="fa-solid fa-share text-lg"></i>
        </button>
      </div>
    </div>
  );
}
export default Post;
