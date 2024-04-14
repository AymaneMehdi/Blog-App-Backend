import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import UpdateBlog from './UpdateBlog'; // Import the UpdateBlog component
import image1 from "./image6.png";

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../redux/Types/Posts';

const Posts = () => {
  const dispatch = useDispatch();
  const [X, setX] = useState(false); // State to manage whether the update modal is open
  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post for updating
  const { posts } = useSelector(state => state.posts);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const fetchPost = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_POSTS_REQUEST });
      try {
        const response = await fetch('http://localhost:8000/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        dispatch({ type: FETCH_POSTS_SUCCESS, payload: posts });
      } catch (error) {
        dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
      }
    };
  };

  const handleUpdateClick = (post) => {
    setSelectedPost(post); // Set the selected post for updating
    setX(true); // Open the update modal
  };

  return (
    <div>
    <div className="flex flex-col items-center justify-center bg-cyan-400">
  <h2 className="mb-12 tracking-tight text-gray-900 font-extrabold text-7xl dark:text-white mt-28 ">MY BLOGS</h2>
</div>
      <section className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 ">  
            </div>
            <div className="grid gap-8 lg:grid-cols-2 ">
            {posts.filter(post => post.author === user._id).map(post => (
              post && (
                <article key={post._id} className="p-6 bg-white rounded-2xl shadow-2xl dark:bg-white relative border border-solid pl-11 pr-11 mb-11 pb-11">
                  <div className="flex justify-between items-center mb-5 text-black">
                    <span className="bg-primary-100 text-primary-800 text-xs font-bold inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 text-cyan-400">
                      Post ID: {post._id}
                    </span>
                    <span className="text-sm text-cyan-400 font-bold">{post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : ''}</span>
                  </div>
                  <img class="h-auto max-w-lg rounded-lg mb-7" src={post.image} />
                  <h2 className="mb-2 text-2xl font-mono tracking-tight text-gray-900 dark:text-cyan-400"><a href="#">{post.title}</a></h2>
                  
                  <p className="mb-5 font-mono text-black text-sm">{post.text}</p>
                  <div className="flex flex-wrap justify-center mt-11">
                    <Link to={`/posts/${post._id}`} className="mx-2 mb-2">
                      <button className="bg-cyan-400 text-white hover:bg-cyan-500 rounded-lg text-sm px-4 py-2 text-center font-semibold w-32 pt-5 pb-5">READ</button>
                    </Link>
                    <button className="bg-cyan-400 text-white hover:bg-cyan-500 rounded-lg text-sm px-4 py-2 text-center font-semibold w-32 mx-2 mb-2 pt-5 pb-5" onClick={() => handleUpdateClick(post)}>UPDATE</button>
                    <button className="bg-cyan-400 text-white hover:bg-cyan-500 rounded-lg text-sm px-4 py-2 text-center font-semibold w-32 mx-2 mb-2 pt-5 pb-5"  >DELETE</button>
                  </div>
                </article>
              )
            ))}
            
            
            
            </div>
          </div>
        </div>
      </section>

      {X && selectedPost && (
        <UpdateBlog setX={setX} post={selectedPost} />
      )}
    </div>
  );
};

export default Posts;
