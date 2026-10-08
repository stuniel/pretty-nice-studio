import React from 'react'
import styled from 'styled-components'
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'

import { getConfig } from '../config.js'

import Button from '../components/Button'

const PostNumber = styled.div`
  font-family: 'Scheherazada', serif;
  font-weight: 500;
  transform: scale(1, 0.8);
  -webkit-transform: scale(1, 0.8); /* Safari and Chrome */
  -moz-transform: scale(1, 0.8); /* Firefox */
  -ms-transform: scale(1, 0.8); /* IE 9+ */
  -o-transform: scale(1, 0.8); /* Opera */
  position: absolute;
  line-height: 270px;
  color: #dedede;
  opacity: 0.3;
`

const StyledTransitionGroup = styled(TransitionGroup)`
  position: relative;
  height: auto;
  float: left;

  span {
    display: inline-block;
  }

  .big-number-primary-forward-enter {
    transition: all 1000ms;
    transform: translateY(-100%);
    opacity: 0;
  }

  .big-number-primary-forward-enter-active {
    transform: translateY(0);
    opacity: 1;
  }

  .big-number-primary-forward-exit {
    transition: all 1000ms;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(0);
    opacity: 1;
  }

  .big-number-primary-forward-exit-active {
    transform: translateY(100%);
    opacity: 0;
  }

  .big-number-primary-backward-enter {
    transition: all 1000ms;
    transform: translateY(100%);
    opacity: 0;
  }

  .big-number-primary-backward-enter-active {
    transform: translateY(0);
    opacity: 1;
  }

  .big-number-primary-backward-exit {
    transition: all 1000ms;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(0);
    opacity: 1;
  }

  .big-number-primary-backward-exit-active {
    transform: translateY(-100%);
    opacity: 0;
  }
`

export const StyledDescriptionTransitionGroup = styled(TransitionGroup)`
  .description-forward-enter {
    transition: all 400ms;
    transition-delay: 600ms;
    transform: translateX(-33%);
    opacity: 0;
  }

  .description-forward-enter-active {
    transform: translateX(0);
    opacity: 1;
  }

  .description-forward-exit {
    transition: all 1000ms;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateX(0);
    opacity: 1;
  }

  .description-forward-exit-active {
    transform: translateX(150%);
    opacity: 0;
  }

  .description-backward-enter {
    transition: all 400ms;
    transition-delay: 600ms;
    transform: translateX(33%);
    opacity: 0;
  }

  .description-backward-enter-active {
    transform: translateX(0);
    opacity: 1;
  }

  .description-backward-exit {
    transition: all 1000ms;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateX(0);
    opacity: 1;
  }

  .description-backward-exit-active {
    transform: translateX(-150%);
    opacity: 0;
  }
`

const Text = styled.div`
  position: absolute;
  width: 80%;
  max-width: 600px;
  height: auto;
  
  p {
    font-size: 1.15em;
    line-height: 1.5em;
  }
`

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: auto;
`

const StyledButton = styled(Button)`
  font-size: 14px;
`

export function createChildFactory (child, props) {
  return React.cloneElement(child, props)
}

function formatNumber (number) {
  if (number < 10) return `0${ number }`
  return number
}

const SessionInfo = ({
  currentPost,
  currentPostIndex,
  direction,
  media,
  onButtonClick,
  pathname,
  style
}) => {
  const config = getConfig(media, pathname)

  const postNumberStyle = {
    position: 'absolute',
    ...config.index.content.number.getPosition(),
  }

  const textStyle = {
    position: 'absolute',
    width: '80%',
    maxWidth: 600,
    height: 'auto',
    ...config.index.content.text.getPosition(),
  }

  const sessionInfoStyle = {
    ...config.index.content.sessionInfo.getPosition(),
    ...style
  }

  return (
    <Wrapper style={sessionInfoStyle}>
      <PostNumber style={postNumberStyle}>
        <StyledTransitionGroup
          childFactory={child =>
            createChildFactory(child, {
              classNames: `big-number-primary-${ direction }`,
            })
          }
          className={`big-number-primary-${ direction }`}
          component="span"
        >
          <CSSTransition
            className={`big-number-primary-${ direction }-enter`}
            classNames={`big-number-primary-${ direction }`}
            key={currentPostIndex}
            timeout={{ enter: 1000, exit: 1000 }}
          >
            <span>{formatNumber(currentPostIndex + 1)}</span>
          </CSSTransition>
        </StyledTransitionGroup>
      </PostNumber>
      <Text style={textStyle}>
        <StyledDescriptionTransitionGroup
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
            key={currentPostIndex}
            timeout={{ enter: 1000, exit: 1000 }}
          >
            <div>
              {currentPost.node.frontmatter.info.map(line => (
                <p><strong>{line.role}: </strong>{line.name}</p>
              ))}
              <StyledButton
                onClick={() => onButtonClick(currentPost.node)}
                role="link"
              >
                see whole project
              </StyledButton>
            </div>
          </CSSTransition>
        </StyledDescriptionTransitionGroup>
      </Text>
    </Wrapper>
  )
}

export default SessionInfo
