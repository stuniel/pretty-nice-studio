import { SET_MEDIA } from './actions'

const initialState = {
  width: null,
  height: null,
  ratio: null
}

function media (state = initialState, action) {
  switch (action.type) {
  case SET_MEDIA:
    return Object.assign({}, state, {
      width: action.width,
      height: action.height,
      ratio: action.ratio
    })
  default:
    return state
  }
}

export default media
