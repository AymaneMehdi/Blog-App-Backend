import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../redux/Posts_API'; // Assuming your action file is named actions.js
const allBlogs = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts); // Assuming posts are stored in the Redux store under the key 'posts'

  useEffect(() => {
    dispatch(fetchPost()); // Dispatch fetchPost action when component mounts
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      {posts.loading && <p>Loading...</p>}
      {posts.error && <p>Error: {posts.error}</p>}
          {posts.map(post => (
            <div key={post._id}>{post.title}
            </div>  
          ))}
    </div>
  );
};

export default allBlogs;
