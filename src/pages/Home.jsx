import React from 'react'
import Post from '../components/Post'

function Home() {

  const posts = JSON.parse(localStorage.getItem("PostUpload")) || [];
  
  return (
    <>
    
    <div className='max-w-2xl mx-auto mt-6'>
      {posts.map((post) => (<Post key={post.id} post={post} />
    ))}
    </div>
    </>
  )
}

export default Home;