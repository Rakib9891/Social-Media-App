import React from 'react'
import Post from '../components/Post'
function Home() {
  const fakePost =[
    {
      id: 1,
      username: 'user1',
      content: 'This is my first post',
      image: "https://picsum.photos/400/250?random=1",
    },
    {
      id: 2,
      username: 'user2',
      content: 'Hello, this is another post',
      image:  "https://picsum.photos/400/250?random=3",
    }


    
  ]
  return (
    <div className='max-w-2xl mx-auto mt-6'>
      {fakePost.map((post) => (<Post key={post.id} post={post} />
    ))}
    </div>
  )
}

export default Home;