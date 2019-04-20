import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { find } from 'lodash'
import Image from 'gatsby-image'
import { Transition } from 'react-transition-group'

import {
  getConfig,
  getPadding,
  isScrollable,
  isTablet,
  RATIO_LARGE,
  RATIO_SCROLL
} from '../config.js'
import {
  formatPhotoStyle,
  formatSessionButtonsStyle
} from '../formatters/style'

const SECONDARY_COLOR = '#bcbcbc'

const propTypes = {
  images: PropTypes.array,
  session: PropTypes.string,
  views: PropTypes.array,
}

function getMarginLayoutSimple (isScrollable, paddingHorizontal, ratio) {
  return `${ isScrollable
    ? paddingHorizontal * 3
    : Math.max(
      paddingHorizontal * (1 +
        (2 * (ratio - RATIO_LARGE) /
        (RATIO_SCROLL - RATIO_LARGE))
      ),
      paddingHorizontal
    ) }px`
}

function getMarginLayoutOffsetBig (isScrollable, paddingHorizontal, ratio) {
  return `calc(50vw + ${ isScrollable
    ? paddingHorizontal * 1.5
    : Math.max(
      paddingHorizontal * (1 +
        (2 * (ratio - RATIO_LARGE) /
        (RATIO_SCROLL - RATIO_LARGE))
      ) / 2,
      paddingHorizontal / 2
    ) }px)`
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
  margin-bottom: ${ props => props.paddingVertical * 3 }px;
  ${ props => props.isLast &&
    `margin-bottom: 0;` }
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
    ${ props => props.isScrollable
    ? `
      width: calc(((100vw / ${ RATIO_SCROLL }) -
      ${ props.paddingVertical * 2 }px) * 0.8);`
    : `width: calc((100vh - ${ props.paddingVertical * 2 }px) * 0.8);` }
        
    :first-child {
      margin-right: ${ props => getMarginLayoutSimple(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
    }
  }
`

const LayoutOffsetLeft = styled(LayoutSimple)`
  div${ Photo } {
    :first-child {
      align-self: flex-start;
    }
    
    :last-child {
      margin-top: ${ props => props.isScrollable
    ? `calc(((100vw / ${ RATIO_SCROLL }) -
      ${ props.paddingVertical * 2 }px) * (2 / 3))`
    : `calc((100vh - ${ props.paddingVertical * 2 }px) * (2 / 3))` };
      align-self: flex-end;
    };
  }
`

const LayoutOffsetRight = styled(LayoutSimple)`
  div${ Photo } {  
    :first-child {
      margin-top: ${ props => props.isScrollable
    ? `calc(((100vw / ${ RATIO_SCROLL }) -
      ${ props.paddingVertical * 2 }px) * (2 / 3))`
    : `calc((100vh - ${ props.paddingVertical * 2 }px) * (2 / 3))` };
      align-self: flex-end;
    }
    
    :last-child {
      align-self: flex-start;
    }
  }
`

const LayoutOffsetBigLeftTop = styled(LayoutOffsetLeft)`
  padding: 0;
  justify-content: flex-start;
  height: auto;
  padding: 0 ${ props => props.paddingHorizontal }px 0 0;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    :first-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
      margin-right: ${ props => props.paddingHorizontal }px;
    }
    
    :last-child {
      align-self: flex-end;
      width: calc(
        (100vh - ${ props => props.paddingVertical * 2 }px) * 0.8 -
        ${ props => props.paddingHorizontal }px
      );
      margin-top: 50%;
    }
  }
`

const LayoutOffsetBigLeftTopMiddle = styled(LayoutOffsetLeft)`
  padding: 0;
  justify-content: flex-start;
  height: auto;
  padding: 0 ${ props => props.paddingHorizontal }px 0 0;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    :first-child {
      width: calc(50vw + ${ props => props.paddingHorizontal / 2 }px);
      min-width: calc(50vw + ${ props => props.paddingHorizontal / 2 }px);
      max-width: none;
      margin-right: ${ props => props.paddingHorizontal }px;
    }
    
    :last-child {
      width: calc(
        (100vh - ${ props => props.paddingVertical * 2 }px) * 0.8 -
        ${ props => props.paddingHorizontal }px
      );
      margin-top: 0;
    }
  }
