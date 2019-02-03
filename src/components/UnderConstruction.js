import React from 'react'
import styled from 'styled-components'

import Logo from '../img/svg/logo.svg'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  p {
    font-size: 1.2em;
  }
`

const StyledLogo = styled(Logo)`
  width: 300px;
`

const UnderConstruction = () => {
  return (
    <Wrapper>
      <StyledLogo />
      <p>coming soon</p>
    </Wrapper>
  )
}

export default UnderConstruction
