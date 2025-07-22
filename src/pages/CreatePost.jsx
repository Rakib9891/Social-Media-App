import React, { useState } from 'react'

function CreatePost() {
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
        "content": caption,
        "image": newImage,
      }
    
  
    const updatedPost = [...prevPost, newPost]
    localStorage.setItem("PostUpload", JSON.stringify(updatedPost))
  })

  setCaption('')
  setImage(null)
  setPreview(null)
 }  

  return (
    <div className='max-w-md mx-auto bg-white rounded shadow mt-10 p-6'>
      <h2 className='text-2xl font-bold mb-4'>Create a Post</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSub}>
        {/* for caption  */}
        <textarea 
          placeholder='Write a caption...'
          value ={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        {/* for image  */}
        <input type="file" accept='image/*' onChange={handleImageChange} />

{/* for image preview  */}
        {preview && (<img src={preview} alt="preview" className='h-48 object-cover rounded'/>)}

{/* post button  */}
        <button className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white' type='submit'>Post</button>

      </form>
    </div>
  )
}

export default CreatePost;