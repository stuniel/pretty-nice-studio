export const SET_MEDIA = 'SET_MEDIA'

export function setMedia ({ width, height, ratio }) {
  return { type: SET_MEDIA, width, height, ratio }
}
