import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { find } from 'lodash'
import Image from 'gatsby-image'
import { Transition } from 'react-transition-group'

import { getConfig, getPadding, isTablet } from '../config.js'

const SECONDARY_COLOR = '#bcbcbc'

const propTypes = {
  images: PropTypes.array,
  session: PropTypes.string,
  views: PropTypes.array,
}

const Photo = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const PhotoSmall = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2em;
`

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  
  :not(:first-child) {
    margin-top: ${ props => props.paddingVertical }px;
  }
`

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 100vw;
  padding: ${ props => props.isTablet
    ? `${ props.paddingVertical * 2 }px ${ props.paddingHorizontal / 2 }px
      0 ${ props.paddingHorizontal / 2 }px`
    : `${ props.paddingVertical }px 0 0 0`
};
  scrollbar-width: none;
  
  &:after {
    content: "";
    display: block;
    height: ${ props => props.paddingVertical }px;
    width: 100%;
  }

  &::-webkit-scrollbar { 
    display: none;
  }
`

const LayoutSimple = styled(Layout)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: auto;
  padding: 0 ${ props => props.paddingHorizontal }px;

  div${ Photo } {
    height: auto;
    width: calc((100vh - ${ props => props.paddingVertical * 2 }px) * 0.8);
        
    :first-child {
      margin-right: ${ props => props.paddingHorizontal }px;
    }
  }
`

const LayoutOffset = styled(LayoutSimple)`
  div${ Photo } {
    width: calc((100vh - ${ props => props.paddingVertical * 2 }px) * 0.8);
        
    :first-child {
      align-self: flex-start;
    }
    
    :last-child {
      margin-top: 35%;
      align-self: flex-end;
    }
  }
`

const LayoutOffsetBig = styled(LayoutOffset)`
  padding: 0;
  justify-content: flex-start;
  height: auto;

  div${ Photo } {
    :first-child {
      width: calc(50vw - ${ props => props.paddingHorizontal / 2 }px);
      min-width: calc(50vw - ${ props => props.paddingHorizontal / 2 }px);
      max-width: none;
    }
    
    :last-child {
      align-self: flex-end;
    }
  }
`

const LayoutSingleBig = styled(Layout)`
  display: flex;
  justify-content: center;
  height: auto;
  
  div${ Photo } {
    height: auto;
    width: calc(
      (100vh - ${ props => props.paddingVertical * 2 }px)
      * 1.6 + ${ props => props.paddingHorizontal }px
    );
  }
`

const ButtonsWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`

const ButtonsWrapperSmall = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  white-space: pre-line;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  white-space: nowrap;
`

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
`

const Button = styled.div`
  text-transform: uppercase;
`

const StyledLink = styled(Link)`
  font-family: Amiko, sans-serif;
  font-size: 0.7em;
  letter-spacing: 0.6em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  cursor: pointer;
  color: #000;
  transition: all 0.4s;
  
  &:hover {
    color: ${ SECONDARY_COLOR };
  }
