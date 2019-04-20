import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { navigate, graphql } from 'gatsby'
import styled from 'styled-components'
import {
  drop,
  indexOf,
  throttle
} from 'lodash'
import { Transition } from 'react-transition-group'

import { getConfig, isTablet, isLaptop } from '../config.js'
import {
  formatArrowsStyle,
  formatNumbersStyle,
  formatSessionInfoStyle
} from '../formatters/style'

import Arrows from '../components/Arrows'
import Button from '../components/Button'
import Numbers from '../components/Numbers'
import SessionInfo from '../components/SessionInfo'
import Sliders from '../components/Sliders'

const DIRECTIONS = {
  forward: 'forward',
  backward: 'backward',
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

const Content = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

class IndexPage extends React.PureComponent {
  constructor (props) {
    super()
    this.state = {
      direction: null
    }

    this.tarnsitionActive = false
  }

  componentDidMount () {
    window.addEventListener('wheel', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('wheel', this.handleScroll)
  }

  handleScroll = e => {
    if (this.tarnsitionActive) return

    this.tarnsitionActive = true

    if (e.deltaY > 0) {
      this.next()
    } else if (e.deltaY < 0) {
      this.prev()
    }

    window.setTimeout(() => {
      this.tarnsitionActive = false
    }, 800)
  }

  handleNumberClick = (index, direction = DIRECTIONS.forward) => {
    const { go } = this.props

    go(index)
    this.setState({ direction })
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

    this.setState({ direction: DIRECTIONS.forward }, increment)
  }

  prev = () => {
    const { decrement } = this.props

    this.setState({ direction: DIRECTIONS.backward }, decrement)
  }

  handleSlideClick = (post, event) => {
    event && event.stopPropagation()

    navigate(post.fields.slug)
  }

  renderContent = currentPost => (
    <Button
      onClick={event => this.handleSlideClick(currentPost.node, event)}
      role="link"
    >
      see whole project
    </Button>
  )

  render () {
    const { activeTransitions, slide, data,
      location, media, timeout } = this.props
    const { direction } = this.state

    const { images } = data
    const { edges } = data.allMarkdownRemark
    const { pathname } = location
    const config = getConfig(media, pathname)

    const currentPostIndex = getIndexInRange(slide, edges.length)
    const currentPost = edges[currentPostIndex]

    const orderedPosts = this.orderPosts(edges, currentPost)

    const contentStyle = {
      ...config.index.content.getPosition()
    }

    return (
      <Container>
        {!isLaptop(media) && (
          <Transition
            in={activeTransitions['home']}
            timeout={timeout}
          >
            {state => {
              const numbersStyle = formatNumbersStyle(state, timeout)

              return (
                <Numbers
                  currentPostIndex={currentPostIndex}
                  direction={direction}
                  edges={edges}
                  media={media}
                  onNumberClick={this.handleNumberClick}
                  orderedPosts={orderedPosts}
                  pathname={pathname}
                  style={numbersStyle}
                />
              )
            }}
          </Transition>
        )}
        {!isLaptop(media) && (
          <Content style={contentStyle}>
            <Transition
              in={activeTransitions['home']}
              timeout={timeout}
            >
              {state => {
                const sessionInfoStyle = formatSessionInfoStyle(state, timeout)

                return (
                  <SessionInfo
                    currentPost={currentPost}
                    currentPostIndex={currentPostIndex}
                    direction={direction}
                    media={media}
                    onButtonClick={this.handleSlideClick}
                    pathname={pathname}
                    style={sessionInfoStyle}
                  />
                )
              }}
            </Transition>
          </Content>
        )}
        {!isTablet(media) && (
          <Transition
            in={activeTransitions['home']}
            timeout={timeout}
          >
            {state => {
              const arrowsStyle = formatArrowsStyle(state, timeout)

              return (
                <Arrows
                  onLeftClick={this.prev}
                  onRightClick={this.next}
                  media={media}
                  pathname={pathname}
                  style={arrowsStyle}
                />
              )
            }}
          </Transition>
        )}
        <Sliders
          direction={direction}
          edges={edges}
          media={media}
          images={images}
          onPrimarySliderClick={() => this.handleSlideClick(currentPost.node)}
          onSecondarySliderClick={this.prev}
          onSwipe={this.handleSwipe}
          pathname={pathname}
          renderContent={() => (
            <SessionInfo
              currentPost={currentPost}
              currentPostIndex={currentPostIndex}
              direction={direction}
              media={media}
              onButtonClick={this.handleSlideClick}
              pathname={pathname}
            />
          )}
          show={activeTransitions['home']}
          slide={slide}
        />
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

const mapStateToProps = ({
  slide,
  media,
  transitions: {
    activeTransitions,
    timeout
  }
}) => {
  return { activeTransitions, slide, media, timeout }
}

const mapDispatchToProps = dispatch => {
  return {
    decrement: () => dispatch({ type: 'DECREMENT' }),
    go: index => dispatch({ type: 'GO', index }),
    increment: () => dispatch({ type: 'INCREMENT' }),
    toggleTransition: key => dispatch({ type: 'TOGGLE_TRANSITION', key })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)

export const pageQuery = graphql`
  query IndexQuery($categoryRegex: String) {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___position] }
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
            info
            position
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "sessions" }
        name: { regex: $categoryRegex }
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
