import React, { use } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Edit({setEdit, postId, setTriggerReload}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const posts = JSON.parse(localStorage.getItem("PostUpload")) || [];
  const index = posts.findIndex(post => post.id === postId); 
  const userPost = posts[index];
  const navigate = useNavigate();

  const [caption, setCaption] = useState(userPost ? userPost.content : '');

  const handleSub = (e) => {
    e.preventDefault();
    
    if (index !== -1) {
      posts[index].content = caption;
      localStorage.setItem("PostUpload", JSON.stringify(posts));
      setTriggerReload( prev => !prev);
      // alert("Post updated successfully!");
      navigate("/");
    }
    setEdit(false);
  }

  const handleChange = (e) => {
    setCaption(e.target.value);
  }
  return (
        <div className='max-w-xl w-xl z-20 absolute mx-auto bg-white rounded-xl shadow-xl mt-10 py-4 border border-gray-100'>
      <h2 className='text-2xl text-center font-bold mb-4'>Edit post</h2>
      <hr className='text-gray-300' />

      <div className='px-6 create-post'>
      <div className='mt-3'>
          <span className='bg-gray-400 p-1 mr-2 rounded-full '>Pic</span>
        <span>{currentUser.username}</span>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSub}>
        {/* for caption  */}
        <textarea 
          className='textarea'
          placeholder='Write a caption...'
          value ={caption}
          onChange={handleChange}
        ></textarea>

{/* post button  */}
        <button className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white' type='submit'>Post</button>
      </form>
      </div>
    </div>
  )
}

export default Edit