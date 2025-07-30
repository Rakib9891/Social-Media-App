import React, { use, useEffect, useState } from 'react';
import Post from '../components/Post'

function Home( {triggerReload, setTriggerReload}) {
  const [posts, setPosts] = useState([]);
  // const posts = JSON.parse(localStorage.getItem("PostUpload")) || [];

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("PostUpload")) || [];
    setPosts(storedPosts);
  }, [triggerReload]);
  
  return (
    <>
    {posts.length > 0 ? ( <div className='max-w-2xl mx-auto mt-6'>
      {posts.map((post) => (<Post key={post.id} post={post} setTriggerReload={setTriggerReload} />
    ))}
    </div>):(<div className=' flex flex-col items-center justify-center min-h-dvh'>
      <h1 className='text-5xl font-light '>No post yet</h1>
   
        <a className='p-4 bg-blue-500 text-white shadow-2xl rounded-3xl hover:bg-blue-600 border border-gray-200 hover:shadow-4xl mt-6' href="/create">Create</a>
     
    </div>)}
 
    </>
  )
}

export default Home;