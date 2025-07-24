import React from 'react'

function Post({post}) {
  return (
      <div className='mx-auto max-w-xl bg-white shadow-md rounded-xl p-4  mb-6'>
      <h2 className='font-semibold text-lg mb-4'>{post.username}</h2>
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