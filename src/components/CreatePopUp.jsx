import React, { useState } from "react";
import addPhoto from "../assets/add_photo.png";
import defaultImg from "../assets/user.png";

function CreatePopUp({ isCurrentUser = false }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const pic = currentUser?.profilePic || defaultImg;

  const handleToggle = () => {
    setIsActive(true); // toggle state
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    console.log(file);
  };

  const handleSub = (e) => {
    e.preventDefault();
    if (!caption || !image) {
      alert("Please provide image and caption");
      return;
    }

    console.log(`Post created ${caption}, ${image}`);

    const prevPost = JSON.parse(localStorage.getItem("PostUpload")) || [];

    // after refresh still can see post
    function getBase64(file) {
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => res(reader.result);
        reader.onerror = (error) => rej(error);
      });
    }
    getBase64(image).then((newImage) => {
      let newPost = {
        id: Date.now(),
        username: currentUser.username,
        content: caption,
        image: newImage,
        profilePic: currentUser.profilePic || null,
      };

      const updatedPost = [newPost, ...prevPost];
      localStorage.setItem("PostUpload", JSON.stringify(updatedPost));
    });

    setIsActive(false);
    setCaption("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div id="createPost ">
      <div
        className={isActive ? "postUloadpoup1" : "postUloadpoup2"}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="">
            <img
              className="w-10 h-10 rounded-full mx-auto border-2 border-blue-500 object-cover hover:shadow-2xl"
              style={{
                backgroundAttachment: `fixed`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
              }}
              src={pic}
              alt=""
            />
          </div>
          <h1 className="text-md font-bold ">{currentUser.username}</h1>
        </div>

        {/* {Close button } */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsActive(false);
          }}
          style={{ display: isActive ? "inline-block" : "none" }}
          className={`relative -top-12 left-132
          hover:bg-red-500 hover:text-white`}
        >
          <i className="fa-solid fa-xmark "></i>
        </span>

        <form className="bg-white " onSubmit={handleSub}>
          {/* Caption */}
          <textarea
            className="w-full bg-gray-200 border-gray-300 p-2 rounded-2xl resize-none focus:outline-none mb-2"
            placeholder="What's on your mind?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={isActive === false ? 1 : 10}
          ></textarea>

          {/* Image preview */}
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-800"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex justify-between">
            {/* File upload */}
            <label
              htmlFor="fileInput"
              className="flex items-center cursor-pointer hover:bg-gray-100 transition rounded-lg"
            >
              <span
                className="text-gray-600 p-2 font-medium w-10 h-10"
                style={{
                  backgroundImage: `url(${addPhoto})`,
                  backgroundRepeat: `no-repeat`,
                }}
              ></span>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Post button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePopUp;
