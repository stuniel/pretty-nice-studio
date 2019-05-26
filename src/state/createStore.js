/* global window:true */
/* eslint no-underscore-dangle: 0 */

import { createStore as createReduxStore } from 'redux'
import rootReducer from './index'

const windowGlobal = typeof window !== 'undefined' && window

const initialState = {
  cookies: false,
  color: {
    burger: null,
    icons: null
  },
  media: {
    height: windowGlobal ? windowGlobal.innerHeight : null,
    width: windowGlobal ? windowGlobal.innerWidth : null,
    ratio: windowGlobal
      ? windowGlobal.innerWidth / windowGlobal.innerHeight
      : null
  },
  transitions: {
    logoVisible: true,
    menuOpen: false,
    timeout: 1000,
    transitionMenu: 750,
    activeTransitions: {
      'home': false,
      'sessions': false,
      'about': false,
      'contact': false,
    }
  }
}

const devtools =
process.env.NODE_ENV === 'development' && windowGlobal.devToolsExtension
  ? windowGlobal.__REDUX_DEVTOOLS_EXTENSION__ &&
  windowGlobal.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f

export const createStore = () =>
  createReduxStore(rootReducer, initialState, devtools)
