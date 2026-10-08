import React from 'react'

import withSlash from './withSlash'

// Replaces gatsby's <Link>; Astro's client router intercepts plain <a> clicks.
// eslint-disable-next-line no-unused-vars
const Link = ({ to, activeClassName, activeStyle, partiallyActive, state, replace, ...rest }) => (
  <a href={withSlash(to)} {...rest} />
)

export default Link
