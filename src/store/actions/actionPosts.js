import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED } from './actionTypes'
import { setMessage } from './actionMessage'
import axios from 'axios'

export const addPost = post => {
  return (dispatch, getState) => {
    dispatch(creatingPost())
    axios({
      url: 'uploadImage',
      baseURL: 'https://us-central1-instagrand-rn.cloudfunctions.net',
      method: 'post',
      data: {
        image: post.image.base64
      }
    })
    .catch(err => {
      dispatch(setMessage({
        title: 'Erreur',
        text: err
      }))
    })
    .then(resp => {
      console.log('resp erreur:', resp)
      post.image = resp.data.imageUrl
      axios.post(`/posts.json?auth=${getState().user.token}`,{ ...post })
        .catch(err => {
          dispatch(setMessage({
            title: 'Erreur',
            text: err
          }))
        })
        .then(res => {
          dispatch(fetchPosts())
          dispatch(postCreated())
        })
    })
  }
 /*  return {
    type: ADD_POST,
    payload: post
  } */
}

export const addComment = payload => {
  return (dispatch, getState) => {
    axios.get(`/posts/${payload.postId}.json`) 
      .catch(err => {
        dispatch(setMessage({
          title: 'Erreur',
          text: err
        }))
      })
      .then(res => {
        const comments = res.data.comments || []
        comments.push(payload.comment)
        axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
          .catch(err => {
            dispatch(setMessage({
              title: 'Erreur',
              text: err
            }))
          })
          .then(res => {
            dispatch(fetchPosts())
          })
      })
  }
 /*  return {
    type: ADD_COMMENT,
    payload
  } */
}

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export const fetchPosts = () => {
  return dispatch => {
    axios.get('/posts.json')
    .catch(err => {
      dispatch(setMessage({
        title: 'Erreur',
        text: err
      }))
    })
    .then(res => {
      const rawPosts = res.data
      const posts = []
      for (let key in rawPosts) {
        posts.push({
          ...rawPosts[key],
          id: key
        })
      }
      dispatch(setPosts(posts.reverse()))
    })
  }
}

export const creatingPost = () => {
  return {
    type: CREATING_POST
  }
}

export const postCreated = () => {
  return {
    type: POST_CREATED
  }
}