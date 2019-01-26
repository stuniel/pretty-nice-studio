import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Content, { HTMLContent } from '../components/Content'
import Photos from '../components/Photos'
import Progress from '../components/Progress'

const windowGlobal = typeof window !== 'undefined' && window

const directions = {
  forward: 'forward',
  backward: 'backward',
}

const Section = styled.section`
  position: relative;
  padding: 120px;
  top: 0;
  height: 100%;
  width: 100%;
`

const ProgressWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const PhotosWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const ContentWrapper = styled.div`
  position: relative;
`

export class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      part: 0,
      direction: '',
    }

    this.tarnsitionActive = false
  }

  componentDidMount() {
    window.addEventListener('wheel', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll)
  }

  handleScroll = e => {
    if (this.tarnsitionActive) return

    this.tarnsitionActive = true

    if (e.deltaY > 0) {
      this.next()
    } else if (e.deltaY < 0) {
      this.previous()
    }

    window.setTimeout(() => {
      this.tarnsitionActive = false
    }, 1000)
  }

  next = () => {
    const { views } = this.props
    const { part } = this.state

    if (part > views.length - 2) return

    this.setState(state => ({
      direction: directions.forward,
      part: state.part + 1,
    }))
  }

  previous = () => {
    const { part } = this.state

    if (part === 0) return

    this.setState(state => ({
      direction: directions.backward,
      part: state.part - 1,
    }))
  }

  render() {
    const {
      content,
      contentComponent,
      data,
      description,
      helmet,
      images,
      session,
      tags,
      title,
      views,
    } = this.props
    const { direction, part } = this.state
    const PostContent = contentComponent || Content

    const height = windowGlobal.innerHeight
    const width = windowGlobal.innerWidth

    const contentWrapperStyle = {
      width: width - (height * 0.8 + 300),
      height: height * 0.8,
      left: height * 0.8,
    }
    
    const progressWrapperStyle = {
      bottom: 60
      // top: height * 0.75 - 60,
      // width: width - (height * 0.8 + 300),
      // height: height * 0.25,
      // left: height * 0.8,
    }
    
    const textStyle = {
      position: 'absolute',
      width: '80%',
      left: '10%',
      bottom: 0,
    }

    return (
      <Section>
        {helmet || ''}
        {part === 0 && (
          <ContentWrapper style={contentWrapperStyle}>
            <div style={textStyle}>
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>{description}</p>
            </div>
          </ContentWrapper>
        )}
        <ProgressWrapper style={progressWrapperStyle}>
          <Progress part={part} length={views.length} />
        </ProgressWrapper>
        <PhotosWrapper>
          <Photos
            direction={direction}
            part={part}
            session={session}
            views={views}
            images={images}
          />
        </PhotosWrapper>
        {/* <PostContent content={content} /> */}
        {/* {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <h4>Tags</h4>
              <ul className="taglist">
                {tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null} */}
      </Section>
    )
  }
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post, images } = data

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      cover={post.frontmatter.cover}
      session={post.frontmatter.session}
      views={post.frontmatter.views}
      image={post.frontmatter.image}
      images={images}
      description={post.frontmatter.description}
      helmet={
        <Helmet titleTemplate="%s | Blog">
          <title>{`${post.frontmatter.title}`}</title>
          <meta
            name="description"
            content={`${post.frontmatter.description}`}
          />
        </Helmet>
      }
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $categoryRegex: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        cover
        session
        views {
          type
          first
          second
        }
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
    #   images: allS3Image(filter: {
    #     Key: {
    #       regex: $categoryRegex
    #     }
    #   }
    # ) {
    #     photos: edges {
    #       photo: node {
    #         Key
    #         Url
    #       }
    #     }
    #   }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "sessions" }
        relativePath: { regex: $categoryRegex }
      }
    ) {
      photos: edges {
        photo: node {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
          relativePath
        }
      }
    }
  }
`
