import React from 'react'
import  { Provider } from 'react-redux'
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import Navigator from './src/Navigator' 

import storeConfig from './src/store/storeConfig'

import axios from 'axios'
axios.defaults.baseURL = 'https://instagrand-rn.firebaseio.com/'

const store = storeConfig()
const Redux = () => (
  <Provider store={store} >
    <Navigator />
  </Provider>
)

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(Redux);