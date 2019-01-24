export const DECREMENT = 'DECREMENT'
export const GO = 'GO'
export const INCREMENT = 'INCREMENT'

export function decrement() {
  return { type: DECREMENT }
}

export function go(index) {
  return { type: GO, index }
}

export function increment() {
  return { type: INCREMENT }
}
