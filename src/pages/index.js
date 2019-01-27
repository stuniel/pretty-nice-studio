import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { navigate, graphql } from 'gatsby'
import styled from 'styled-components'
import {
  Transition,
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'
import {
  drop,
  indexOf,
  throttle
} from 'lodash'

import { getAssetPath } from '../utils/paths'
import { config } from '../config.js'
import Icons from '../components/Icons'
import Slider from '../components/slider/slider'

import '../components/all.sass'

const SECONDARY_COLOR = '#bcbcbc'

const directions = {
  forward: 'forward',
  backward: 'backward',
}

function createChildFactory (child, props) {
  return React.cloneElement(child, props)
}

function formatNumber (number) {
  if (number < 10) return `0${ number }`
  return number
}

function formatKey (index) {
  const min = 97
  const max = 122
  const length = max - min

  const times = Math.floor(Math.abs(index) / length) + 1
  const position = Math.abs(index) % length
  const prefix = index < 0 ? String.fromCharCode(max) : String.fromCharCode(min)

  return prefix.repeat(times) + String.fromCharCode(min + position)
}

function getIndexInRange (index, length) {
  return index >= 0
    ? index % length
    : (length - (Math.abs(index) % length)) % length
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const SlidePrimary = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  transition: all 0.3s ease-out;
  opacity: 1;

  ${ '' /* &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s ease-out;
  }

  &::after {
    content: 'see more';
    color: #fff;
    position: absolute;
    padding: 16px 32px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #fff;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  &:hover {
    opacity: 0.5;

    &::before {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &::after {
      opacity: 1;
    }
  } */}
`

const SlideSecondary = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
  background-position: center;
  background-size: cover;
  transition: all 0.3s ease-out;
`

const SliderMask = styled.div`
  position: absolute;
  background: #fff;
`

const Numbers = styled.div`
  position: absolute;
  font-family: Amiko, serif;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Pagination = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style: none;
  bottom: 0;
  width: 100%;
`

const NumberSecondary = styled.li`
  position: relative;
  cursor: pointer;
  font-size: 16px;
  line-height: 16px;
  padding: 8px 0;
  color: #000;
  transition: all 0.4s;

  &:hover {
    color: ${ SECONDARY_COLOR };
  }
`

const NumberPrimary = styled.p`
  position: relative;
  font-size: 32px;
  line-height: 32px;
  padding: 44px 0;
`

const PostNumber = styled.div`
  position: absolute;
  font-size: 180px;
  line-height: 180px;
  color: ${ SECONDARY_COLOR };
  opacity: 0.5;
`

const Line = styled.div`
  height: 120px;
  width: 1px;
  margin-top: 36px;
  border-left: 1px solid black;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const Arrows = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 120px;
  bottom: 48px;
`

const Arrow = styled.span`
  font-family: Amiri, sans-serif;
  font-size: 32px;
  margin: 16px;
  cursor: pointer;
  transition: color 0.4s;

  &:hover {
    color: ${ SECONDARY_COLOR };
  }
`

const Text = styled.div`
  position: relative;
`

const Footer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
`

function getPosition (event, lastPosition) {
  if ('touches' in event) {
    if (!event.touches) return lastPosition

    const { pageX } = event.touches[0]
    return pageX
  }

  const { screenX } = event
  return screenX
}

class IndexPage extends React.PureComponent {
  constructor (props) {
    super()
    this.state = {
      direction: '',
      show: false,
      touchActive: false,
      touchX: 0,
    }
  }

  handleNumberClick = index => {
    const { go } = this.props

    go(index)
    this.setState({ direction: directions.forward })
  }

  handleSwipe = touchX => {
    this.setState({ touchX })
  }
  
  handleSwipeRight = () => {
    this.setState({ touchX: 0 })
    
    this.next()
  }
  
  handleSwipeLeft = () => {
    this.setState({ touchX: 0 })
    
    this.prev()
  }
  
  handleTouchStart = event => {
    const pageX = getPosition(event)
    this.touchStartPosition = pageX

    this.setState({ touchActive: true })
    console.log(event)
  }

  handleTouchMove = throttle(event => {
    if (!this.state.touchActive) return
    const { touchX: lastTouchX } = this.state
    
    
    const pageX = getPosition(event, lastTouchX)
    
    const touchX = pageX - this.touchStartPosition
    
    if (Math.abs(lastTouchX - touchX) > 50 ) {
      this.setState({ touchX }, () => {
        this.handleTouchEnd()
      })
      
      return
    }
    
    this.setState({ touchX })
  }, 16)

  handleTouchEnd = () => {
    const { onSwipeRight, onSwipeLeft } = this.props
    const { touchX } = this.state

    if (touchX > 0) {
      this.next()
    }

    if (touchX < 0) {
      this.prev()
    }

    this.touchStartPosition = 0
    this.setState({ touchActive: false, touchX: 0 })
  }

  orderPosts = (posts, currentPost) => {
    const newPosts = posts.slice().reverse()

    const index = indexOf(newPosts, currentPost)
    const p1 = newPosts.slice(0, index)
    const p2 = newPosts.slice(index)
    const orderedPosts = drop(p2).concat(p1)

    return orderedPosts
  }

  next = () => {
    const { increment } = this.props

    increment()
    this.setState({ direction: directions.forward })
  }

  prev = () => {
    const { decrement } = this.props

    decrement()
    this.setState({ direction: directions.backward })
  }

  formatSliderPrimaryStyle = state => {
    const { media } = this.props
    const { index: { sliders } } = config
    const { height } = media

    const transitionStyles = {
      entering: {
        top: 240,
        left: 120,
        width: ((height - 360) * 0.8),
        height: height - 360,
      },
    }

    return {
      position: 'absolute',
      transition: 'all 0.6s',
      ...sliders.primary(media),
      ...(state === 'entering' && transitionStyles.entering),
      ...(state === 'entered' && transitionStyles.entering),
    }
  }

  formatSliderSecondaryStyle = state => {
    const { media } = this.props
    const { index: { sliders } } = config

    const transitionStyles = {
      entering: {
        opacity: 0,
      },
    }

    return {
      position: 'absolute',
      transition: 'all 0.6s',
      ...sliders.secondary(media),
      ...(state === 'entering' && transitionStyles.entering),
      ...(state === 'entered' && transitionStyles.entering),
    }
  }

  getSliderPrimaryDelay = () => {
    const { media: { ratio } } = this.props
    const { direction } = this.state

    if (ratio < 1) return 0

    return direction === directions.backward ? 300 : 0
  }

  getSliderSecondaryDelay = () => {
    const { media: { ratio } } = this.props
    const { direction } = this.state

    if (ratio < 1) return 0

    return direction === directions.backward ? 0 : 300
  }

  handleSlideClick = post => {
    this.setState({ show: true })
    navigate(post.fields.slug)
  }

  render () {
    const { slide, data, location, media } = this.props
    const { direction, show, touchActive, touchX } = this.state
    const { edges } = data.allMarkdownRemark
    const { height, width, ratio } = media

    const posts = edges.slice().reverse()

    const currentSlideIndex = getIndexInRange(slide, posts.length)

    const currentPostIndex = getIndexInRange(slide, edges.length)
    const currentPost = edges[currentPostIndex]

    const key = formatKey(slide)

    const orderedPosts = this.orderPosts(edges, currentPost)

    const numbersStyle = {
      width: 120,
      height: height,
      left: 0,
    }

    const contentStyle = {
      // background: 'red',
      ...config.index.content.getPosition(media)
    }

    const arrowsStyle = {
      left: width - 180,
      top: height - 120,
    }

    const postNumberStyle = {
      position: 'absolute',
      width: height * 0.6,
      left: 90,
      top: height * (55 / 100),
    }

    const textStyle = {
      width: '80%',
      left: '10%',
      top: height * (60 / 100),
    }

    const sliderMaskStyle = {
      transition: 'all 0.6s',
      ...config.index.sliders.mask.getPosition(media),
    }

    const footerStyle = {
      ...config.index.footer.getPosition(media)
    }

    return (
      <Container>
        {/* {ratio} */}
        <div
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <Transition in={show} key={location.pathname} timeout={600}>
            {state => (
              <Slider
                animationTime={600}
                delay={this.getSliderPrimaryDelay()}
                direction={direction}
                offset={posts.length - 1}
                onSwipe={this.handleSwipe}
                swipeX={touchX}
                touchActive={touchActive}
                rightInfinite={ratio < 1}
                width={
                  state === 'entering' || state === 'entered'
                    ? (height - 360) * 0.8
                    : config.index.sliders.primary(media).width
                }
                style={this.formatSliderPrimaryStyle(state)}
                value={currentSlideIndex}
              >
                {posts.map(({ node: post }, index) => (
                  <SlidePrimary
                    className="content"
                    key={post.frontmatter.session}
                    onClick={() => this.handleSlideClick(post)}
                    role="link"
                    style={{
                      backgroundImage: `url(${ getAssetPath(
                        post.frontmatter.session,
                        post.frontmatter.cover
                      ) })`,
                    }}
                  />
                ))}
              </Slider>
            )}
          </Transition>
          {ratio < 1 && (
            <SliderMask style={{ ...sliderMaskStyle, left: 0 }} />
          )}
          {ratio < 1 ? (
            <SliderMask style={sliderMaskStyle} />
          ) : (
            <Transition in={show} key={location.pathname} timeout={600}>
              {state => (
                <Slider
                  animationTime={600}
                  delay={this.getSliderSecondaryDelay()}
                  direction={direction}
                  offset={0}
                  swipeX={touchX}
                  style={this.formatSliderSecondaryStyle(state)}
                  value={currentSlideIndex}
                  width={
                    ratio > 1.5
                      ? (height - 120) * 0.8
                      : ratio < 1
                        ? width - 60
                        : height * 0.8
                  }
                >
                  {posts.map(({ node: post }, index) => (
                    <SlideSecondary
                      key={post.frontmatter.session}
                      onClick={this.prev}
                      style={{
                        backgroundImage: `url(${ getAssetPath(
                          post.frontmatter.session,
                          post.frontmatter.cover
                        ) })`,
                      }}
                    />
                  ))}
                </Slider>
              )}
            </Transition>
          )}
        </div>
        {ratio >= 1 && (
          <Numbers style={numbersStyle}>
            <Pagination>
              {orderedPosts.map(post => (
                <NumberSecondary
                  onClick={() => this.handleNumberClick(indexOf(edges, post))}
                >
                  <TransitionGroup
                    childFactory={child =>
                      createChildFactory(child, {
                        classNames: `number-secondary-${ direction }`,
                      })
                    }
                    className={`number-secondary-${ direction }`}
                    component="span"
                  >
                    <CSSTransition
                      className={`number-secondary-${ direction }-enter`}
                      classNames={`number-secondary-${ direction }`}
                      key={key}
                      timeout={{ enter: 400, exit: 400 }}
                    >
                      <span>{formatNumber(indexOf(edges, post) + 1)}</span>
                    </CSSTransition>
                  </TransitionGroup>
                </NumberSecondary>
              ))}
              <Line />
              <NumberPrimary>
                <TransitionGroup
                  childFactory={child =>
                    createChildFactory(child, {
                      classNames: `number-primary-${ direction }`,
                    })
                  }
                  className={`number-primary-${ direction }`}
                  component="span"
                >
                  <CSSTransition
                    className={`number-primary-${ direction }-enter`}
                    classNames={`number-primary-${ direction }`}
                    key={key}
                    timeout={{ enter: 400, exit: 400 }}
                  >
                    <span>{formatNumber(currentPostIndex + 1)}</span>
                  </CSSTransition>
                </TransitionGroup>
              </NumberPrimary>
            </Pagination>
          </Numbers>
        )}
        <Content style={contentStyle}>
          {ratio > 1.5 && (
            <div>
              <PostNumber style={postNumberStyle}>
                <TransitionGroup
                  childFactory={child =>
                    createChildFactory(child, {
                      classNames: `number-primary-${ direction }`,
                    })
                  }
                  className={`number-primary-${ direction }`}
                  component="span"
                >
                  <CSSTransition
                    className={`number-primary-${ direction }-enter`}
                    classNames={`number-primary-${ direction }`}
                    key={key}
                    timeout={{ enter: 400, exit: 400 }}
                  >
                    <span>{formatNumber(currentPostIndex + 1)}</span>
                  </CSSTransition>
                </TransitionGroup>
              </PostNumber>
              <Text style={textStyle}>
                <TransitionGroup
                  childFactory={child =>
                    createChildFactory(child, {
                      classNames: `description-${ direction }`,
                    })
                  }
                  className={`description-${ direction }`}
                  component="div"
                >
                  <CSSTransition
                    className={`description-${ direction }-enter`}
                    classNames={`description-${ direction }`}
                    key={key}
                    timeout={{ enter: 1000, exit: 1000 }}
                  >
                    <p>{currentPost.node.frontmatter.description}</p>
                  </CSSTransition>
                </TransitionGroup>
              </Text>
            </div>
          )}
          <Footer style={footerStyle}>
            <Icons />
          </Footer>
        </Content>
        {ratio >= 1 && (
          <Arrows style={arrowsStyle}>
            <Arrow onClick={this.prev}>&#60;</Arrow>
            <Arrow onClick={this.next}>&#62;</Arrow>
          </Arrows>
        )}
      </Container>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

const mapStateToProps = ({ slide, media }) => {
  return { slide, media }
}

const mapDispatchToProps = dispatch => {
  return {
    decrement: () => dispatch({ type: 'DECREMENT' }),
    go: index => dispatch({ type: 'GO', index }),
    increment: () => dispatch({ type: 'INCREMENT' }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            cover
            session
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
