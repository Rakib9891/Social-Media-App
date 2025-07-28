import React, { useState } from 'react'

function CreatePost() {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
 
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
    console.log(file);
    
  }

  const handleSub = (e) => {
    e.preventDefault();
    if(!caption || !image){
      alert("Please provide image and caption")
      return;
    }
 
  console.log(`Post created ${caption}, ${image}`);
  
  const prevPost = JSON.parse(localStorage.getItem("PostUpload")) || [];


  // after refresh still can see post 
  function getBase64(file){
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = (error) => rej(error)
    })
  }
  getBase64(image).then((newImage) => {
   

    let newPost = 
      {
        "id": Date.now(),
        "username": currentUser.username,
        "content": caption,
        "image": newImage,
      }
        
    const updatedPost = [ newPost, ...prevPost]
    localStorage.setItem("PostUpload", JSON.stringify(updatedPost))
  })

  setCaption('')
  setImage(null)
  setPreview(null)
 }  

  return (
    <div className='max-w-xl mx-auto bg-white rounded-xl shadow-xl mt-10 py-4 border border-gray-100'>
      <h2 className='text-2xl text-center font-bold mb-4'>Create Post</h2>
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
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        {/* for image  */}
        {preview && (<img src={preview} alt="preview" className='h-50 object-cover rounded'/>)}

        <input type="file" accept='image/*' onChange={handleImageChange} className='border-gray-300 border rounded-lg shadow-md px-4 py-2'/>

{/* for image preview  */}

{/* post button  */}
        <button className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white' type='submit'>Post</button>
      </form>
      </div>
    </div>
  )
}

export default CreatePost;