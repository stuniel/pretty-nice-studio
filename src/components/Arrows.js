import React from 'react'
import styled from 'styled-components'

import { getConfig } from '../config.js'

const SECONDARY_COLOR = '#bcbcbc'

const Arrow = styled.span`
height: 30px;
width: 15px;
display:block;
padding: 5px;
margin: 1em auto;
position: relative;
cursor: pointer;
border-radius: 4px;

.left-bar {
  position: absolute;
  background-color: #232323;
  top: 25%;
  left:-8%;
  width: 120%;
  height: 8%;
  display: block;
  float: right;
  border-radius: 2px;
  transition: all 0.3s ease;
  &:after {
    content:"";
    background-color: #232323;
    width: 120%;
    height: 8%;
    display: block;
    float: right;
    border-radius: 6px;
    z-index: -1;
  }
}

.right-bar {
  position: absolute;
  background-color: #232323;
  top: 65%;
  left:-8%;
  width: 120%;
  height: 8%;
  display: block;
  float: right;
  border-radius: 2px;
  transition: all 0.3s ease;
  &:after {
    content:"";
    background-color: #232323;
    width: 120%;
    height: 8%;
    display: block;
    float: right;
    border-radius: 6px;
    z-index: -1;
  }
}

@media (-moz-touch-enabled: 0), (pointer: fine) {
  :hover {
    .right-bar, .left-bar {
      background: ${ SECONDARY_COLOR };
    }
  }
}
`

const ArrowLeft = styled(Arrow)`
  .left-bar{
    transform: rotate(-45deg);
  }
  
  .right-bar{
    transform: rotate(45deg);
  }
`

const ArrowRight = styled(Arrow)`
  .left-bar{
    transform: rotate(45deg);
  }
  
  .right-bar{
    transform: rotate(-45deg);
  }
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
  style
}) => {
  const config = getConfig(media, pathname)

  const arrowsStyle = {
    ...config.index.arrows.getPosition(),
    ...style
  }
  return (
    <Wrapper style={arrowsStyle}>
      <ArrowLeft onClick={onLeftClick}>
        <div className="left-bar" />
        <div className="right-bar" />
      </ArrowLeft>
      <ArrowRight onClick={onRightClick}>
        <div className="left-bar" />
        <div className="right-bar" />
      </ArrowRight>
    </Wrapper>
  )
}

export default Arrows
