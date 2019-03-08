import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Transition } from 'react-transition-group'

import { RATIO_MEDIUM, getConfig } from '../../config.js'

import BackgroundImage from '../../components/BackgroundImage'

const SECONDARY_COLOR = '#bcbcbc'

const Section = styled.section`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
`

const ImageWrapper = styled(BackgroundImage)`
  position: absolute;
  width: 50%;
  left: 50%;
`

const ImageCover = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
  background: #fff;
`

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  padding: ${ props => props.paddingHorizontal }px;
  text-align: left;
  align-items: center;
  height: 100%;
  width: ${ props => props.isTablet ? '100%' : '50%' };
  overflow-y: scroll;
`

const Content = styled.div`
  position: relative;
  max-width: 450px;
  
  & > section {
    margin-bottom: 60px;
    
    p {
      margin-bottom: 30px;
    }
    
    h2 {
      margin-bottom: 2em;
      font-size: ${ props => props.isTablet ? 2 : 4 }em;
    }
    
    a {
      display: block;
      font-size: ${ props => props.isTablet ? 1 : 1.2 }em;
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
      transform: 'translateX(100%)',
    },
    exited: {
      transform: 'translateX(0)',
    },
  }

  return {
    transform: 'transitionX(100%)',
    transition: 'all 0.6s ease',
    ...(state === 'entering' && transitionStyles.entered),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exited),
  }
}

class Index extends Component {
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
    const { data, media } = this.props
    const { photoVisible } = this.state
    const { height, ratio } = media
    const config = getConfig(media, '/contact')

    const imageWrapperStyle = {
      height,
    }

    const contentStyle = {
      ...config.contact.content.getPosition()
    }

    return (
      <Section>
        <ContentWrapper
          isTablet={ratio < RATIO_MEDIUM}
          paddingHorizontal={height / 10}
        >
          <Content
            isTablet={ratio < RATIO_MEDIUM}
            style={contentStyle}
          >
            <section>
              <h2>Get in touch</h2>
              <p>
                <a href="mailto:contact@prettynicestudio.com">
                  contact@prettynicestudio.com
                </a>
              </p>
              <p>
                Let's create some pretty nice pictures! Contact us to discuss your project!
              </p>
            </section>
          </Content>
        </ContentWrapper>
        {ratio >= RATIO_MEDIUM && (
          <Fragment>
            <ImageWrapper
              fadeIn
              fluid={data.images.photos[0].photo.childImageSharp.fluid}
              style={imageWrapperStyle}
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
      </Section>
    )
  }
}

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = () => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)

export const pageQuery = graphql`
  query BackgroundImage {
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "sessions" }
        relativePath: { regex: "/Muth/big/1.jpg/" }
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
