import { DECREMENT, GO, INCREMENT } from './actions'

function slide(state = [], action) {
  switch (action.type) {
    case DECREMENT:
      return Object.assign({}, state, {
        slide: state.slide - 1,
      })
    case GO:
      return Object.assign({}, state, {
        slide: action.index,
      })
    case INCREMENT:
      return Object.assign({}, state, {
        slide: state.slide + 1,
      })
    default:
      return state
  }
}

export default slide
