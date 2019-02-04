import React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import Swipeable from 'react-swipeable'

import { getAssetPath } from '../utils/paths'
import { getConfig } from '../config.js'

import Slider from '../components/slider/slider'

const DIRECTIONS = {
  forward: 'forward',
  backward: 'backward',
}

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

function getIndexInRange (index, length) {
  return index >= 0
    ? index % length
    : (length - (Math.abs(index) % length)) % length
}

class Sliders extends React.Component {
  formatSliderPrimaryStyle = (state, config) => {
    const { media } = this.props
    const { index: { sliders } } = config

    return {
      position: 'absolute',
      transition: 'all 0.6s',
      ...sliders.primary(media),
    }
  }

  formatSliderSecondaryStyle = (state, config) => {
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
    const { direction, media: { ratio } } = this.props

    if (ratio < 1) return 0

    return direction === DIRECTIONS.backward ? 300 : 0
  }

  getSliderSecondaryDelay = () => {
    const { direction, media: { ratio } } = this.props

    if (ratio < 1) return 0

    return direction === DIRECTIONS.backward ? 0 : 300
  }

  render () {
    const {
      direction,
      edges,
      media,
      onPrimarySliderClick,
      onSecondarySliderClick,
      pathname,
      show,
      slide,
    } = this.props

    const config = getConfig(media, pathname)
    const { ratio } = media
    const posts = edges.slice().reverse()

    const currentSlideIndex = getIndexInRange(slide, posts.length)

    const sliderMaskStyle = {
      transition: 'all 0.6s',
      ...config.index.sliders.mask.getPosition(),
    }

    return (
      <Swipeable
        onSwipingLeft={() => this.handleSwipe()}
        onSwipingRight={() => this.handleSwipe(true)}
        trackMouse={ratio < 1}
      >
        <Transition in={show} key={pathname} timeout={600}>
          {state => {
            const delay = this.getSliderPrimaryDelay()
            const sliderStyle = this.formatSliderPrimaryStyle(state, config)

            return (
              <Slider
                animationTime={600}
                delay={delay}
                direction={direction}
                offset={posts.length - 1}
                width={sliderStyle.width}
                style={sliderStyle}
                value={currentSlideIndex}
              >
                {posts.map(({ node: post }, index) => (
                  <SlidePrimary
                    className="content"
                    key={post.frontmatter.session}
                    onClick={() => onPrimarySliderClick(post)}
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
            )
          }}
        </Transition>
        <Transition in={show} key={pathname} timeout={600}>
          {state => (
            <Slider
              animationTime={600}
              delay={this.getSliderSecondaryDelay()}
              direction={direction}
              offset={0}
              style={this.formatSliderSecondaryStyle(state, config)}
              value={currentSlideIndex}
              width={
                config.index.sliders.secondary().width
              }
            >
              {posts.map(({ node: post }, index) => (
                <SlideSecondary
                  key={post.frontmatter.session}
                  onClick={onSecondarySliderClick}
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
    )
  }
}

export default Sliders
