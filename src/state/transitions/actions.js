export const HIDE_LOGO = 'HIDE_LOGO'
export const SHOW_LOGO = 'SHOW_LOGO'

export function hideLogo () {
  return { type: HIDE_LOGO }
}

export function showLogo () {
  return { type: SHOW_LOGO }
}
