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

import Swipeable from 'react-swipeable'

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

const SessionInfo = styled.div`
  position: relative;
  height: 100%;
`

const PostNumber = styled.div`
  font-family: Georgia, sans-serif;
  position: absolute;
  font-size: 360px;
  line-height: 270px;
  color: #dedede;
  opacity: 0.5;
`

const Line = styled.div`
  height: 120px;
  width: 1px;
  margin-top: 36px;
  border-left: 1px solid black;
`

const GoToButton = styled.div`
  font-family: Amiko, serif;
  text-transform: uppercase;
  font-size: 12px;
  position: absolute;
  padding: 3px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #000;
  cursor: pointer;
  margin-top: 30px;
  height: 30px;
  width: 165px;
  transition: background 0.4s;
  
  &:hover {
    background: ${ SECONDARY_COLOR };
  }
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
`

const Arrow = styled.span`
  height: 40px;
  width: 40px;
  background: #000;
  cursor: pointer;
  transition: background 0.4s;

  &:hover {
    background: ${ SECONDARY_COLOR };
  }
`

const ArrowLeft = styled(Arrow)`
  clip-path: polygon(50% 5%, 0% 50%, 50% 95%, 50% 80%, 17% 50%, 50% 20%);
`
const ArrowRight = styled(Arrow)`
  clip-path: polygon(50% 5%, 100% 50%, 50% 95%, 50% 80%, 83% 50%, 50% 20%);
`

const Text = styled.div`
  position: absolute;
  width: 80%;
  max-width: 600px;
  height: auto;
`

const Footer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
`

class IndexPage extends React.PureComponent {
  constructor (props) {
    super()
    this.state = {
      direction: '',
      show: false,
    }
  }

  handleNumberClick = index => {
    const { go } = this.props

    go(index)
    this.setState({ direction: directions.forward })
  }

  handleSwipe = throttle(isNext => {
    if (isNext) {
      this.next()
    } else {
      this.prev()
    }
  }, 300, { trailing: false })

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

    return {
      position: 'absolute',
      transition: 'all 0.6s',
      ...sliders.primary(media),
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
    const { direction, show } = this.state
    const { edges } = data.allMarkdownRemark
    const { ratio } = media

    const posts = edges.slice().reverse()

    const currentSlideIndex = getIndexInRange(slide, posts.length)

    const currentPostIndex = getIndexInRange(slide, edges.length)
    const currentPost = edges[currentPostIndex]

    const key = formatKey(slide)

    const orderedPosts = this.orderPosts(edges, currentPost)

    const numbersStyle = {
      ...config.index.numbers.getPosition(media)
    }

    const contentStyle = {
      ...config.index.content.getPosition(media)
    }

    const arrowsStyle = {
      ...config.index.arrows.getPosition(media),
    }

    const postNumberStyle = {
      position: 'absolute',
      left: -90,
      bottom: 60
    }

    const textStyle = {
      position: 'absolute',
      width: '80%',
      maxWidth: 600,
      height: 'auto',
      ...config.index.content.text.getPosition(media),
    }

    const sessionInfoStyle = {
      ...config.index.content.sessionInfo.getPosition(media),
    }

    const sliderMaskStyle = {
      transition: 'all 0.6s',
      ...config.index.sliders.mask.getPosition(media),
    }

    const footerStyle = {
      ...config.index.footer.getPosition(media)
    }

    const numberPrimaryStyle = {
      ...config.index.numbers.primary.getPosition(media)
    }

    return (
      <Container>
        <Swipeable
          onSwipingLeft={() => this.handleSwipe()}
          onSwipingRight={() => this.handleSwipe(true)}
          trackMouse={ratio < 1}
        >
          <Transition in={show} key={location.pathname} timeout={600}>
            {state => (
              <Slider
                animationTime={600}
                delay={this.getSliderPrimaryDelay()}
                direction={direction}
                offset={posts.length - 1}
                width={config.index.sliders.primary(media).width}
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
          <Transition in={show} key={location.pathname} timeout={600}>
            {state => (
              <Slider
                animationTime={600}
                delay={this.getSliderSecondaryDelay()}
                direction={direction}
                offset={0}
                style={this.formatSliderSecondaryStyle(state)}
                value={currentSlideIndex}
                width={
                  config.index.sliders.secondary(media).width
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
          {ratio < 1 && (
            <SliderMask style={sliderMaskStyle} />
          )}
        </Swipeable>
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
              <NumberPrimary style={numberPrimaryStyle}>
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
            <SessionInfo style={sessionInfoStyle}>
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
                    <div>
                      {currentPost.node.frontmatter.info.map(line => (
                        <p>{line}</p>
                      ))}
                      <GoToButton
                        onClick={() => this.handleSlideClick(currentPost.node)}
                        role="link"
                      >
                        see whole project
                      </GoToButton>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </Text>
            </SessionInfo>
          )}
          <Footer style={footerStyle}>
            <Icons width='165px' />
          </Footer>
        </Content>
        {ratio >= 1 && (
          <Arrows style={arrowsStyle}>
            <ArrowLeft onClick={this.prev} />
            <ArrowRight onClick={this.next} />
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
      filter: { frontmatter: { templateKey: { eq: "session" } } }
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
            info
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
