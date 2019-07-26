import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import postsReducer from './reducers/postsReducer'
import messageReducer from './reducers/messageReducer'

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  message: messageReducer
})

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
