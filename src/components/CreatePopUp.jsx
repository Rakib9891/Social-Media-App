import React, { useState } from "react";
import addPhoto from "../assets/add_photo.png";
import location from "../assets/location.png";
import tag from "../assets/tag.png";
import emoji from "../assets/emoji.png";
import defaultImg from "../assets/user.png";

function CreatePopUp({ isCurrentUser = false, setTriggerReload }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pic = currentUser?.profilePic || defaultImg;

  const handleToggle = () => {
    setIsActive(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSub = async (e) => {
    
    
    if (!caption.trim()) {
      alert("Please write something to share");
      return;
    }

    setIsLoading(true);

    try {
      const prevPost = JSON.parse(localStorage.getItem("PostUpload")) || [];

      function getBase64(file) {
        return new Promise((res, rej) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => res(reader.result);
          reader.onerror = (error) => rej(error);
        });
      }

      let newImage = null;
      if (image) {
        newImage = await getBase64(image);
      }

      let newPost = {
        id: Date.now(),
        username: currentUser.username,
        content: caption.trim(),
        image: newImage,
        profilePic: currentUser.profilePic || null,
        createdAt: new Date().toISOString(),
      };

      const updatedPost = [newPost, ...prevPost];
      localStorage.setItem("PostUpload", JSON.stringify(updatedPost));

      if (setTriggerReload) {
        setTriggerReload(prev => !prev);
      }

      // Reset form
      setIsActive(false);
      setCaption("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (!isLoading) {
      setIsActive(false);
      setCaption("");
      setImage(null);
      setPreview(null);
    }
  };

  const removePreview = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <>
      {/* Mobile/Tablet backdrop overlay */}
      {isActive && (
        <div 
          className="fixed  z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      <div className="w-full max-w-none sm:max-w-xl mx-auto mb-4 sm:mb-6 mt-4">
        <div
          className={`
            relative bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300
            ${isActive 
              ? 'fixed z-50 lg:z-auto overflow-y-auto' 
              : 'cursor-pointer hover:bg-gray-50'
            }
          `}
          onClick={!isActive ? handleToggle : undefined}
        >
          <div className="p-3 sm:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-400 object-cover transition-all duration-300 hover:border-blue-500 hover:shadow-lg flex-shrink-0"
                  src={pic}
                  alt={`${currentUser?.username}'s profile`}
                />
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                    {currentUser?.username}
                  </h1>
                  {isActive && (
                    <p className="text-xs text-gray-500">Share your thoughts</p>
                  )}
                </div>
              </div>

              {/* Close button - only show when active */}
              {isActive && (
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors disabled:opacity-50"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <form onSubmit={handleSub} className="space-y-3">
              {/* Textarea */}
              <div className="relative">
                <textarea
                  className={`
                    w-full bg-gray-50 border border-gray-200 rounded-xl p-3 resize-none 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder-gray-500 text-sm sm:text-base transition-all duration-200
                    ${isActive ? 'min-h-[120px]' : 'h-12 cursor-pointer'}
                  `}
                  placeholder={isActive ? "What's on your mind?" : "What's on your mind?"}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={isActive ? 5 : 1}
                  disabled={isLoading}
                  readOnly={!isActive}
                  maxLength={2000}
                />
                {isActive && caption.length > 0 && (
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {caption.length}/2000
                  </div>
                )}
              </div>

              {/* Image preview */}
              {preview && (
                <div className="relative">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-64 sm:max-h-80 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePreview}
                      disabled={isLoading}
                      className="absolute top-2 right-2 w-8 h-8 bg-gray-900 bg-opacity-75 hover:bg-opacity-90 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons - only show when active */}
              {isActive && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  {/* Left side - Media buttons */}
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Photo upload */}
                    <label
                      htmlFor="fileInput"
                      className={`
                        flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg
                        hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      title="Add Photo"
                    >
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={isLoading}
                      />
                      <img 
                        src={addPhoto} 
                        alt="Add photo" 
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                      />
                    </label>

                    {/* Emoji button */}
                    <button
                      type="button"
                      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      title="Add Emoji"
                      disabled={isLoading}
                    >
                      <img 
                        src={emoji} 
                        alt="Add emoji" 
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                      />
                    </button>

                    {/* Location button */}
                    <button
                      type="button"
                      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      title="Add Location"
                      disabled={isLoading}
                    >
                      <img 
                        src={location} 
                        alt="Add location" 
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      />
                    </button>

                    {/* Tag button */}
                    <button
                      type="button"
                      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      title="Tag People"
                      disabled={isLoading}
                    >
                      <img 
                        src={tag} 
                        alt="Tag people" 
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                      />
                    </button>
                  </div>

                  {/* Right side - Post button */}
                  <button
                    type="submit"
                    disabled={isLoading || !caption.trim()}
                    className={`
                      px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base
                      transition-all duration-200 flex items-center space-x-2
                      ${caption.trim() && !isLoading
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <span>Post</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePopUp;