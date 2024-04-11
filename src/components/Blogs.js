import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import UpdateBlogs from './UpdateBlog';
import image from "./11.jpg";

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../redux/Types/Posts';

const Blogs = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////
  return (
    <div>
    <section className="flex items-center justify-center min-h-screen bg-no-repeat bg-fixed" style={{backgroundImage: `url(${image})`}}>
  <div className="flex items-center justify-center min-h-screen bg-cover bg-center w-full h-full">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 ">
              <h2 className="mb-9 tracking-tight text-gray-900 font-extrabold text-7xl dark:text-cyan-400  ">OUR BLOG</h2>
              <p className="font-light text-violet-600 text-5xl mb-11">"Apex Legends Unleashed: Latest News, Tips, and Community Highlights"</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 ">
            {posts && posts.map(post => (
              post && (
                  <article key={post._id} className="p-6 bg-white rounded-2xl shadow-2xl dark:bg-white relative pb-24 border border-solid border-cyan-400 border-x-4 border-y-4 pl-11 pr-11">
                      <div className="flex justify-between items-center mb-5 text-black">
                          <span className="bg-primary-100 text-primary-800 text-xs font-bold inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 text-cyan-400">
                              Post ID : {post._id}
                          </span>
                          <span className="text-sm text-cyan-400 font-bold ">{post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : ''}</span>
                      </div>
                      <h2 className="mb-2 text-2xl font-mono tracking-tight text-gray-900 dark:text-cyan-400"><a href="#">{post.title}</a></h2>
                      <img
                          className="h-96 w-full rounded-lg object-cover object-center mt-11 mb-11"
                          src={image}
                          alt="nature image"
                      />
                      <p className="mb-5 font-mono text-black text-sm ">{post.text}</p>
                      <div className="absolute bottom-0 transform mb-5 m-2 ">
                          <Link to={`/posts/${post._id}`}>
                              <button className="bg-cyan-400 text-white hover:bg-cyan-500 rounded-lg text-sm px-4 py-2 text-center font-semibold w-32 h-14 m-4">READ</button>
                          </Link>           
                      </div>
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
