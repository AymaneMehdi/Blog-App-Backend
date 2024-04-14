import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const UpdateBlog = ({ setX, post }) => {
  const navigate = useNavigate();
  const token = useSelector(state => state.login.token);

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    text: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "duqax7wj");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/drukcn21i/upload", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      const result = await response.json();
      setUrl(result.secure_url);
      console.log(setUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        await uploadImage(); // Upload the image first
        formData.image = url; // Set the URL of the uploaded image in the form data
      }
  
      console.log('Token:', token); // Check if token is present
      console.log('FormData:', formData); // Check formData before sending
  
      const response = await fetch(`http://localhost:8000/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Moved content-type header after the authorization header
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response:', response); // Check response from the server
  
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
  navigate("/blogs");
      setFormData({ image: '', title: '', text: ''});
      setFile(null);
      setUrl('');
  
      
    } catch (error) {
      console.error('Error updating post:', error); // Corrected console message
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <form className="update-profile-form max-w-md w-full" onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="rounded-xl bg-gray-50 py-8 text-center">
            <button
              onClick={() => setX(false)}
              className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-2 rounded w-10 h-10 -mt-40 cursor-pointer -ml-80 mr-5"
            >
              X
            </button>
            <div className="mx-auto px-4">
              <h1 className="update-profile-title mb-4 font-extrabold text-2xl dark:text-cyan-400">UPDATE YOUR BLOG</h1>
              <label htmlFor="image" className='text-white font-bold text-lg mt-8'>Image:</label>
              <input
                className="block w-full text-sm text-black border border-bg-white rounded-lg cursor-pointer bg-gray-50 dark:text-bg-white focus:outline-none dark:bg-bg-white dark:border-bg-white dark:placeholder-bg-white pt-3 pb-3 pl-3 mb-3" type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <input
                type="text"
                id="title"
                name="title"
                className="block w-full px-3 py-2 border border-cyan-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <textarea
                className="block w-full px-3 py-2 border border-cyan-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3 h-48 resize-none"
                value={formData.text}
                onChange={handleChange}
                placeholder="Text"
                name="text"
                required
              ></textarea>
              <button
                type="submit"
                className="update-profile-btn w-full rounded-md bg-cyan-400 px-3 py-2 text-center font-semibold text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-50 mt-4 pt-5 pb-5 text-xl"
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
