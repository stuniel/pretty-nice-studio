import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { find } from 'lodash'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Image from 'gatsby-image'
import { decodePath, getAssetPath } from '../utils/paths'

import BackgroundImage from '../components/BackgroundImage'

const windowGlobal = typeof window !== 'undefined' && window

const propTypes = {
  direction: PropTypes.string,
  session: PropTypes.string,
  views: PropTypes.array
}

function createChildFactory(child, props) {
  return React.cloneElement(child, props)
}

function isEven(value) {
  return value % 4 === 0
}

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
`

const FirstPhoto = styled.div`
  position: absolute;
`

const SecondPhoto = styled.div`
  position: absolute;
`

const FirstTransitionGroup = styled(TransitionGroup)`
  &.photo-primary-forward {
    position: relative;
    
    .photo-primary-forward-enter {
      clip: ${props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)'};
      transition: all ${props => props.exit}ms;
      transition-delay: ${props => (props.enter - props.exit) / 2}ms;
    }
      
    .photo-primary-forward-enter-active {
      clip: ${props => 'rect(0px ' + Math.floor(props.width) + 'px ' + Math.floor(props.height) + 'px 0px)'};
    }
    
    .photo-primary-forward-exit {
      transition: all 0.9s;
      position: absolute;
      right: 120px;
      top: 0;
      transform: translateY(0);
      opacity: 1;
    }
    
    .photo-primary-forward-exit-active {
      transform: translateY(-150%);
      opacity: 0;
    }
  }
  
  &.photo-primary-backward {
    position: relative;
    
    .photo-primary-backward-enter {
      clip: ${props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)'};
      transition: all ${props => props.exit}ms;
      transition-delay: ${props => (props.enter - props.exit) / 2}ms;
    }
    
    .photo-primary-backward-enter-active {
      clip: ${props => 'rect(0px ' + Math.floor(props.width) + 'px ' + Math.floor(props.height) + 'px 0px)'};
    }
    
    .photo-primary-backward-exit {
      transition: all 0.9s;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(0);
      opacity: 1;
    }
      
    .photo-primary-backward-exit-active {
      transform: translateY(150%);
      opacity: 0;
    }
  }
`

const SecondTransitionGroup = styled(TransitionGroup)`
  &.photo-secondary-forward {
    position: relative;
    
    .photo-secondary-forward-enter {
      clip: ${props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)'};
      transition: all ${props => props.exit}ms;
      transition-delay: ${props => props.enter - props.exit}ms;
    }
      
    .photo-secondary-forward-enter-active {
      clip: ${props => 'rect(0px ' + Math.floor(props.width) + 'px ' + Math.floor(props.height) + 'px 0px)'};
    }
    
    .photo-secondary-forward-exit {
      transition: all 0.9s;
      position: absolute;
      right: 120px;
      top: 0;
      transform: translateY(0);
      opacity: 1;
      transition-delay: 0.3s;
    }
    
    .photo-secondary-forward-exit-active {
      transform: translateY(-150%);
      opacity: 0;
    }
  }
  
  &.photo-secondary-backward {
    position: relative;
    
    .photo-secondary-backward-enter {
      clip: ${props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)'};
      transition: all ${props => props.exit}ms;
      transition-delay: ${props => props.enter - props.exit}ms;
    }
    
    .photo-secondary-backward-enter-active {
      clip: ${props => 'rect(0px ' + Math.floor(props.width) + 'px ' + Math.floor(props.height) + 'px 0px)'};
    }
    
    .photo-secondary-backward-exit {
      transition: all 0.9s;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(0);
      opacity: 1;
      transition-delay: 0.3s;
    }
      
    .photo-secondary-backward-exit-active {
      transform: translateY(150%);
      opacity: 0;
    }
  }
`

const FirstPhotoWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 8px 0;
  color: #000;
  transition: all 0.4s;
`
const SecondPhotoWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  padding: 8px 0;
  color: #000;
  transition: all 0.4s;
