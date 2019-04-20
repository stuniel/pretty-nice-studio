const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

function getIndexInRange (index, length) {
  return index >= 0
    ? index % length
    : (length - (Math.abs(index) % length)) % length
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              session
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    const sessions = posts.filter(edge =>
      edge.node.fields.slug.includes('/sessions/')
    )

    posts.forEach((edge, index) => {
      const sessionIndex = _.indexOf(sessions, edge)
      const session = edge.node.frontmatter.session
      const categoryRegex = `/${ session }/`
      const id = edge.node.id
      const prev = sessions[getIndexInRange(sessionIndex - 1, sessions.length)].node.fields.slug
      const next = sessions[getIndexInRange(sessionIndex + 1, sessions.length)].node.fields.slug

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${ String(edge.node.frontmatter.templateKey) }.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          categoryRegex,
          prev,
          next,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${ _.kebabCase(tag) }/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreatePage = ({ page, actions, getNodes }) => {
  const { createPage, deletePage } = actions

  if (page.path !== '/') return

  deletePage(page)

  const nodes = getNodes()
    .filter(node =>
      node.absolutePath && node.absolutePath.includes('/pages/sessions/'))

  const covers = nodes
    .map(node => {
      const document = fs.readFileSync(node.absolutePath, 'utf8')
      const regex = /(cover:)\s(.*?)\n/
      const cover = document.match(regex)

      if (!cover || !cover.length) return

      return cover[2]
    })
    .join('|')

  const categoryRegex = `/${ covers }/`

  return createPage({
    ...page,
    context: {
      categoryRegex
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// styled-components

try {
  require.resolve(`babel-plugin-styled-components`)
} catch (e) {
  throw new Error(
    `'babel-plugin-styled-components' is not installed which is needed by plugin 'gatsby-plugin-styled-components'`
  )
}

exports.onCreateBabelConfig = ({ stage, actions }, pluginOptions) => {
  const ssr = stage === `build-html` || stage === `build-javascript`

  actions.setBabelPlugin({
    name: `babel-plugin-styled-components`,
    stage,
    options: { ...pluginOptions, ssr },
  })
}
