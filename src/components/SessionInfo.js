import React from 'react'
import styled from 'styled-components'
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'

import { getConfig } from '../config.js'

import Button from '../components/Button'

const PostNumber = styled.div`
  font-family: 'Cardo', serif;
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

const Text = styled.div`
  position: absolute;
  width: 80%;
  font-size: 1.15em;
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
              <Button
                onClick={() => onButtonClick(currentPost.node)}
                role="link"
              >
                see whole project
              </Button>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Text>
    </Wrapper>
  )
}

export default SessionInfo