`

const getLayout = (height, width) => {
  return [
    {
      type: 0,
      first: {
        top: 120,
        left: 0,
        width: height *  0.64,
        height: height * 0.8    
      },
      second: {
        top: 120,
        left: width / 2,
        width: (height - 360) * 0.8,
        height: height - 360    
      }
    }
  ]
}
const Photo = ({ direction, images, part, session, views }) => {
  const height = windowGlobal.innerHeight
  const width = windowGlobal.innerWidth
  
  const layout = getLayout(height, width)

  const photosLarge = images
    .photos
    .map(image => image.photo)
    .filter(photo => photo.relativePath.includes('big'))
  
  const firstPhotoPosition = {
    height: isEven(part) ? layout[0].first.height : height - 360,
    width: isEven(part) ? layout[0].first.width : (height - 360) * 0.8,
    left: layout[0].first.left,
    top: isEven(part) ? layout[0].first.top : height * 0.1,
  }
  
  firstPhotoPosition.right = firstPhotoPosition.left + firstPhotoPosition.width
  firstPhotoPosition.bottom = firstPhotoPosition.top + firstPhotoPosition.height

  const secondPhotoPosition = {
    top: isEven(part) ? layout[0].second.top : height * 0.1,
    left: layout[0].second.left,
    height: isEven(part) ? layout[0].second.height : height * 0.8,
    width: isEven(part) ? layout[0].second.width : (height *  0.8 * 0.8),
  }
  
  secondPhotoPosition.right = secondPhotoPosition.left + secondPhotoPosition.width
  secondPhotoPosition.bottom = secondPhotoPosition.top + secondPhotoPosition.height
  
  const firstPhotoStyle = {
    ...firstPhotoPosition
  }

  const secondPhotoStyle = {
    ...secondPhotoPosition
  }
  
  const firstPhoto = find(photosLarge, photo => photo.relativePath.includes(views[part].first))
  const secondPhoto = find(photosLarge, photo => photo.relativePath.includes(views[part].second))
  
  return (
    <Wrapper className="column is-10 is-offset-1">
        <FirstPhotoWrapper>
          <FirstTransitionGroup
            childFactory={child => createChildFactory(child, { classNames: `photo-primary-${direction}` })}
            height={firstPhotoPosition.height}
            width={firstPhotoPosition.width}
            enter={1500}
            exit={750}
            component="span"
            className={`photo-primary-${direction}`}
          >
            <CSSTransition
              className={`photo-primary-${direction}-enter`}
              classNames={`photo-primary-${direction}`}
              key={part}
              timeout={{ enter: 1500, exit: 750 }}
            >
              <FirstPhoto style={firstPhotoStyle}>
                {firstPhoto && (
                  <BackgroundImage fluid={firstPhoto.childImageSharp.fluid} />
                )}
              </FirstPhoto>
              {/* <FirstPhoto style={firstPhotoStyle} fluid={}src={getAssetPath(session, views[part].first)} /> */}
            </CSSTransition>
          </FirstTransitionGroup>
        </FirstPhotoWrapper>
        <SecondPhotoWrapper>
          <SecondTransitionGroup
            height={secondPhotoPosition.height}
            width={secondPhotoPosition.width}
            enter={1500}
            exit={750}
            childFactory={child => createChildFactory(child, { classNames: `photo-secondary-${direction}` })}
            component="span"
            className={`photo-secondary-${direction}`}
          >
            <CSSTransition
              className={`photo-secondary-${direction}-enter`}
              classNames={`photo-secondary-${direction}`}
              key={part}
              timeout={{ enter: 1500, exit: 750 }}
            >
              <SecondPhoto style={secondPhotoStyle}>
                {secondPhoto && (
                  <BackgroundImage fluid={secondPhoto.childImageSharp.fluid} />
                )}
              </SecondPhoto>
              {/* <SecondPhoto style={secondPhotoStyle} /> */}
            </CSSTransition>
          </SecondTransitionGroup>
        </SecondPhotoWrapper>
    </Wrapper>
  )
}

Photo.propTypes = propTypes

export default Photo