`

const LayoutOffsetBigLeftMiddle = styled(LayoutOffsetLeft)`
  padding: 0;
  justify-content: flex-start;
  height: auto;
  padding: 0 ${ props => props.paddingHorizontal }px 0 0;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    :first-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
      margin-right: ${ props => props.paddingHorizontal }px;
    }
    
    :last-child {
      width: calc(
        (100vh - ${ props => props.paddingVertical * 2 }px) * 0.8 -
        ${ props => props.paddingHorizontal }px
      );
      margin-top: ${ props => props.paddingVertical }px;
      align-self: flex-start;
    }
  }
`
const LayoutOffsetBigRightMiddle = styled(LayoutOffsetRight)`
  padding: 0;
  justify-content: flex-end;
  height: auto;
  padding: 0 0 0 ${ props => props.paddingHorizontal }px;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    :first-child {
      width: calc(
        (100vh - ${ props => props.paddingVertical * 2 }px) * 0.8 -
        ${ props => props.paddingHorizontal }px
      );
      margin-top: 0;
      margin-right: ${ props => props.paddingHorizontal }px;
      align-self: center;
    }
    
    :last-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
    }
  }
`

const LayoutOffsetBigRightTop = styled(LayoutOffsetRight)`
  padding: 0;
  justify-content: flex-end;
  height: auto;
  padding: 0 0 0 ${ props => props.paddingHorizontal }px;

  div${ Photo } {
    :first-child {
      align-self: flex-start;
      width: calc(
        (100vh - ${ props => props.paddingVertical * 2 }px) * 0.8 -
        ${ props => props.paddingHorizontal }px
      );
      margin-right: ${ props => props.paddingHorizontal }px;
      margin-top: 50%;
    }
    
    :last-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
    }
  }
`

const LayoutBig = styled(Layout)`
  padding: 0;
  justify-content: flex-end;
  align-items: flex-end;
  height: auto;
  padding: 0;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
    min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
    max-width: none;
    margin-top: 0;
  }
`

const LayoutBigLeft = styled(LayoutBig)``

const LayoutBigRight = styled(LayoutBig)`
  div${ Photo } {
    margin-left: auto;
  }
`

const LayoutOffsetBigLeftBottom = styled(LayoutOffsetRight)`
  padding: 0;
  justify-content: flex-start;
  height: auto;
  padding: 0 ${ props => props.paddingHorizontal }px 0 0;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    :first-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
      margin-top: 0;
      margin-right: ${ props => props.paddingHorizontal }px;
    }
    
    :last-child {
      align-self: flex-start;
      width: calc(
        (100vh - ${ props => props.paddingVertical * 2 }px) * 0.8 -
        ${ props => props.paddingHorizontal }px
      );
      margin-bottom: 50%;
    }
  }
`

const LayoutOffsetBigRightBottom = styled(LayoutOffsetLeft)`
  padding: 0;
  justify-content: flex-end;
  height: auto;
  padding: 0 0 0 ${ props => props.paddingHorizontal }px;

  div${ Photo } {
    :first-child {
      align-self: flex-start;
      width: calc(
        (100vh - ${ props => props.paddingVertical * 2 }px) * 0.8 -
        ${ props => props.paddingHorizontal }px
      );
      margin-bottom: 50%;
      margin-right: ${ props => props.paddingHorizontal }px;
    }
    
    :last-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
      margin-top: 0;
    }
  }
`

const LayoutSingleBig = styled(Layout)`
  display: flex;
  justify-content: center;
  height: auto;
  padding: 0 ${ props => props.paddingHorizontal }px;

  div${ Photo } {
    height: auto;
    width: ${ props => props.isScrollable
    ? `calc((((100vw / ${ RATIO_SCROLL }) -
    ${ props.paddingVertical * 2 }px) * 1.6) +
    ${ getMarginLayoutSimple(props.isScrollable,
    props.paddingHorizontal, props.ratio) })`
    : `calc(((100vh - ${ props.paddingVertical * 2 }px) * 1.6) +
    ${ getMarginLayoutSimple(props.isScrollable,
    props.paddingHorizontal, props.ratio) })` };
  }
