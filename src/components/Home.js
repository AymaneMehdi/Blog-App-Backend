import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import image from './4.jpeg'
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../redux/Types/Posts';


const Home = () => {
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
    <div className='bg-violet-600'>
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center mt-16" style={{backgroundImage: `url(${image})`}}>
    </div>
    <div className="grid gap-8 lg:grid-cols-2 mt-11 mb-11 ml-11 mr-11  ">
    {posts && posts.slice(0, 2).map(post => (
      post && (
                  <article key={post._id} className="p-6 bg-white rounded-2xl shadow-2xl dark:bg-white relative pb-24 border border-solid border-cyan-400 border-x-4 border-y-4 pl-11 pr-11">
                      <div className="flex justify-between items-center mb-5 text-black">
                          <span className="bg-primary-100 text-primary-800 text-xs font-bold inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 text-cyan-400">
                              Post ID : {post._id}
                          </span>
                          <span className="text-sm text-cyan-400 font-bold ">{post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : ''}</span>
                      </div>
                      <h2 className="mb-2 text-2xl font-mono tracking-tight text-gray-900 dark:text-cyan-400"><a href="#">{post.title}</a></h2>
                      <p className="mb-5 font-mono text-black text-sm ">{post.text}</p>
                  </article>
              )
          ))}
            </div>

            <section className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-cyan-400 sm:text-4xl">
                    Apex Legends is available for free on PlayStation®4, PlayStation®5, Xbox One, Xbox Series X|S, Nintendo Switch, and PC via EA App and Steam. Choose your platform below, download the game, and get ready to jump into the arena.
                    </h2>
                    <button className="bg-violet-600 text-white hover:bg-violet-700 rounded-lg text-lg px-4 py-2 text-center font-bold w-[600px] h-16 m-16 mb-1">
                    <a href="https://www.ea.com/games/apex-legends/play-now-for-free" >
                      DOWNLOAD FOR FREE
                    </a>
                  </button>                                  
                  </div>
                <div className="mt-10 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                  
                </div>
            </div>
        </section>
    </div>
    
  );
};

export default Home;
