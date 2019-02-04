import React from 'react'
import styled from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import Instagram from '../img/svg/instagram.svg'
import Facebook from '../img/svg/facebook.svg'
import Behance from '../img/svg/behance.svg'

const SECONDARY_COLOR = '#bcbcbc'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${ props => props.width || '100%' };

  & > a {
    cursor: pointer;
    height: 24px;

    & > svg {
      fill: #000;
      transition: fill 0.4s;
    }

    &:hover {
      & > svg {
        fill: ${ SECONDARY_COLOR };
      }
    }
  }
`

const iconStyle = {
  height: '24px',
  width: '24px',
  transform: 'scaleY(-1)',
}

const Icons = ({ width }) => (
  <Wrapper width={width}>
    <OutboundLink
      href="http://www.instagram.com/prettynicestudio"
      rel="noopener"
      target="_blank"
    >
      <Instagram style={iconStyle} />
    </OutboundLink>
    <OutboundLink
      href="http://www.facebook.com/prettynicestudio"
      rel="noopener"
      target="_blank"
    >
      <Facebook style={iconStyle} />
    </OutboundLink>
    <OutboundLink
      href="http://www.behance.com/prettynicestudio"
      rel="noopener"
      target="_blank"
    >
      <Behance style={iconStyle} />
    </OutboundLink>
  </Wrapper>
)

export default Icons
