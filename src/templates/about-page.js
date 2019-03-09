import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Transition } from 'react-transition-group'

import { HTMLContent } from '../components/Content'

import { getConfig, getPadding, isTablet } from '../config.js'

import BackgroundImage from '../components/BackgroundImage'

const SECONDARY_COLOR = '#bcbcbc'

const Section = styled.section`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
`

const ImageWrapper = styled(BackgroundImage)`
  position: absolute;
  left: ${ props => props.paddingHorizontal }px;
  width: calc(50% - ${ props => props.paddingHorizontal }px);
  height: 100%;
`

const ImageCover = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background: #fff;
`

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  height: ${ props => props.isTablet
    ? `calc(100vh - ${ props.paddingVertical * 3 }px)` : '100%' };
  width: ${ props => props.isTablet ? '100%' : '50%' };
  left: ${ props => props.isTablet ? 0 : '50%' };
  top: ${ props => props.isTablet ? props.paddingVertical * 2 : 0 }px;
  overflow-y: scroll;
  padding: ${ props =>
    `${ props.paddingVertical }px ${ props.paddingHorizontal }px` };
  ${ props => props.isTablet && `padding-top: 0` };
`

const StyledContent = styled.div`
  position: relative;
  max-width: 450px;
  max-height: 80%;
  
  h2 {
    margin-bottom: ${ props => props.isTablet ? 1 : 2 }em;
    font-size: ${ props => props.isTablet ? 3 : 5 }em;
  }
  
  & > section {
    margin-bottom: 60px;
    
    p {
      margin-bottom: 30px;
    }
    
    h3 {
      margin-bottom: 15px;
    }
    
    a {
      display: block;
      font-weight: 700;
      cursor: pointer;
      color: inherit;
      text-decoration: none;
      transition: all 0.4s;
      
      :hover {
        color: ${ SECONDARY_COLOR };
      }
    }
  }
  
  & > section:last-child {
    margin-bottom: 0;
  }
`
const formatImageCoverStyle = (state, config) => {
  const transitionStyles = {
    entered: {
      transform: 'translateX(-100%)',
    },
    exited: {
      transform: 'translateX(0)',
    },
  }

  return {
    transform: 'transitionX(-100%)',
    transition: 'all 0.6s ease',
    ...(state === 'entering' && transitionStyles.entered),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exited),
  }
}

class AboutPageTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photoVisible: false
    }
  }

  componentDidMount () {
    setTimeout(() => this.setState({ photoVisible: true }), 500)
  }

  componentWillUnmount () {
    this.setState({ photoVisible: false })
  }

  render () {
    const { content, data, media, title } = this.props
    const { photoVisible } = this.state

    const config = getConfig(media, '/contact')
    const { paddingVertical, paddingHorizontal } = getPadding(media)

    const contentStyle = {
      ...config.contact.content.getPosition()
    }

    return (
      <Section>
        {!isTablet(media) && (
          <Fragment>
            <ImageWrapper
              fadeIn
              fluid={data.images.photos[0].photo.childImageSharp.fluid}
              paddingHorizontal={paddingHorizontal}
            />
            <Transition
              in={photoVisible}
              timeout={0}
            >
              {state => {
                const imageCoverStyle = formatImageCoverStyle(state, config)

                return (
                  <ImageCover style={imageCoverStyle} />
                )
              }}
            </Transition>
          </Fragment>
        )}
        <ContentWrapper
          isTablet={isTablet(media)}
          paddingVertical={paddingVertical}
          paddingHorizontal={paddingHorizontal}
        >
          <StyledContent
            isTablet={isTablet(media)}
            style={contentStyle}
          >
            <h2>{title}</h2>
            <section dangerouslySetInnerHTML={{ __html: content }} />
          </StyledContent>
        </ContentWrapper>
      </Section>
    )
  }
}

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "sessions" }
        relativePath: { regex: "/Wozniak/big/1.jpg/" }
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

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

export { AboutPageTemplate }

const AboutPage = ({ data, location, media }) => {
  const { markdownRemark: post } = data

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      data={data}
      content={post.html}
      media={media}
      location={location}
    />
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = () => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage)
