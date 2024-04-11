import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../Types/Posts';
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (Posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: Posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const addPost = (Post) => ({
  type: ADD_POST,
  payload: Post,
});

export const updatePost = (_id, updatedPostData) => ({
  type: UPDATE_POST,
  payload: { _id, updatedPostData },
});

export const deletePost = (_id) => ({
  type: DELETE_POST,
  payload: _id,
});