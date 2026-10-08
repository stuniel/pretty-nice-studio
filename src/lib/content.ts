import { getCollection, getEntry, render } from 'astro:content'

// Prev/next order between sessions, kept identical to the old Gatsby site
// (it came from Gatsby's internal node order, not from `position`).
const SESSION_ORDER = [
  'Megan_Davies',
  'Alessandra_Wysocka',
  'Kaela_Speicher',
  'Dominika_Pawlas',
  'Meaghan_Wozniak',
  'Sumanta_Muth',
]

export const slugOf = (session: string) => session.toLowerCase()
export const pathOf = (session: string) => `/sessions/${ slugOf(session) }/`

export async function getSessions () {
  const entries = await getCollection('sessions')
  const bySession = new Map(entries.map(entry => [entry.data.session, entry.data]))
  const ordered = [
    ...SESSION_ORDER.filter(session => bySession.has(session)),
    ...entries.map(entry => entry.data.session).filter(session => !SESSION_ORDER.includes(session)).sort(),
  ]

  return ordered.map((session, i) => ({
    data: bySession.get(session)!,
    prev: pathOf(ordered[(i - 1 + ordered.length) % ordered.length]),
    next: pathOf(ordered[(i + 1) % ordered.length]),
  }))
}

// `allMarkdownRemark.edges` as the home page query returned it (sorted by position).
export async function getHomeEdges () {
  const entries = await getCollection('sessions')

  return entries
    .map(entry => entry.data)
    .sort((a, b) => a.position - b.position)
    .map(data => ({ node: { id: data.session, fields: { slug: pathOf(data.session) }, frontmatter: data } }))
}

export async function getPage (id: string) {
  const entry = await getEntry('pages', id)
  if (!entry) throw new Error(`Missing page content: ${ id }`)
  const { Content } = await render(entry)

  return { entry, Content, html: entry.rendered?.html ?? '' }
}
