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
`

const FirstTransitionGroup = styled(TransitionGroup)`
  &.photo-primary-forward {

    .photo-primary-forward-enter {
      ${'' /* clip: ${ props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)' }; */}
      transition: all ${ props => props.exit }ms;
      ${'' /* transition-delay: ${ props => props.enter - props.exit }ms; */}
      transform: translateY(100%);

      ${'' /* transition-delay: ${ props => (props.enter - props.exit) / 2 }ms; */}
    }

    .photo-primary-forward-enter-active {
      z-index: 1;
      transform: translateY(0);
      ${'' /* clip: ${ props =>
    'rect(0px ' +
        Math.floor(props.width) +
        'px ' +
        Math.floor(props.height) +
        'px 0px)' }; */}
    }

    .photo-primary-forward-exit {
      transition: all ${ props => props.exit }ms;
      position: absolute;
      right: 120px;
      top: 0;
      opacity: 1;
      ${'' /* transition-delay: ${ props => props.enter * 2 }ms; */}
    }

    .photo-primary-forward-exit-active {
    }
  }

  &.photo-primary-backward {

    .photo-primary-backward-enter {
      ${'' /* clip: ${ props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)' }; */}
      transition: all ${ props => props.exit }ms;
      transition-delay: ${ props => props.enter - props.exit }ms;
    }

    .photo-primary-backward-enter-active {
      ${'' /* clip: ${ props =>
    'rect(0px ' +
        Math.floor(props.width) +
        'px ' +
        Math.floor(props.height) +
        'px 0px)' }; */}
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
    }
  }
`

const SecondTransitionGroup = styled(TransitionGroup)`
  &.photo-secondary-forward {

    .photo-secondary-forward-enter {
      clip: ${ props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)' };
      transition: all ${ props => props.exit }ms;
      transition-delay: ${ props => props.enter - props.exit }ms;
    }

    .photo-secondary-forward-enter-active {
      clip: ${ props =>
    'rect(0px ' +
        Math.floor(props.width) +
        'px ' +
        Math.floor(props.height) +
        'px 0px)' };
    }

    .photo-secondary-forward-exit {
      transition: all 0.9s;
      transition-delay: 0.3s;
      position: absolute;
      right: 120px;
      top: 0;
      transform: translateY(0);
      opacity: 1;
    }

    .photo-secondary-forward-exit-active {
      transform: translateY(-150%);
      opacity: 0;
    }
  }

  &.photo-secondary-backward {

    .photo-secondary-backward-enter {
      clip: ${ props => 'rect(0px 0px ' + Math.floor(props.height) + 'px 0px)' };
      transition: all ${ props => props.exit }ms;
      transition-delay: ${ props => props.enter - props.exit }ms;
    }

    .photo-secondary-backward-enter-active {
      clip: ${ props =>
    'rect(0px ' +
        Math.floor(props.width) +
        'px ' +
        Math.floor(props.height) +
        'px 0px)' };
    }

    .photo-secondary-backward-exit {
      transition: all 0.9s;
      transition-delay: 0.3s;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(0);
      opacity: 1;
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
  const config = getConfig(media)

  const layout = config.layouts.getLayout()

  const photosLarge = images.photos
    .map(image => image.photo)
    .filter(photo => photo.relativePath.includes('big'))

  const firstPhotoPosition = {
    height: layout[0].first.height,
    width: layout[0].first.width,
    left: layout[0].first.left,
    top: layout[0].first.top,
  }

  firstPhotoPosition.right = firstPhotoPosition.left + firstPhotoPosition.width
  firstPhotoPosition.bottom = firstPhotoPosition.top + firstPhotoPosition.height

  const secondPhotoPosition = {
    top: layout[0].second.top,
    left: layout[0].second.left,
    height: layout[0].second.height,
    width: layout[0].second.width,
  }

  secondPhotoPosition.right =
    secondPhotoPosition.width - secondPhotoPosition.left
  secondPhotoPosition.bottom =
    secondPhotoPosition.top + secondPhotoPosition.height

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
          enter={1500}
          exit={750}
          component="span"
          className={`photo-primary-${ direction }`}
        >
          <CSSTransition
            className={`photo-primary-${ direction }-enter`}
            classNames={`photo-primary-${ direction }`}
            key={part}
            timeout={{ enter: 1500, exit: 750 }}
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
          enter={1500}
          exit={750}
          childFactory={child =>
            createChildFactory(child, {
              classNames: `photo-secondary-${ direction }`,
            })
          }
          component="span"
          className={`photo-secondary-${ direction }`}
        >
          <CSSTransition
            className={`photo-secondary-${ direction }-enter`}
            classNames={`photo-secondary-${ direction }`}
            key={part}
            timeout={{ enter: 1500, exit: 750 }}
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
