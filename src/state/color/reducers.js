import { CHANGE_BURGER_COLOR, CHANGE_ICONS_COLOR } from './actions'

function color (state = {}, action) {
  switch (action.type) {
  case CHANGE_BURGER_COLOR:
    return Object.assign({}, state, {
      burger: action.color
    })
  case CHANGE_ICONS_COLOR:
    return Object.assign({}, state, {
      icons: action.color
    })
  default:
    return state
  }
}

export default color
