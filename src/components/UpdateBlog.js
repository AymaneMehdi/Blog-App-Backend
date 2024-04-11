import React, { useState } from 'react';

const UpdateBlog = ({ setX, post }) => {
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <form className="update-profile-form" onSubmit={handleSubmit}>
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <span
              onClick={() => setX(false)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-2 rounded w-10 h-10 ml-5 -mt-10"
            >
              X
            </span>
            <div className="mx-auto max-w-xs px-8">
              <h1 className="update-profile-title mb-4">UPDATE YOUR BLOG</h1>
              <input
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <textarea
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3"
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text"
              ></textarea>
              <button
                type="submit"
                className="update-profile-btn mt-10 block w-full rounded-2xl bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 h-12"
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
