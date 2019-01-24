import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fill } from 'lodash'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const SECONDARY_COLOR = '#bcbcbc'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  
  & > div:first-child {
    margin-top: 0;
  }
  
  & > div:last-child {
    margin-bottom: 0;
  }
  ${'' /* background: #efefef; */}
`

const Dot = styled.div`
  height: ${props => props.active ? '8px' : '4px'};
  width: ${props => props.active ? '8px' : '4px'};
  border: 1px solid #000;
  border-radius: 50%;
  margin: 20px;
  background: #000;
  transition: all 0.3s;
`

function createDots(length, part) {
  return fill(Array(length).fill(false), true, part, part + 1)
}

const Progress = ({ length, part }) => {
  const progress = part / (length - 1)
  const dots = createDots(length, part)
  
  return (
    <Wrapper>
      {
        dots.map(active => (
          <Dot active={active} />
        ))
      }
    </Wrapper>
  )
}
// 
// const Wrapper = styled.div`
//   position: relative;
//   height: 100%;
//   width: 2px;
//   ${'' /* background: #efefef; */}
// `
// 
// const ProgressBar = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: ${props => props.progress * 100 + '%'};
//   background: #000;
//   transition: height 0.6s;
// `
// 
// const Progress = ({ length, part }) => {
//   const progress = part / (length - 1)
// 
//   return (
//     <Wrapper>
//       <ProgressBar progress={progress} />
//     </Wrapper>
//   )
// }

export default Progress
