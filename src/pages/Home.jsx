import React, { use, useEffect, useState } from "react";
import Post from "../components/Post";
import CreatePost from "./CreatePost";
import CreatePopUp from "../components/CreatePopUp";

function Home({ triggerReload, setTriggerReload }) {
  const [posts, setPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("PostUpload")) || [];
    setPosts(storedPosts);
  }, [triggerReload]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] xl:grid-cols-[280px_1fr_280px] pt-[60px] bg-gray-100 min-h-screen">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-[10px] left-4 z-130 bg-white p-2 rounded-lg shadow-md"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-opacity-50 z-20 pt-[60px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed lg:relative top-[60px] lg:top-0 left-0 h-[calc(100vh-60px)] lg:h-screen 
        w-64 lg:w-full bg-[#f3f4f6] lg:bg-transparent z-30 lg:z-auto shadow-md
        lg:block
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        transition-transform duration-300 ease-in-out lg:transition-none
        overflow-y-auto p-4
      `}>
        <div className="lg:hidden mb-4">
          <button 
            onClick={toggleSidebar}
            className="float-right p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="clear-both"></div>
        </div>
        
        <ul className="space-y-2">
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Profile
          </li>
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Friends
          </li>
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Videos
          </li>
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Groups
          </li>
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Marketplace
          </li>
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Memories
          </li>
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Saved
          </li>
          <li className="aside-items p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            Feeds
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main px-4 lg:px-6 xl:px-8 col-span-1 lg:col-span-1">
        <CreatePopUp />
        {posts.length > 0 ? (
          <div className="max-w-2xl mx-auto mt-6 space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                setTriggerReload={setTriggerReload}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center">
            <div className="max-w-md mx-auto px-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-4">
                No posts yet
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                Start sharing your thoughts with the community!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Hidden on mobile and tablet, shown on large screens */}
      <div className="hidden lg:block p-4 h-screen overflow-y-auto">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Sponsored</h3>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">Advertisement space</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
          <h3 className="font-semibold text-gray-700 mb-3">Contacts</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Friend suggestions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;