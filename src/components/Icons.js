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
    height: ${ props => props.isMobile ? '20px' : '24px' };

    & > svg {
      fill: inherit;
      transition: fill 0.4s;
    }

    &:hover {
      & > svg {
        fill: ${ SECONDARY_COLOR };
      }
    }
  }
`

const getIconStyle = isMobile => ({
  height: isMobile ? '20px' : '24px',
  width: isMobile ? '20px' : '24px',
  transform: 'scaleY(-1)',
})

const Icons = ({ isMobile, width }) => (
  <Wrapper isMobile={isMobile} width={width}>
    <OutboundLink
      aria-label="Instagram"
      href="http://www.instagram.com/prettynicestudio"
      rel="noopener"
      target="_blank"
    >
      <Instagram isMobile={isMobile} style={getIconStyle(isMobile)} />
    </OutboundLink>
    <OutboundLink
      aria-label="Facebook"
      href="http://www.facebook.com/prettynicestudio"
      rel="noopener"
      target="_blank"
    >
      <Facebook isMobile={isMobile} style={getIconStyle(isMobile)} />
    </OutboundLink>
    <OutboundLink
      aria-label="Behance"
      href="http://www.behance.com/prettynicestudio"
      rel="noopener"
      target="_blank"
    >
      <Behance isMobile={isMobile} style={getIconStyle(isMobile)} />
    </OutboundLink>
  </Wrapper>
)

export default Icons
