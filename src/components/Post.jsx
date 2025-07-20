import React from 'react'

function Post({post}) {
  return (
      <div>
      <h2>{post.username}</h2>
      <p>{post.content} </p>
      {post.image && <img src={post.image} alt="Post" className='mt-3 rounded w-full max-h-[300px] object-cover'/>}

      <div className='flex gap-4 mt-5 mb-5 text-sm text-gray-600'>
        <button>Like</button>
        <button>Comment</button>
        <button>Share</button>
      </div>
    </div>
  )
}

export default Post