// Pages are served with a trailing slash; linking without one costs a redirect
// and makes the client router fall back to a full page load.
export default function withSlash (to) {
  if (!to.startsWith('/') || to.endsWith('/') || to.includes('.') || to.includes('#') || to.includes('?')) return to
  return `${ to }/`
}
