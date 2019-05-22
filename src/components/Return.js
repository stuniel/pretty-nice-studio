import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { getConfig, isTablet } from '../config.js'

const SECONDARY_COLOR = '#bcbcbc'

const ButtonsWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  white-space: nowrap;
`

const Button = styled.div`
  text-transform: uppercase;
`

const StyledLink = styled(Link)`
  font-family: Amiko, sans-serif;
  font-size: 0.7em;
  letter-spacing: 0.6em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  cursor: pointer;
  color: ${ props => props.theme === 'light' ? '#fff' : 'inherit' };
  transition: all 0.4s;

  @media (-moz-touch-enabled: 0), (pointer: fine) {
    &:hover {
      color: ${ SECONDARY_COLOR };
    }
  }
`

function Return ({ media, theme }) {
  const config = getConfig(media, '/sessions')
  const buttonsWrapperStyle = {
    ...config.sessions.buttons.wrapper.getPosition()
  }

  if (isTablet(media)) return null

  return (
    <ButtonsWrapper style={buttonsWrapperStyle}>
      <ButtonWrapper>
        <Button>
          <StyledLink theme={theme} to='/'>
            return
          </StyledLink>
        </Button>
      </ButtonWrapper>
    </ButtonsWrapper>
  )
}

export default Return
