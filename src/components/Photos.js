import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { find } from 'lodash'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { getConfig } from '../config.js'

import BackgroundImage from '../components/BackgroundImage'

const propTypes = {
  direction: PropTypes.string,
  session: PropTypes.string,
  views: PropTypes.array,
}

function createChildFactory (child, props) {
  return React.cloneElement(child, props)
}

const Wrapper = styled.div`
  position: relative;
  top: 0px;
  height: 100%;
  width: 100%;
`

const FirstPhoto = styled.div`
  position: absolute;

`

const SecondPhoto = styled.div`
  position: absolute;

  $::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
    transition: background 0.4s;
  }
  
  :hover {
    $::after {
      background: rgba(0,0,0,0.3);
    }
  }
`

const FirstTransitionGroup = styled(TransitionGroup)`
  .photo-primary-forward-enter {
    transition: all 750ms ease-out;
    transition-delay: 600ms;
    transform: translateY(100%);
  }

  .photo-primary-forward-enter-active {
    transform: translateY(0);
  }

  .photo-primary-forward-exit {
    transition: all 750ms ease-out;
    transition-delay: 600ms;
    transform: translateY(0);
    position: absolute;
    right: 120px;
    top: 0;
    opacity: 1;
  }

  .photo-primary-forward-exit-active {
    transform: translateY(-100%);
  }

  .photo-primary-backward-enter {
    transition: all 750ms ease-out;
    transition-delay: 600ms;
    transform: translateY(-100%);
  }

  .photo-primary-backward-enter-active {
    transform: translateY(0);
  }

  .photo-primary-backward-exit {
    transition: all 750ms ease-out;
    transition-delay: 600ms;
    transform: translateY(0);
    position: absolute;
    right: 120px;
    top: 0;
    opacity: 1;
  }

  .photo-primary-backward-exit-active {
    transform: translateY(100%);
  }
`

const SecondTransitionGroup = styled(TransitionGroup)`
  .photo-secondary-forward-enter {
    clip: ${ props =>
    'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)' };
    transition: all 600ms ease;
    transition-delay: 1400ms;
  }

  .photo-secondary-forward-enter-active {
    clip: ${ props =>
    'rect(0px ' +
    Math.floor(props.width) +
    'px ' +
    Math.floor(props.height) +
    'px 0px)' };
  }

  .photo-secondary-forward-enter-done {
    clip: ${ props =>
    'rect(0px ' +
    Math.floor(props.width) +
    'px ' +
    Math.floor(props.height) +
    'px 0px)' };
  }

  .photo-secondary-forward-exit {
    transition: all 0.9s ease;
    transition-delay: 0.3s;
    transform: translateY(0);
    position: absolute;
    right: 120px;
    top: 0;
    opacity: 1;
  }

  .photo-secondary-forward-exit-active {
    transform: translateY(-150%);
    opacity: 0;
  }

  .photo-secondary-backward-enter {
    clip: ${ props =>
    'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)' };
    transition: all 600ms ease;
    transition-delay: 1400ms;
  }

  .photo-secondary-backward-enter-active {
    clip: ${ props =>
    'rect(0px ' +
    Math.floor(props.width) +
    'px ' +
    Math.floor(props.height) +
    'px 0px)' };
  }
  
  .photo-secondary-backward-enter-done {
    clip: ${ props =>
    'rect(0px ' +
    Math.floor(props.width) +
    'px ' +
    Math.floor(props.height) +
    'px 0px)' };
  }

  .photo-secondary-backward-exit {
    transition: all 0.9s ease;
    transition-delay: 0.3s;
    transform: translateY(0);
    position: absolute;
    right: 120px;
    top: 0;
    opacity: 1;
  }

  .photo-secondary-backward-exit-active {
    transform: translateY(150%);
    opacity: 0;
  }
`

const FirstPhotoWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  color: #000;
  transition: all 0.4s;
`
const SecondPhotoWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  color: #000;
  transition: all 0.4s;
`

const Photo = ({ direction, images, media, part, session, views }) => {
  const config = getConfig(media, '/sessions')

  const layout = config.layouts.getLayout()

  const photosLarge = images.photos
    .map(image => image.photo)
    .filter(photo => photo.relativePath.includes('big'))

  const layoutIndex = part === 0 ? 0 : 1

  const firstPhotoPosition = {
    height: layout[layoutIndex].first.height,
    width: layout[layoutIndex].first.width,
    left: layout[layoutIndex].first.left,
    top: layout[layoutIndex].first.top,
  }

  const secondPhotoPosition = {
    top: layout[layoutIndex].second.top,
    left: layout[layoutIndex].second.left,
    height: layout[layoutIndex].second.height,
    width: layout[layoutIndex].second.width,
  }

  const firstPhotoStyle = {
    ...firstPhotoPosition,
  }

  const secondPhotoStyle = {
    ...secondPhotoPosition,
  }

  const firstPhoto = find(photosLarge, photo =>
    photo.relativePath.includes(views[part].first)
  )
  const secondPhoto = find(photosLarge, photo =>
    photo.relativePath.includes(views[part].second)
  )

  return (
    <Wrapper className="column is-10 is-offset-1">
      <FirstPhotoWrapper>
        <FirstTransitionGroup
          childFactory={child =>
            createChildFactory(child, {
              classNames: `photo-primary-${ direction }`,
            })
          }
          height={firstPhotoPosition.height}
          width={firstPhotoPosition.width}
          component="span"
          // className={`photo-primary-${ direction }`}
        >
          <CSSTransition
            // className={`photo-primary-${ direction }-enter`}
            classNames={`photo-primary-${ direction }`}
            key={part}
            timeout={{ enter: 1800, exit: 1800 }}
          >
            <FirstPhoto style={firstPhotoStyle}>
              {firstPhoto && (
                <BackgroundImage fluid={firstPhoto.childImageSharp.fluid} />
              )}
            </FirstPhoto>
          </CSSTransition>
        </FirstTransitionGroup>
      </FirstPhotoWrapper>
      <SecondPhotoWrapper>
        <SecondTransitionGroup
          height={secondPhotoPosition.height}
          width={secondPhotoPosition.width}
          childFactory={child =>
            createChildFactory(child, {
              classNames: `photo-secondary-${ direction }`,
            })
          }
          component="span"
          // className={`photo-secondary-${ direction }`}
        >
          <CSSTransition
            // className={`photo-secondary-${ direction }-enter`}
            classNames={`photo-secondary-${ direction }`}
            key={part}
            timeout={{ enter: 2000, exit: 2000 }}
          >
            <SecondPhoto style={secondPhotoStyle}>
              {secondPhoto && (
                <BackgroundImage fluid={secondPhoto.childImageSharp.fluid} />
              )}
            </SecondPhoto>
          </CSSTransition>
        </SecondTransitionGroup>
      </SecondPhotoWrapper>
    </Wrapper>
  )
}

Photo.propTypes = propTypes

export default Photo
