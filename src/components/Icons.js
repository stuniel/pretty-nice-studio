import React from 'react'
import styled from 'styled-components'

import Instagram from '../img/svg/instagram.svg'
import Facebook from '../img/svg/facebook.svg'
import Behance from '../img/svg/behance.svg'

const SECONDARY_COLOR = '#bcbcbc'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > a {
    margin-right: 20px;
    cursor: pointer;
    height: 24px;

    & > svg {
      fill: #000;
      transition: fill 0.4s;
    }

    &:hover {
      & > svg {
        fill: ${SECONDARY_COLOR};
      }
    }
  }
`

const iconStyle = {
  height: '24px',
  width: '24px',
  transform: 'scaleY(-1)',
}

const Icons = () => (
  <Wrapper>
    <a
      href="http://www.instagram.com/prettynicestudio"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Instagram style={iconStyle} />
    </a>
    <a
      href="http://www.facebook.com/prettynicestudio"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Facebook style={iconStyle} />
    </a>
    <a
      href="http://www.behance.com/prettynicestudio"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Behance style={iconStyle} />
    </a>
  </Wrapper>
)

export default Icons
