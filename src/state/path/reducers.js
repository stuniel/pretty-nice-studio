import { CHANGE_PATH } from './actions'

function path(state = [], action) {
  switch (action.type) {
    case CHANGE_PATH:
      return Object.assign({}, state, {
        path: action.path,
      })
    default:
      return state
  }
}

export default path
