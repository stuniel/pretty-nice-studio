import React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import Swipeable from 'react-swipeable'

import { getAssetPath } from '../utils/paths'
import { RATIO_LARGE, RATIO_MEDIUM, RATIO_SMALL, getConfig } from '../config.js'

import Slider from '../components/slider/slider'

const DIRECTIONS = {
  forward: 'forward',
  backward: 'backward',
}

const SlidePrimary = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  transition: all 0.3s ease-out;
  opacity: 1;
  
  > * {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  :hover {
    & > * {
      opacity: 1;
    }
  }
`

const HoverInfo = styled.div`
  height: 100%;
  background-color: rgba(255,255,255,0.3);
`

const SlideSecondary = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
  background-position: center;
  background-size: cover;
  transition: all 0.3s ease-out;
`

const FirstSlider = styled(Slider)`
  > div {
    transform: scale(1);
    transition: all 0.8s ease;
  }

  &:hover {
    > div {
      transform: scale(1.05);
    }
  }
`

const SecondSlider = styled(Slider)`
  &:hover {
    ${ props => !props.isTablet && 'transform: translateX(-30px)' };
  }
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

  formatSliderTercaryStyle = (state, config) => {
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
      ...sliders.tercery(media),
      ...(state === 'entering' && transitionStyles.entering),
      ...(state === 'entered' && transitionStyles.entering),
    }
  }

  getSliderTerceryDelay = () => {
    const { direction, media: { ratio } } = this.props

    if (ratio < RATIO_SMALL) return 0

    if (ratio < RATIO_MEDIUM) return 0

    return direction === DIRECTIONS.backward ? 0 : 300
  }

  render () {
    const {
      direction,
      edges,
      media,
      onPrimarySliderClick,
      onSecondarySliderClick,
      onSwipe,
      pathname,
      renderContent,
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
        onSwipingLeft={() => onSwipe()}
        onSwipingRight={() => onSwipe(true)}
        trackMouse={ratio < RATIO_SMALL}
      >
        <Transition in={show} key={pathname} timeout={800}>
          {state => {
            const sliderStyle = this.formatSliderPrimaryStyle(state, config)

            return (
              <FirstSlider
                animationTime={800}
                delay={0}
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
                    onClick={onPrimarySliderClick}
                    role="link"
                    style={{
                      backgroundImage: `url(${ getAssetPath(
                        post.frontmatter.session,
                        post.frontmatter.cover
                      ) })`,
                    }}
                  >
                    {ratio < RATIO_LARGE && (
                      <HoverInfo>
                        {renderContent()}
                      </HoverInfo>
                    )}
                  </SlidePrimary>
                ))}
              </FirstSlider>
            )
          }}
        </Transition>
        <Transition in={show} key={pathname} timeout={800}>
          {state => (
            <SecondSlider
              isTablet={ratio < RATIO_MEDIUM}
              animationTime={800}
              delay={0}
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
            </SecondSlider>
          )}
        </Transition>
        {ratio < RATIO_SMALL && (
          <SliderMask style={sliderMaskStyle} />
        )}
      </Swipeable>
    )
  }
}

export default Sliders
