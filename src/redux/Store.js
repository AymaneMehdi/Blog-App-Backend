import { createStore, applyMiddleware, combineReducers } from 'redux'; // Import combineReducers correctly
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";
import postsReducer from './Reducers/Posts_Reducer';
import loginReducer from "./Reducers/Login_Reducer";
import userReducer from "./Reducers/user_Reducer";

const rootReducer = combineReducers({ // Correct the typo in combineReducers
  posts: postsReducer,
  login: loginReducer,
  user: userReducer,
});

const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
); // Use applyMiddleware correctly

export default store;
