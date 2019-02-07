import React from 'react'
import styled from 'styled-components'
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'
import { fill, indexOf } from 'lodash'

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

const NumberWrapper = styled.li`
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

const NumberTransitionGroup = styled(TransitionGroup)`
  .number-forward {
    position: relative;
    float: left;
    
    span {
      display: inline-block;
    }
    
    .number-forward-enter {
      transform: translateY(200%);
      transition: all 0.4s;
      opacity: 0;
    }

    .number-forward-enter-active {
      transform: translateY(0);
      opacity: 1;
    }

    .number-forward-exit {
      transition: all 0.4s;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(0);
      opacity: 1;
    }

    .number-forward-exit-active {
      transform: translateY(-200%);
      opacity: 0;
    }
  }

  &.number-backward {
    position: relative;
    float: left;
    
    span {
      display: inline-block;
    }
    
    .number-backward-enter {
      transition: all 0.4s;
      transform: translateY(-200%);
      opacity: 0;
    }

    .number-backward-enter-active {
      transform: translateY(0);
      opacity: 1;
    }

    .number-backward-exit {
      transition: all 0.4s;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(0);
      opacity: 1;
    }

    .number-backward-exit-active {
      transform: translateY(200%);
      opacity: 0;
    }
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

function createNumbers (length, part) {
  return fill(Array(length).fill(false), true, part, part + 1)
}

const ProgressNumbers = ({
  direction,
  length,
  media,
  part,
  onNumberClick,
  pathname,
}) => {
  const config = getConfig(media, pathname)
  const numbers = createNumbers(length, part)

  const numbersStyle = {
    ...config.index.numbers.getPosition()
  }

  return (
    <Wrapper style={numbersStyle}>
      <Pagination>
        {numbers.map((number, index) => (
          <NumberWrapper
            onClick={onNumberClick}
          >
            <NumberTransitionGroup
              childFactory={child =>
                createChildFactory(child, {
                  classNames: `number-${ direction }`,
                })
              }
              className={`number-${ direction }`}
              component="span"
            >
              <CSSTransition
                className={`number-${ direction }-enter`}
                classNames={`number-${ direction }`}
                key={part}
                timeout={{ enter: 400, exit: 400 }}
              >
                <span>{formatNumber(index + 1)}</span>
              </CSSTransition>
            </NumberTransitionGroup>
          </NumberWrapper>
        ))}
        {/* <Line />
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
              key={part}
              timeout={{ enter: 400, exit: 400 }}
            >
              <span>{formatNumber(part + 1)}</span>
            </CSSTransition>
          </TransitionGroup>
        </NumberPrimary> */}
      </Pagination>
    </Wrapper>
  )
}

export default ProgressNumbers
