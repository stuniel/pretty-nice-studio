import { combineReducers } from 'redux'

import color from './color/reducers'
import slide from './slide/reducers'
import path from './path/reducers'
import media from './media/reducers'
import transitions from './transitions/reducers'

// const initialState = { slide: 0, path: '/' }

export default combineReducers({ color, slide, path, media, transitions })
