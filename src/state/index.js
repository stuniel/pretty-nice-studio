import { createStore } from 'redux'
import { combineReducers } from 'redux'

import slide from './slide/reducers'
import path from './path/reducers'

const initialState = { slide: 0, path: '/' }

export const store = createStore(
  combineReducers({
    slide,
    path,
  }),
  initialState
)
