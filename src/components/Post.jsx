import React, { useState } from "react";
import defaultImg from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit";

function Post({ post, setTriggerReload }) {
  const curUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const postUser = users.find((u) => u.username === post.username);
  const profile_pic = postUser?.profilePic || post.profilePic || defaultImg;

  const navigate = useNavigate();
  const [treeDot, setThreeDot] = useState(false);
  const [edit, setEdit] = useState(false);
  const [like, setLike] = useState(false);

  const handleDelete = () => {};
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <div className="mx-auto relative max-w-xl bg-white shadow-md rounded-xl p-4  mb-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center w-2/3">
          <img
            onClick={() => navigate(`/profile/${postUser.username}`)}
            src={profile_pic ? profile_pic : defaultImg}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mt mr-2 cursor-pointer profile-pic border-2 border-sky-400 hover:border-2"
          />
          <h2
            onClick={() => navigate(`/profile/${postUser.username}`)}
            className="font-semibold text-lg cursor-pointer profile-name"
          >
            {post.username}
          </h2>
        </div>
        <div className="w-1/3 pl-25">
          <span
            onClick={() => setThreeDot(!treeDot)}
            className="flex items-center justify-center relative left-3/5 ml-2 rounded-full border-sky-400 hover:shadow-xl hover:border w-7 h-7 hover:bg-gray-200"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </span>
        </div>
      </div>

      {treeDot && (
        <div
          className={`threedot p-4 z-10 backdrop-filter backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200 absolute transition-all duration-700 ease-in-out transform ${
            treeDot ? "right-1/8 top-10" : " right-0 top-1 pointer-events-none"
          }`}
        >
          <div
            onClick={() => setThreeDot(!treeDot)}
            className="cross hover:bg-red-600 h-5 w-5 flex items-center justify-center p-3 hover:text-white shadow-2xl rounded mb-2 bg-gray-300"
          >
            <i className="fa-solid fa-xmark text-white"></i>
          </div>
          {post.username === curUser?.username && (
            <div className="flex flex-col">
              <button
                className="hover:bg-cyan-700 w-30 hover:shadow transition p-2  rounded-md border text-white bg-cyan-600 border-gray-200"
                onClick={() => {
                  setEdit(!edit);
                  setThreeDot(!treeDot);
                }}
              >
                Edit Post
              </button>

              <button
                onClick={handleDelete}
                className="hover:bg-red-700 w-30 hover:shadow transition p-2 bg-red-600 text-white my-1 rounded-md border border-gray-200"
              >
                Delete Post
              </button>
            </div>
          )}

          <button className="hover:bg-green-700 w-30 hover:shadow transition p-2   rounded-md border text-white bg-green-600 border-gray-200">
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

      <p className="text-gray-600 mb-2 text-sm">{post.content} </p>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-3 w-full max-h-[300px] rounded-lg object-cover"
        />
      )}

      <div className="post-like flex justify-around  mt-4 text-sm text-gray-600">
        <button onClick={handleLike} className="w-1/3">
          <i
            className={`fa-solid fa-thumbs-up text-xl  rounded-full ${
              like ? "text-sky-500":"text-gray-400"
            }`}
          ></i>{" "}
        </button>

        <button className="w-1/3">
          <i className="fa-regular fa-comment "></i> Comment
        </button>
        <button className="w-1/3">
          <i className="fa-solid fa-share "></i> Share
        </button>
      </div>
    </div>
  );
}
export default Post;