`

const LayoutBigLeftMiddle = styled(LayoutOffsetLeft)`
  padding: 0;
  justify-content: flex-start;
  height: auto;
  padding: 0;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    :first-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
      margin-right: ${ props => getMarginLayoutSimple(props.isScrollable,
    props.paddingHorizontal, props.ratio) }px;
    }
    
    :last-child {
      align-self: flex-end;
      width: ${ props => `calc(100vw - ${
    getMarginLayoutOffsetBig(props.isScrollable,
      props.paddingHorizontal, props.ratio) } - ${
    getMarginLayoutSimple(props.isScrollable,
      props.paddingHorizontal, props.ratio) } )` };
      margin-top: 50%;
      margin-top: 0;
      align-self: center;
    }
  }
`

const LayoutBigRightMiddle = styled(LayoutOffsetRight)`
  padding: 0;
  justify-content: flex-start;
  height: auto;
  padding: 0;
  ${ props => props.isFirst &&
    `margin-top: -${ props.paddingVertical }px;` }
  ${ props => props.isLast &&
    `margin-bottom: -${ props.paddingVertical }px;` }

  div${ Photo } {
    :first-child {
      align-self: flex-end;
      width: ${ props => `calc(100vw - ${
    getMarginLayoutOffsetBig(props.isScrollable,
      props.paddingHorizontal, props.ratio) } - ${
    getMarginLayoutSimple(props.isScrollable,
      props.paddingHorizontal, props.ratio) } )` };
      margin-top: 50%;
      margin-top: 0;
      align-self: center;
      margin-right: ${ props => getMarginLayoutSimple(props.isScrollable,
    props.paddingHorizontal, props.ratio) }px;
    }
    
    :last-child {
      width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      min-width: ${ props => getMarginLayoutOffsetBig(props.isScrollable,
    props.paddingHorizontal, props.ratio) };
      max-width: none;
    }
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
  color: inherit;
  transition: all 0.4s;
  
  &:hover {
    color: ${ SECONDARY_COLOR };
  }
`

function getLayoutComponent (type) {
  switch (type) {
  case 1:
    return LayoutOffsetLeft
  case 2:
    return LayoutOffsetRight
  case 3:
    return LayoutSingleBig
  case 4:
    return LayoutOffsetBigLeftTop
  case 5:
    return LayoutOffsetBigLeftBottom
  case 6:
    return LayoutOffsetBigRightTop
  case 7:
    return LayoutOffsetBigRightBottom
  case 8:
    return LayoutOffsetBigLeftTopMiddle
  case 9:
    return LayoutOffsetBigLeftMiddle
  case 10:
    return LayoutOffsetBigRightMiddle
  case 12:
    return LayoutBigLeft
  case 13:
    return LayoutBigRight
  case 14:
    return LayoutBigLeftMiddle
  case 15:
    return LayoutBigRightMiddle
  default:
  case 0:
    return LayoutSimple
  }
}

function scrollToTop () {
  if (typeof window !== 'object') return

  window.scrollTo(0, 0)
}

class ScrollablePosts extends React.Component {
  componentDidMount () {
    scrollToTop()
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
    const { images } = this.props

    if (!photoName) return

    const filteredPhotos = images.photos
      .map(image => image.photo)

    return find(filteredPhotos, photo =>
      photo.relativePath.includes(photoName) // TODO: Fix this: str.split('\\').pop().split('/').pop();
    ).childImageSharp.fluid
  }

  getSizes (photoName) {
    const { images } = this.props

    if (!photoName) return

    const filteredPhotos = images.photos
      .map(image => image.photo)

    return find(filteredPhotos, photo =>
      photo.relativePath.includes(photoName) // TODO: Fix this: str.split('\\').pop().split('/').pop();
    ).childImageSharp.sizes
  }

  renderByType (type, first, second, index, length) {
    const { activeTransitions, media, session, timeout } = this.props
    const { paddingVertical, paddingHorizontal } = getPadding(media)
    const { ratio } = media

    const LayoutComponent = getLayoutComponent(type)
    const alt = `pretty nice studio - ${ session } session photo`

    return (
      <LayoutComponent
        paddingVertical={paddingVertical}
        paddingHorizontal={paddingHorizontal}
        isFirst={index === 0}
        isLast={index === length - 1}
        isScrollable={isScrollable(media)}
        ratio={ratio}
      >
        {first !== null && (
          <Transition
            in={activeTransitions['sessions']}
            timeout={timeout * (4 / 3)}
          >
            {state => {
              const photoStyle = formatPhotoStyle(state, timeout, true)

              return (
                <Photo style={photoStyle}>
                  <Image
                    alt={alt}
                    sizes={this.getSizes(first)}
                    fluid={this.getFluid(first)}
                  />
                </Photo>
              )
            }}
          </Transition>
        )}
        {second !== null && (
          <Transition
            in={activeTransitions['sessions']}
            timeout={timeout}
          >
            {state => {
              const photoStyle = formatPhotoStyle(state, timeout, false)

              return (
                <Photo style={photoStyle}>
                  <Image
                    alt={alt}
                    sizes={this.getSizes(second)}
                    fluid={this.getFluid(second)}
                  />
                </Photo>
              )
            }}
          </Transition>
        )}
      </LayoutComponent>
    )
  }

  renderVertical (first, second) {
    const { activeTransitions, session, timeout } = this.props

    const alt = `pretty nice studio - ${ session } session photo`

    return (
      <Fragment>
        {first !== null && (
          <Transition
            in={activeTransitions['sessions']}
            timeout={timeout * (4 / 3)}
          >
            {state => {
              const photoStyle = formatPhotoStyle(state, timeout, true)

              return (
                <PhotoSmall style={photoStyle}>
                  <Image
                    alt={alt}
                    sizes={this.getSizes(first)}
                    fluid={this.getFluid(first)}
                  />
                </PhotoSmall>
              )
            }}
          </Transition>
        )}
        {second !== null && (
          <Transition
            in={activeTransitions['sessions']}
            timeout={timeout * (4 / 3)}
          >
            {state => {
              const photoStyle = formatPhotoStyle(state, timeout, true)

              return (
                <PhotoSmall style={photoStyle}>
                  <Image
                    alt={alt}
                    sizes={this.getSizes(second)}
                    fluid={this.getFluid(second)}
                  />
                </PhotoSmall>
              )
            }}
          </Transition>
        )}
      </Fragment>
    )
  }

  render () {
    const {
      activeTransitions,
      media,
      prev,
      next,
      timeout,
      views
    } = this.props
    const config = getConfig(media, '/sessions')
    const { paddingVertical, paddingHorizontal } = getPadding(media)

    const buttonsWrapperStyle = {
      ...config.sessions.buttons.wrapper.getPosition()
    }

    return (
      <Wrapper
        paddingVertical={paddingVertical}
        paddingHorizontal={paddingHorizontal}
        isTablet={isTablet(media)}
      >
        {isTablet(media)
          ? views.map(view => this.renderVertical(view.first, view.second))
          : views.map((view, index) =>
            this.renderByType(view.type, view.first, view.second, index, views.length))
        }
        {isTablet(media) ? (
          <ButtonsWrapperSmall>
            <ButtonWrapper
              style={{ marginRight: '3em' }}
            >
              <Button
                onClick={this.prev}
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
              <Button>
                <StyledLink to='/'>
                  return
                </StyledLink>
              </Button>
            </ButtonWrapper>
            <Transition
              in={activeTransitions['sessions']}
              timeout={timeout}
            >
              {state => {
                const sessionButtonsStyle =
                  formatSessionButtonsStyle(state, timeout)

                return (
                  <ButtonsGroup style={sessionButtonsStyle}>
                    <ButtonWrapper style={{ marginRight: '3em' }}>
                      <Button onClick={this.next}>
                        <StyledLink to={next}>
                          next project
                        </StyledLink>
                      </Button>
                    </ButtonWrapper>
                    <ButtonWrapper>
                      <Button onClick={this.prev}>
                        <StyledLink to={prev}>
                          prev project
                        </StyledLink>
                      </Button>
                    </ButtonWrapper>
                  </ButtonsGroup>
                )
              }}
            </Transition>
          </ButtonsWrapper>
        )}
      </Wrapper>
    )
  }
}

ScrollablePosts.propTypes = propTypes

const mapStateToProps = ({
  transitions: {
    activeTransitions,
    timeout
  }
}) => ({ activeTransitions, timeout })

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
