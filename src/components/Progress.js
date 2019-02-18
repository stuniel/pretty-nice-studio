import React from 'react'
import styled from 'styled-components'
import { fill } from 'lodash'

const SECONDARY_COLOR = '#bcbcbc'

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
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin: 20px 0;
  background: ${ props => props.active ? '#000' : SECONDARY_COLOR };
  transition: background 0.6s;
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