`

function getLayoutComponent (type) {
  switch (type) {
  case 0:
    return LayoutOffset
  case 2:
    return LayoutSingleBig
  case 4:
    return LayoutOffsetBig
  default:
  case 1:
    return LayoutSimple
  }
}

function scrollToTop () {
  if (typeof window !== 'object') return

  window.scrollTo(0, 0)
}

const formatPhotoStyle = (state, left) => {
  const transitionStyles = {
    entered: {
      transform: 'translateX(0)',
    },
    exited: {
      transform: `translateX(${ left ? '-' : '' }150%)`,
    },
  }

  return {
    transform: 'transitionX(0)',
    transition: 'all 0.6s ease',
    ...(state === 'entering' && transitionStyles.entered),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exited),
  }
}

class ScrollablePosts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount () {
    scrollToTop()
    setTimeout(() => this.setState({ mounted: true }))
  }

  prev = () => {
    const { decrement } = this.props

    decrement()
  }

  next = () => {
    const { increment } = this.props

    increment()
  }

  getFluid (photoName) {
    const { images, media } = this.props
    const { height } = media

    if (!photoName) return

    const filteredPhotos = images.photos
      .map(image => image.photo)
      .filter(photo =>
        photo.relativePath.includes(height < 768 ? 'small' : 'big'))

    return find(filteredPhotos, photo =>
      photo.relativePath.includes(photoName)
    ).childImageSharp.fluid
  }

  renderByType (type, first, second) {
    const { media, session } = this.props
    const { mounted } = this.state
    const { paddingVertical, paddingHorizontal } = getPadding(media)

    const LayoutComponent = getLayoutComponent(type)
    const alt = `pretty nice studio - ${ session } session photo`

    return (
      <LayoutComponent
        paddingVertical={paddingVertical}
        paddingHorizontal={paddingHorizontal}
      >
        {first !== null && (
          <Transition
            in={mounted}
            timeout={0}
          >
            {state => {
              const photoStyle = formatPhotoStyle(state, true)

              return (
                <Photo style={photoStyle}>
                  <Image alt={alt} fluid={this.getFluid(first)} />
                </Photo>
              )
            }}
          </Transition>
        )}
        {second !== null && (
          <Transition
            in={mounted}
            timeout={0}
          >
            {state => {
              const photoStyle = formatPhotoStyle(state, false)

              return (
                <Photo style={photoStyle}>
                  <Image alt={alt} fluid={this.getFluid(second)} />
                </Photo>
              )
            }}
          </Transition>
        )}
      </LayoutComponent>
    )
  }

  renderVertical (first, second) {
    const { session } = this.props

    const alt = `pretty nice studio - ${ session } session photo`

    return (
      <Fragment>
        {first !== null && (
          <PhotoSmall>
            <Image alt={alt} fluid={this.getFluid(first)} />
          </PhotoSmall>
        )}
        {second !== null && (
          <PhotoSmall>
            <Image alt={alt} fluid={this.getFluid(second)} />
          </PhotoSmall>
        )}
      </Fragment>
    )
  }

  render () {
    const {
      media,
      prev,
      next,
      views
    } = this.props
    const config = getConfig(media, '/sessions')
    const { paddingVertical, paddingHorizontal } = getPadding(media)

    const buttonsWrapperStyle = {
      ...config.sessions.buttons.wrapper.getPosition()
    }

    const buttonStyle = {}

    return (
      <Wrapper
        paddingVertical={paddingVertical}
        paddingHorizontal={paddingHorizontal}
        isTablet={isTablet(media)}
      >
        {isTablet(media)
          ? views.map(view => this.renderVertical(view.first, view.second))
          : views.map(view =>
            this.renderByType(view.type, view.first, view.second))
        }
        {isTablet(media) ? (
          <ButtonsWrapperSmall>
            <ButtonWrapper
              style={{ marginRight: '3em' }}
            >
              <Button
                onClick={this.prev}
                style={buttonStyle}
                paddingHorizontal={paddingHorizontal}
              >
                <StyledLink to={prev}>
                  prev
                </StyledLink>
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button
                onClick={this.next}
                style={buttonStyle}
                paddingHorizontal={paddingHorizontal}
              >
                <StyledLink to={next}>
                  next
                </StyledLink>
              </Button>
            </ButtonWrapper>
          </ButtonsWrapperSmall>
        ) : (
          <ButtonsWrapper style={buttonsWrapperStyle}>
            <ButtonWrapper>
              <Button style={buttonStyle}>
                <StyledLink to='/'>
                  return
                </StyledLink>
              </Button>
            </ButtonWrapper>
            <ButtonsGroup>
              <ButtonWrapper style={{ marginRight: '3em' }}>
                <Button onClick={this.prev} style={buttonStyle}>
                  <StyledLink to={prev}>
                    prev project
                  </StyledLink>
                </Button>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button onClick={this.next} style={buttonStyle}>
                  <StyledLink to={next}>
                    next project
                  </StyledLink>
                </Button>
              </ButtonWrapper>
            </ButtonsGroup>
          </ButtonsWrapper>
        )}
      </Wrapper>
    )
  }
}

ScrollablePosts.propTypes = propTypes

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => {
  return {
    decrement: () => dispatch({ type: 'DECREMENT' }),
    increment: () => dispatch({ type: 'INCREMENT' }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollablePosts)
