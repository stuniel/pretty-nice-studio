export const CHANGE_BURGER_COLOR = 'CHANGE_BURGER_COLOR'
export const CHANGE_ICONS_COLOR = 'CHANGE_ICONS_COLOR'

export function changeBurgerColor (color) {
  return { type: CHANGE_BURGER_COLOR, color }
}

export function changeIconsColor (color) {
  return { type: CHANGE_ICONS_COLOR, color }
}
