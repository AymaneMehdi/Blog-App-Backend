import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import image1 from "./image6.png"; // Assuming image1 is your variable for image import

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../redux/Types/Posts';

const Blogs = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

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

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-cyan-400" >
        <h2 className="mb-9 tracking-tight text-gray-900 font-extrabold text-7xl dark:text-white mt-28">OUR BLOG</h2>
        <p className="text-white text-3xl mt-10 mb-14 text-center font-extrabold">"Latest News, Tips, and Community Highlights"</p>
      </div>
      <section className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 ">  
            </div>
            <div className="grid gap-8 lg:grid-cols-2 ">
              {posts && posts.map(post => (
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
                  </article>
                )
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
