import React from 'react'

function Post({post}) {
  return (
      <div className='mb-9'>
      <h2 className='font-bold mb-4'>{post.username}</h2>
      <p className='font-light text-sm'>{post.content} </p>
      {post.image && <img src={post.image} alt="Post" className='mt-3 rounded w-full max-h-[300px] object-cover'/>}

      <div className='flex gap-4 mt-5 mb-5 text-sm text-gray-600'>
        <button>Like</button>
        <button>Comment</button>
        <button>Share</button>
      </div>
    </div>
  )
}
export default Post;