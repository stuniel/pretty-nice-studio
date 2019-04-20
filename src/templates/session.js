import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'

import { HTMLContent } from '../components/Content'
import ScrollablePosts from '../components/ScrollablePosts'

export const SessionTemplate = ({
  images,
  info,
  location,
  media,
  prev,
  next,
  session,
  views,
}) => {
  return (
    <ScrollablePosts
      key={location.key}
      info={info}
      images={images}
      media={media}
      session={session}
      views={views}
      prev={prev}
      next={next}
    />
  )
}

SessionTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Session = ({
  data,
  hideLogo,
  location,
  media,
  pageContext,
  showLogo
}) => {
  const { markdownRemark: post, images } = data
  const { prev, next } = pageContext

  return (
    <SessionTemplate
      content={post.html}
      contentComponent={HTMLContent}
      cover={post.frontmatter.cover}
      hideLogo={hideLogo}
      showLogo={showLogo}
      session={post.frontmatter.session}
      views={post.frontmatter.views}
      image={post.frontmatter.image}
      images={images}
      info={post.frontmatter.info}
      prev={prev}
      next={next}
      location={location}
      media={media}
      helmet={
        <Helmet titleTemplate="%s | Session">
          <title>{`${ post.frontmatter.title }`}</title>
          <meta
            name="description"
            content={`${ post.frontmatter.description }`}
          />
        </Helmet>
      }
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
  )
}

Session.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = dispatch => {
  return {
    hideLogo: () => dispatch({ type: 'HIDE_LOGO' }),
    showLogo: () => dispatch({ type: 'SHOW_LOGO' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session)

export const pageQuery = graphql`
  query SessionByID($id: String!, $categoryRegex: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        cover
        info
        session
        views {
          type
          first
          second
          description
        }
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "sessions" }
        relativePath: { regex: $categoryRegex }
      }
    ) {
      photos: edges {
        photo: node {
          childImageSharp {
            fluid(
              quality: 100,
              traceSVG: {
                color: "#f7f7f7"
              }
            ) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
          }
          relativePath
        }
      }
    }
  }
`
