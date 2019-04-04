export const HIDE_LOGO = 'HIDE_LOGO'
export const SHOW_LOGO = 'SHOW_LOGO'
export const TOGGLE_MENU = 'TOGGLE_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'
export const CHANGE_TIMEOUT = 'CHANGE_TIMEOUT'
export const TOGGLE_TRANSITION = 'TOGGLE_TRANSITION'

export function hideLogo () {
  return { type: HIDE_LOGO }
}

export function showLogo () {
  return { type: SHOW_LOGO }
}

export function toggleMenu () {
  return { type: TOGGLE_MENU }
}

export function closeMenu () {
  return { type: CLOSE_MENU }
}

export function changeTimeout (value) {
  return { type: CHANGE_TIMEOUT, value }
}

export function toggleTransition (key) {
  return { type: TOGGLE_TRANSITION, key }
}
