import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  height: ${ props => `${ props.size }px` };
  width: ${ props => `${ props.size * 0.6 }px` };
  border-radius: ${ props => `${ props.size }px` };
  border: ${ props => `${ props.size / 22 }px solid ${ props.color }` };
  position: relative;

    &:before {
      content: '';
      position: absolute;
      left: ${ props => `calc(50% - ${ props.size / 16 }px)` };
      top: ${ props => `${ props.size / 6 }px` };
      height: ${ props => `${ props.size / 8 }px` };
      width: ${ props => `${ props.size / 8 }px` };
      background: ${ props => props.color };
      border-radius: 50%;
      animation: scroll 2400ms infinite;
    }
  }

  @keyframes scroll {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
      transform: translateY(0);
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: ${ props => `translateY(${ props.size / 2 }px)` };
    }
  }
`

const ScrollIcon = ({ size, color }) => {
  return (
    <Icon size={size} color={color} />
  )
}

export default ScrollIcon
