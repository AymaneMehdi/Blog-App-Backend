import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from './Types/Posts';

export const fetchPost = () => {
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

export const addPost = (newPostData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });
      if (!response.ok) {
        throw new Error('Failed to add posts');
      }
      const posts = await response.json();
      dispatch({ type: ADD_POST, payload: posts });
    } catch (error) {
      // Handle error
    }
  };
};

export const updatePost = (_id, updatedPostData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPostData),
      });
      if (!response.ok) {
        throw new Error('Failed to update posts');
      }
      const posts = await response.json();
      dispatch({ type: UPDATE_POST, payload: posts });
    } catch (error) {
      // Handle error
    }
  };
};

export const deletePost = (_id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete posts');
      }
      dispatch({ type: DELETE_POST, payload: _id });
    } catch (error) {
      // Handle error
    }
  };
};
