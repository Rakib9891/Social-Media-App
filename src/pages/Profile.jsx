import React, { use, useState, useRef, useEffect } from 'react'
import defaultImg from '../assets/user.png'

function Profile() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const allPosts = JSON.parse(localStorage.getItem('PostUpload')) || [];
  const userPost = allPosts.filter(post => post.username === user.username);
  const [edit, setEdit] = useState(false)

  // adding hooks
  const[profilePic, setProfilePic] = useState(() => localStorage.getItem("profilePic") || null)
  const fileInputRef = useRef(null);

  // to remove

  const handleRemove = () => {
    localStorage.removeItem("profilePic")
    setProfilePic(null);
    setEdit(false)
  };

  // handle add
  const handleClick = () => {
    fileInputRef.current.click();
    setEdit(false);
  };

  // for hidden input onchange
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    // to convert base64 image for refreshing
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setProfilePic(base64);
      localStorage.setItem("profilePic", base64)
    }

    // for preveiw image
    reader.readAsDataURL(file);

    // to prevent memory leak
    useEffect(() => {
      return () => {
        if(fileInputRef.current){
          fileInputRef.current.value = null;
        }
      };

    }, []);
  } 
  return (
    <div className='max-w-2xl min-h-dvh mx-auto mt-10 p-6 bg-white shadow flex flex-col justify- items-center'>
      <h2 className='text-2xl font-bold text-center mb-4'>My Profile</h2>

      <img 
        onClick={() => setEdit(!edit)}
        src={profilePic || defaultImg} alt="" className='w-50 h-50 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover hover:shadow-2xl'/>
      <div className=' bg-gray-300 flex items-center justify-center w-7 h-7 rounded-full -mt-10 -mr-18 mb-6 shadow-md hover:bg-gray-400'
      onClick={() => setEdit(!edit)} type="file" >
        <i className="fa-solid fa-pen"></i></div>
      
      {edit && (
        <div className='p-4 border left-260 top-1/4 shadow border-gray-200 mb-6  absolute z-1 bg-white rounded '>
          <div className='flex flex-col items-start'>
            
          <button 
            onClick={handleRemove}
            className='hover:bg-gray-300 hover:shadow transition p-2 rounded'>Remove Profile Picture</button> 

          <button 
            onClick={handleClick}
            className='hover:bg-gray-300 w-full hover:shadow transition p-2 rounded'>Add New Picture</button>
        
          </div>
        </div>
      )}

      
      <input type="file" accept='image/*' ref={fileInputRef} onChange={handleChange} style={{display: 'none'}} />


      <p><strong>Username: </strong>{user.username}</p>
      <p><strong>Email: </strong>{user.email}</p>
      <h3 className='text-xl font-semibold mt-10 mb-4'>My Post</h3>
      <div className='flex flex-wrap gap-2 border border-gray-200 max-w-2xl'>
      {userPost.length > 0 ?(
        userPost.map( post => (
          <div key={post.id} className=' w-max h-fit'>
            <p>{post.content}</p>
            <img src={post.image} alt="User post" />
          </div>
        ))
      ):(

      <p>No post yet</p>
      )}
      </div>
    </div>
  )
}

export default Profile;