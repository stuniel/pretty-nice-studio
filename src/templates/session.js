import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'

import { HTMLContent } from '../components/Content'
import Photos from '../components/Photos'
import Progress from '../components/Progress'
import ProgressNumbers from '../components/ProgressNumbers'
import ScrollIcon from '../components/ScrollIcon'
import ScrollablePosts from '../components/ScrollablePosts'

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
  align-items: center;
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

const ScrollWrapper = styled.div`
  position: absolute;
  width: 120px;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledScrollIcon = styled(ScrollIcon)`
  ${'' /* position: absolute;
  margin: 0 auto; */}
`

export class SessionTemplate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      part: 0,
      direction: '',
    }

    this.tarnsitionActive = false
  }

  componentDidMount () {
    this.props.showLogo()
    window.addEventListener('wheel', this.handleScroll)
  }

  componentWillUnmount () {
    this.props.showLogo()
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
    }, 2000)
  }

  next = () => {
    const { hideLogo, views } = this.props
    const { part } = this.state

    if (part > views.length - 2) return

    if (part === 0) hideLogo()

    this.setState(state => ({
      direction: directions.forward,
      part: state.part + 1,
    }))
  }

  previous = () => {
    const { showLogo } = this.props
    const { part } = this.state

    if (part === 0) return

    if (part === 1) showLogo()

    this.setState(state => ({
      direction: directions.backward,
      part: state.part - 1,
    }))
  }

  render () {
    const {
      helmet,
      images,
      location,
      media,
      session,
      views,
    } = this.props
    const { direction, part } = this.state
    const { height, ratio } = media

    const progressWrapperStyle = {
      top: 0,
      height,
    }

    return ratio < 1 ? (
      <ScrollablePosts
        images={images}
        media={media}
        session={session}
        views={views}
      />
    ) : (
      <Section>
        {helmet || ''}
        <ScrollWrapper>
          <StyledScrollIcon size={30} color="#000" />
        </ScrollWrapper>
        <ProgressWrapper style={progressWrapperStyle}>
          <ProgressNumbers
            part={part}
            length={views.length}
            direction={direction}
            media={media}
            onNumberClick={() => { console.log(part) }}
            pathname={location.pathname}
          />
        </ProgressWrapper>
        <PhotosWrapper>
          <Photos
            direction={direction}
            part={part}
            media={media}
            session={session}
            views={views}
            images={images}
          />
        </PhotosWrapper>
      </Section>
    )
  }
}

SessionTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Session = ({ data, hideLogo, location, media, showLogo }) => {
  const { markdownRemark: post, images } = data

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
      location={location}
      media={media}
      description={post.frontmatter.description}
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
