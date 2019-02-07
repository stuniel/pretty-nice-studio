import { HIDE_LOGO, SHOW_LOGO } from './actions'

const initialState = {
  logoVisible: true
}

function media (state = initialState, action) {
  switch (action.type) {
  case HIDE_LOGO:
    return Object.assign({}, state, {
      logoVisible: false
    })
  case SHOW_LOGO:
    return Object.assign({}, state, {
      logoVisible: true
    })
  default:
    return state
  }
}

export default media
