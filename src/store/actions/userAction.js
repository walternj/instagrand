import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes'
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyAXolY1cjkiEX9s2rp5-5wrN8lpH4vCBb8'

export const login = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const logout = () => {
  return {
    type: USER_LOGGED_OUT,
  }
}

export const createUser = (user) => {
  return dispatch => {
    axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returSecureToken: true
    })
    .catch(err => console.log(err))
    .then(res => {
      if (res.data.localId) {
        axios.put(`/users/${res.data.localId}.json`, {
          name: user.name
        })
        .catch(err => console.log(err))
        .then(res => {
          console.log('User login succesfull')
        })
      }  
    })
  }
}