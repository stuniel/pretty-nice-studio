import React from 'react'
import styled from 'styled-components'
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'
import { indexOf } from 'lodash'

import { getConfig } from '../config.js'

const SECONDARY_COLOR = '#bcbcbc'

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

const PostNumber = styled.div`
  font-family: Georgia, sans-serif;
  position: absolute;
  font-size: 360px;
  line-height: 270px;
  color: #dedede;
  opacity: 0.5;
`

const Text = styled.div`
  position: absolute;
  width: 80%;
  max-width: 600px;
  height: auto;
`

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

function createChildFactory (child, props) {
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
}) => {
  const config = getConfig(media, pathname)

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
    ...config.index.content.text.getPosition(),
  }

  const sessionInfoStyle = {
    ...config.index.content.sessionInfo.getPosition(),
  }

  return (
    <Wrapper style={sessionInfoStyle}>
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
            key={currentPostIndex}
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
            key={currentPostIndex}
            timeout={{ enter: 1000, exit: 1000 }}
          >
            <div>
              {currentPost.node.frontmatter.info.map(line => (
                <p>{line}</p>
              ))}
              <GoToButton
                onClick={() => onButtonClick(currentPost.node)}
                role="link"
              >
                see whole project
              </GoToButton>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Text>
    </Wrapper>
  )
}

export default SessionInfo
