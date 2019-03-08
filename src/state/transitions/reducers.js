import { HIDE_LOGO, SHOW_LOGO, TOGGLE_MENU, CLOSE_MENU } from './actions'

const initialState = {
  logoVisible: true,
  menuOpen: false,
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
  case TOGGLE_MENU:
    return Object.assign({}, state, {
      menuOpen: !state.menuOpen
    })
  case CLOSE_MENU:
    return Object.assign({}, state, {
      menuOpen: false
    })
  default:
    return state
  }
}

export default media
