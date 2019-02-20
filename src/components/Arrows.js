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
  background-color: #000;
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
    background-color: #000;
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
  background-color: #000;
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
    background-color: #000;
    width: 120%;
    height: 8%;
    display: block;
    float: right;
    border-radius: 6px;
    z-index: -1;
  }
}
  &:hover {
    .right-bar, .left-bar {
      background: ${ SECONDARY_COLOR };
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
// const ArrowRight = styled(Arrow)`
//   clip-path: polygon(50% 5%, 100% 50%, 50% 95%, 50% 80%, 83% 50%, 50% 20%);
// `

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
