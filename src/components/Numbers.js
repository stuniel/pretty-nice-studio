import React from 'react'
import styled from 'styled-components'
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'
import { indexOf } from 'lodash'

import { getConfig } from '../config.js'

const SECONDARY_COLOR = '#bcbcbc'

const Line = styled.div`
  height: 120px;
  width: 1px;
  margin-top: 36px;
  border-left: 1px solid black;
`

const NumberPrimary = styled.p`
  position: relative;
  font-size: 32px;
  line-height: 32px;
  padding: 44px 0;
`

const NumberSecondary = styled.li`
  position: relative;
  cursor: pointer;
  font-size: 16px;
  line-height: 16px;
  padding: 8px 0;
  color: #000;
  transition: all 0.4s;

  &:hover {
    color: ${ SECONDARY_COLOR };
  }
`

const Pagination = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style: none;
  bottom: 0;
  width: 100%;
`

const Wrapper = styled.div`
  position: absolute;
  font-family: Amiko, serif;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

function createChildFactory (child, props) {
  return React.cloneElement(child, props)
}

function formatNumber (number) {
  if (number < 10) return `0${ number }`
  return number
}

const Numbers = ({
  currentPostIndex,
  direction,
  edges,
  media,
  onNumberClick,
  orderedPosts,
  pathname,
}) => {
  const config = getConfig(media, pathname)

  const numbersStyle = {
    ...config.index.numbers.getPosition()
  }

  const numberPrimaryStyle = {
    ...config.index.numbers.primary.getPosition()
  }

  return (
    <Wrapper style={numbersStyle}>
      <Pagination>
        {orderedPosts.map(post => (
          <NumberSecondary
            onClick={() => onNumberClick(indexOf(edges, post))}
          >
            <TransitionGroup
              childFactory={child =>
                createChildFactory(child, {
                  classNames: `number-secondary-${ direction }`,
                })
              }
              className={`number-secondary-${ direction }`}
              component="span"
            >
              <CSSTransition
                className={`number-secondary-${ direction }-enter`}
                classNames={`number-secondary-${ direction }`}
                key={currentPostIndex}
                timeout={{ enter: 400, exit: 400 }}
              >
                <span>{formatNumber(indexOf(edges, post) + 1)}</span>
              </CSSTransition>
            </TransitionGroup>
          </NumberSecondary>
        ))}
        <Line />
        <NumberPrimary style={numberPrimaryStyle}>
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
        </NumberPrimary>
      </Pagination>
    </Wrapper>
  )
}

export default Numbers
