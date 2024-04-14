import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.login.token);

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    text: '',
    author: user._id,
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
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        await uploadImage();
        formData.image = url;
      }

      console.log('Token:', token); // Check if token is present
      console.log('FormData:', formData); // Check formData before sending

      const response = await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      console.log('Response:', response); // Check response from the server

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      setFormData({ image: '', title: '', text: '', author: user._id });
      setFile(null);
      setUrl('');

      navigate("/myblogs");
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  
  return (
    <div>
      <section className="bg-violet-700 mt-32 mb-24">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-cyan-400">Create New Blog</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="image" className='text-white font-bold text-lg mt-8'>Image:</label>
              <input
                className="block w-full text-sm text-black border border-bg-white rounded-lg cursor-pointer bg-gray-50 dark:text-bg-white focus:outline-none dark:bg-bg-white dark:border-bg-white dark:placeholder-bg-white pt-3 pb-3 pl-3 mb-3" type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {file && (
                <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '200px' }} />
              )}
            </div>
            <div>
              <label htmlFor="title" className='text-white font-bold text-lg mt-8'>Title:</label>
              <input
                className="block p-3 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light mb-3"  type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="text" className='text-white font-bold text-lg mt-8'>Content:</label>
              <textarea
                className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-3 pb-20" id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold inline-flex items-center justify-center p-2 rounded-md focus:outline-none ml-2 w-[150px] h-[50px] mt-11">Create Post</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateBlog;
