import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import Swipeable from 'react-swipeable'

import { getAssetPath } from '../utils/paths'
import { getConfig, isMobile, isTablet, isLaptop } from '../config.js'
import {
  formatSliderPrimaryStyle,
  formatSliderSecondaryStyle
} from '../formatters/style'

import Slider from '../components/slider/slider'

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
      timeout
    } = this.props

    const config = getConfig(media, pathname)
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
        trackMouse={isMobile(media)}
      >
        <Transition in={show} key={pathname} timeout={timeout}>
          {state => {
            const sliderStyle =
              formatSliderPrimaryStyle(state, timeout, config, media)

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
                    {isLaptop(media) && (
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
        <Transition in={show} key={pathname} timeout={timeout}>
          {state => (
            <SecondSlider
              isTablet={isTablet(media)}
              animationTime={800}
              delay={0}
              direction={direction}
              offset={0}
              style={formatSliderSecondaryStyle(state, timeout, config, media)}
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
        {isMobile(media) && (
          <SliderMask style={sliderMaskStyle} />
        )}
      </Swipeable>
    )
  }
}

const mapStateToProps = ({
  transitions: {
    activeTransitions,
    timeout
  } }) => ({ activeTransitions, timeout })

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sliders)
