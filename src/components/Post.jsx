import React, { useState } from 'react'
import defaultImg from '../assets/user.png'
import { useNavigate } from 'react-router-dom';
import Edit from './Edit';


function Post({post, setTriggerReload}) {

  const profilPic = localStorage.getItem("profilePic") || null;
  const navigate = useNavigate();
  const [treeDot, setThreeDot ] = useState(false);
  const [edit, setEdit] = useState(false);


  return (
      <div className='mx-auto relative max-w-xl bg-white shadow-md rounded-xl p-4  mb-6'>

      <div className='flex items-center mb-6'>
      <img 
        onClick={() => navigate("/profile")} 
        src={profilPic ? profilPic : defaultImg} alt="Profile" 
        className='w-10 h-10 rounded-full object-cover mt mr-2 cursor-pointer profile-pic border-2 border-sky-400 hover:border-2'
        />
      <h2 
        onClick={() => navigate("/profile")} 
        className='font-semibold text-lg cursor-pointer profile-name'>{post.username}</h2>

      <span 
        onClick={ () => setThreeDot(!treeDot)}
        className='flex items-center justify-center relative left-3/5 ml-2 rounded-full border-sky-400 hover:shadow-xl hover:border w-7 h-7 hover:bg-gray-200'><i className="fa-solid fa-ellipsis-vertical"></i></span>
      </div>

    {treeDot && (
        <div className={`threedot p-1 z-10 bg-white rounded-lg shadow-2xl border border-gray-200 absolute transition-all duration-300 ease-in-out transform ${treeDot ? 'right-1/8 top-1' : ' right-0 top-1 pointer-events-none'}`}>
          <div 
            onClick={() => setThreeDot(!treeDot)}
            className='cross hover:bg-red-600 h-5 w-5 flex items-center justify-center p-3 hover:text-white shadow-2xl rounded mb-2 '><i className="fa-solid fa-xmark"></i></div>

          <button className='hover:bg-gray-300 w-full hover:shadow transition p-2 rounded border border-gray-200' onClick={() => {
            setEdit(!edit)
            setThreeDot(!treeDot);
          }}>Edit Post</button>

          <button className='hover:bg-gray-300 w-full hover:shadow transition p-2 my-1 rounded border border-gray-200'>Delete Post</button>

          <button className='hover:bg-gray-300 w-full hover:shadow transition p-2  rounded border border-gray-200'>Save</button>
        </div>)}
      
     
      {edit && <Edit postId={post.id} setEdit={setEdit} setTriggerReload={setTriggerReload}/>}

      <p className='text-gray-600 mb-2 text-sm'>{post.content} </p>
      {post.image && <img src={post.image} alt="Post" className='mt-3 w-full max-h-[300px] rounded-lg object-cover'/>}

      <div className='post-like flex justify-around  mt-4 text-sm text-gray-600'>
        <button className='w-1/3'><i className="fa-regular fa-thumbs-up"></i> Like</button>
        
        <button className='w-1/3'><i className='fa-regular fa-comment '></i> Comment</button>
        <button className='w-1/3'><i className='fa-solid fa-share '></i> Share</button>
      </div>
    </div>
  )
}
export default Post;