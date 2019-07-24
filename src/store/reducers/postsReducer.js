import { ADD_POST, ADD_COMMENT } from '../actions/actionTypes'

const initialState = {
  posts: [{
    id: Math.random(),
    nickname: 'Raf P.F',
    email: 'machin@gmail.com',//'rafpf@outlook.com',
    image: require('../../../assets/imgs/fence.jpg'),
    comments: [{
        nickname: 'John Ray Shelton',
        comment: 'Stunnning!'
    }, {
        nickname: 'Ana Julia Arruda',
        comment: 'Foto linda! Onde foi tirada?'
    }]
  }, {
      id: Math.random(),
      nickname: 'Francis Leo',
      email: 'francisleo@getMaxListeners.com',
      image: require('../../../assets/imgs/bw.jpg'),
      comments: []
  }]
}

const reducer = (state= initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat({
          ...action.payload
        })
      }
    case ADD_COMMENT:
    return {
      ...state,
      posts: state.posts.map(post => {
        if (post.id === action.payload.postId) {
          if (post.comments) {
            post.comments = post.comments.concat(
              action.payload.comment
            )
          } else {
            post.comments = [action.payload.comment]
          }
        }
        return post
      })
    }  
    default:
      return state  
  }
}

export default reducer