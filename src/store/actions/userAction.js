import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from './actionTypes'
import axios from 'axios'
import { resolveUri } from 'expo-asset/build/AssetSources';

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyAXolY1cjkiEX9s2rp5-5wrN8lpH4vCBb8'

export const userLogged = user => {
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
    dispatch(loadingUser())
    axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returSecureToken: true
    })
    .catch(err => {
      dispatch(setMessage({
        title: 'Erreur',
        text: err
      }))
    })
    .then(res => {
      if (res.data.localId) {
        axios.put(`/users/${res.data.localId}.json`, {
          name: user.name
        })
        .catch(err => {
          dispatch(setMessage({
            title: 'Erreur',
            text: err
          }))
        })
        .then(() => {
          dispatch(login(user)) 
        })
      }  
    })
  }
}

export const loadingUser = () => {
  return {
    type: LOADING_USER
  }
}

export const userLoaded = () => {
  return {
    type: USER_LOADED
  }
}

export const login = user => {
  return dispatch => {
    dispatch(loadingUser())
    axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returSecureToken: true
    })
    .catch(err => {
      dispatch(setMessage({
        title: 'Erreur',
        text: err
      }))
    })
    .then(res => {
      if (res.data.localId) {
        user.token = res.data.idToken
        axios.get(`/users/${res.data.localId}.json`)
        .catch(err => {
          dispatch(setMessage({
            title: 'Erreur',
            text: err
          }))
        })
        .then(res => {
          delete user.password
          user.name = res.data.name
          dispatch(userLogged(user))
          dispatch(userLoaded())
        })  
      }
    })
  }
}