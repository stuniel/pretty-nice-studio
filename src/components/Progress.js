import React from 'react'
import styled from 'styled-components'
import { fill } from 'lodash'

const Wrapper = styled.div`
  position: relative;
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
`

const Dot = styled.div`
  height: ${ props => props.active ? '8px' : '4px' };
  width: ${ props => props.active ? '8px' : '4px' };
  border: 1px solid #000;
  border-radius: 50%;
  margin: 20px 0;
  background: #000;
  transition: all 0.3s;
`

function createDots (length, part) {
  return fill(Array(length).fill(false), true, part, part + 1)
}

const Progress = ({ length, part }) => {
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

export default Progress
