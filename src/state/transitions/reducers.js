import {
  HIDE_LOGO,
  SHOW_LOGO,
  TOGGLE_MENU,
  CLOSE_MENU,
  CHANGE_TIMEOUT,
  TOGGLE_TRANSITION
} from './actions'

function toggleTransition (state, action) {
  const { key } = action
  const { activeTransitions } = state

  const transition = activeTransitions[key]

  return {
    ...state,
    activeTransitions: {
      ...activeTransitions,
      [key]: !transition
    }
  }
}

function media (state = {}, action) {
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
  case CHANGE_TIMEOUT:
    return Object.assign({}, state, {
      timeout: action.value
    })
  case TOGGLE_TRANSITION:
    return toggleTransition(state, action)
  default:
    return state
  }
}

export default media
