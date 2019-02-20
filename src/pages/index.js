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

import { RATIO_LARGE, RATIO_MEDIUM, RATIO_SMALL, getConfig } from '../config.js'

import Arrows from '../components/Arrows'
import Button from '../components/Button'
import Numbers from '../components/Numbers'
import SessionInfo from '../components/SessionInfo'
import Sliders from '../components/Sliders'

import '../components/all.sass'

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
      direction: '',
      show: false,
    }
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

    increment()
    this.setState({ direction: DIRECTIONS.forward })
  }

  prev = () => {
    const { decrement } = this.props

    decrement()
    this.setState({ direction: DIRECTIONS.backward })
  }

  handleSlideClick = (post, event) => {
    event && event.stopPropagation()

    this.setState({ show: true })
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
    const { slide, data, location, media } = this.props
    const { direction, show } = this.state
    const { edges } = data.allMarkdownRemark
    const { ratio } = media
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
        {media.width} - {media.height} - {media.ratio}
        <Sliders
          direction={direction}
          edges={edges}
          media={media}
          onPrimarySliderClick={() => this.handleSlideClick(currentPost.node)}
          onSecondarySliderClick={this.prev}
          onTercerySliderClick={() => this.handleNumberClick(getIndexInRange(slide + 1, edges.length), DIRECTIONS.backward)}
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
          show={show}
          slide={slide}
        />
        {ratio >= RATIO_LARGE && (
          <Numbers
            currentPostIndex={currentPostIndex}
            direction={direction}
            edges={edges}
            media={media}
            onNumberClick={this.handleNumberClick}
            orderedPosts={orderedPosts}
            pathname={pathname}
          />
        )}
        {ratio >= RATIO_LARGE && (
          <Content style={contentStyle}>
            <SessionInfo
              currentPost={currentPost}
              currentPostIndex={currentPostIndex}
              direction={direction}
              media={media}
              onButtonClick={this.handleSlideClick}
              pathname={pathname}
            />
          </Content>
        )}
        {ratio >= RATIO_MEDIUM && (
          <Arrows
            onLeftClick={this.prev}
            onRightClick={this.next}
            media={media}
            pathname={pathname}
          />
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
