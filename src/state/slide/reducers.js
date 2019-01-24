import { DECREMENT, GO, INCREMENT } from './actions'

function slide(state = 0, action) {
  switch (action.type) {
    case DECREMENT:
      return state - 1
    case GO:
      return action.index
    case INCREMENT:
      return state + 1
    default:
      return state
  }
}

export default slide
