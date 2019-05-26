export const SET_COOKIES = 'SET_COOKIES'

export function setCookies (allowed) {
  return { type: SET_COOKIES, allowed }
}
