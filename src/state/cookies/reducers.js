import { SET_COOKIES } from './actions'

function cookies (state = {}, action) {
  switch (action.type) {
  case SET_COOKIES:
    return action.allowed
  default:
    return state
  }
}

export default cookies
