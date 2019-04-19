import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Transition } from 'react-transition-group'

import { getConfig, getPadding, isTablet } from '../../config.js'

import BackgroundImage from '../../components/BackgroundImage'
import Return from '../../components/Return'

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
  padding: ${ props =>
    `${ props.paddingVertical }px ${ props.paddingHorizontal }px` };
  ${ props => props.isTablet && `padding-top: 0` };
  text-align: left;
  align-items: center;
  height: ${ props => props.isTablet
    ? `calc(100vh - ${ props.paddingVertical * 3 }px)` : '100%' };  top: ${ props => props.isTablet ? props.paddingVertical * 2 : 0 }px;
  width: ${ props => props.isTablet ? '100%' : '50%' };
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { 
    display: none;
  }
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
const formatImageCoverStyle = (state, timeout, transitionMenu, config) => {
  const transitionStyles = {
    entered: {
      transform: 'translateX(100%)',
      transitionDelay: `${ timeout / 2 }ms`,
    },
    exited: {
      transform: 'translateX(0)',
    },
  }

  return {
    transform: 'transitionX(100%)',
    transition: `all ${ timeout * 0.75 }ms ease`,
    ...(state === 'entering' && transitionStyles.entered),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exited),
  }
}

const formatContentStyle = (state, timeout, transitionMenu, config) => {
  const transitionStyles = {
    entered: {
      opacity: 1,
      transition: `all ${ timeout * 0.75 }ms ease-in`,
      transitionDelay: `${ timeout / 2 }ms`,
    },
    exited: {
      transition: `all ${ timeout / 2 }ms ease-out`,
      opacity: 0
    },
  }

  return {
    opacity: 1,
    ...config.contact.content.getPosition(),
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
    const { activeTransitions, data, media, timeout, transitionMenu } = this.props
    const { photoVisible } = this.state
    const { height } = media
    const config = getConfig(media, '/contact')
    const { paddingVertical, paddingHorizontal } = getPadding(media)

    const imageWrapperStyle = {
      height,
    }

    return (
      <Section>
        <Return media={media} />
        <ContentWrapper
          isTablet={isTablet(media)}
          paddingVertical={paddingVertical}
          paddingHorizontal={paddingHorizontal}
        >
          <Transition
            in={activeTransitions['contact']}
            timeout={{
              enter: transitionMenu + timeout / 2,
              exit: timeout
            }}
          >
            {state => {
              const contentStyle = formatContentStyle(state, timeout, transitionMenu, config)

              return (
                <Content
                  isTablet={isTablet(media)}
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
              )
            }}
          </Transition>
        </ContentWrapper>
        {!isTablet(media) && (
          <Fragment>
            <ImageWrapper
              fadeIn
              sizes={data.images.photos[0].photo.childImageSharp.sizes}
              fluid={data.images.photos[0].photo.childImageSharp.fluid}
              style={imageWrapperStyle}
            />
            <Transition
              in={activeTransitions['contact']}
              timeout={{
                enter: transitionMenu + timeout / 2,
                exit: timeout
              }}
            >
              {state => {
                const imageCoverStyle = formatImageCoverStyle(state, timeout, transitionMenu, config)

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

const mapStateToProps = ({
  media,
  transitions: {
    activeTransitions,
    timeout,
    transitionMenu
  }
}) => {
  return { activeTransitions, media, timeout, transitionMenu }
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
        relativePath: { regex: "/Megan_Davies/Phoeby-193.jpg/" }
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
            sizes {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
          relativePath
        }
      }
    }
  }
`
