import React from 'react'
import styled from 'styled-components'

import { getConfig } from '../config.js'

const SECONDARY_COLOR = '#bcbcbc'

const Arrow = styled.span`
  height: 40px;
  width: 40px;
  background: #000;
  cursor: pointer;
  transition: background 0.4s;

  &:hover {
    background: ${ SECONDARY_COLOR };
  }
`

const ArrowLeft = styled(Arrow)`
  clip-path: polygon(50% 5%, 0% 50%, 50% 95%, 50% 80%, 17% 50%, 50% 20%);
`
const ArrowRight = styled(Arrow)`
  clip-path: polygon(50% 5%, 100% 50%, 50% 95%, 50% 80%, 83% 50%, 50% 20%);
`

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Arrows = ({
  onLeftClick,
  onRightClick,
  media,
  pathname,
}) => {
  const config = getConfig(media, pathname)

  const arrowsStyle = {
    ...config.index.arrows.getPosition(),
  }
  return (
    <Wrapper style={arrowsStyle}>
      <ArrowLeft onClick={onLeftClick} />
      <ArrowRight onClick={onRightClick} />
    </Wrapper>
  )
}

export default Arrows
