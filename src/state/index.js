import { combineReducers, createStore } from 'redux'

import slide from './slide/reducers'
import path from './path/reducers'
import media from './media/reducers'

const initialState = { slide: 0, path: '/' }

export const store = createStore(
  combineReducers(
    {
      slide,
      path,
      media,
    },
    initialState,
    typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
