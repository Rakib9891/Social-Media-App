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
  const [showComments, setShowComments] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleDelete = () => {
    const posts = JSON.parse(localStorage.getItem("PostUpload")) || [];
    const updatedPost = posts.filter((p) => String(p.id) !== String(post.id));
    localStorage.setItem("PostUpload", JSON.stringify(updatedPost));
    setTriggerReload((prev) => !prev);
  };

  const handleLike = () => {
    setLike(!like);
  };

  // Close dropdown when clicking outside
  const handleDropdownToggle = () => {
    setThreeDot(!treeDot);
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

  // Truncate long content on mobile
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return showFullContent ? content : content.substring(0, maxLength) + "...";
  };

  return (
    <>
      {/* Backdrop for dropdown on mobile */}
      {treeDot && (
        <div
          className="fixed z-20 md:hidden"
          onClick={() => setThreeDot(false)}
        />
      )}

      <div className="w-full max-w-none sm:max-w-xl mx-auto relative bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-5">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center flex-grow min-w-0">
            <img
              onClick={() => navigate(`/profile/${postUser.username}`)}
              src={profile_pic || defaultImg}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mr-2 sm:mr-3 cursor-pointer border-2 border-blue-400 hover:border-blue-500 transition-colors flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h2
                onClick={() => navigate(`/profile/${postUser.username}`)}
                className="font-semibold text-sm sm:text-base cursor-pointer leading-tight hover:text-blue-600 transition-colors truncate"
              >
                {post.username}
              </h2>
              <div className="text-gray-500 text-xs">
                {timeAgo(post.createdAt)}
              </div>
            </div>
          </div>

          {/* Options Menu Button */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 w-8 h-8 sm:w-9 sm:h-9 cursor-pointer transition-colors flex-shrink-0"
              aria-label="Post options"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {treeDot && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-30 py-1">
                <div className="px-3 py-2 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Options
                    </span>
                    <button
                      onClick={() => setThreeDot(false)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="py-1">
                  {post.username === curUser?.username && (
                    <>
                      <button
                        onClick={() => {
                          setEdit(!edit);
                          setThreeDot(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span>Edit Post</span>
                      </button>
                      <button
                        onClick={() => {
                          handleDelete();
                          setThreeDot(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span>Delete Post</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setThreeDot(false)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    <span>Save Post</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {edit && (
          <Edit
            postId={post.id}
            setEdit={setEdit}
            setTriggerReload={setTriggerReload}
          />
        )}

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
            {truncateContent(post.content)}
          </p>
          {post.content && post.content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 transition-colors"
            >
              {showFullContent ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="mb-3 overflow-hidden rounded-lg">
            <img
              src={post.image}
              alt="Post content"
              className="w-full max-h-[250px] sm:max-h-[400px] object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => {
                // Add lightbox functionality here if needed
              }}
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="border-t border-gray-100 pt-2 sm:pt-3">
          <div className="flex items-center justify-around">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors group"
            >
              <i
                className={`fa-solid fa-thumbs-up text-lg sm:text-xl transition-colors ${
                  like
                    ? "text-sky-500"
                    : "text-gray-400 group-hover:text-sky-500"
                }`}
              ></i>
              <span
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  like
                    ? "text-sky-500"
                    : "text-gray-600 group-hover:text-sky-500"
                }`}
              >
                Like
              </span>
            </button>

            {/* Comment Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors group"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-green-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">
                Comment
              </span>
            </button>

            {/* Share Button */}
            <button className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors group">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">
                Share
              </span>
            </button>
          </div>
        </div>

        {/* Comments Section (placeholder) */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500 text-center py-4">
              Comments feature coming soon...
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
