import { navigate as astroNavigate } from 'astro:transitions/client'

import withSlash from './withSlash'

export default function navigate (to) {
  return astroNavigate(withSlash(to))
}
