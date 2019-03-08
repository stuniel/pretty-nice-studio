/* global window:true */
/* eslint no-underscore-dangle: 0 */

import { createStore as createReduxStore } from 'redux'
import rootReducer from './index'

const windowGlobal = typeof window !== 'undefined' && window

const initialState = {
  media: {
    height: windowGlobal ? windowGlobal.innerHeight : null,
    width: windowGlobal ? windowGlobal.innerWidth : null,
    ratio: windowGlobal
      ? windowGlobal.innerWidth / windowGlobal.innerHeight
      : null
  }
}

const devtools =
process.env.NODE_ENV === 'development' && windowGlobal.devToolsExtension
  ? windowGlobal.__REDUX_DEVTOOLS_EXTENSION__ &&
  windowGlobal.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f

export const store = createReduxStore(rootReducer, initialState, devtools)
