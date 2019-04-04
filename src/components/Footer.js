import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

import {
  firstSliderWidth,
  isMobile,
  isTablet,
  isLaptop,
  RATIO_SMALL
} from '../config.js'
import { formatContactStyle } from '../formatters/style'
import Icons from '../components/Icons'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  z-index: 10;
  transition: ${ props => `all ${ props.timeout }ms` };
  transition-delay: ${ props => `${ props.timeout / 2 }ms` };
  
  top: 90vh;
  left: 10vh;
  height: 10vh;
  width: ${ props => props.isHome
    ? (props.isLaptop ? 165 : `calc(${ firstSliderWidth(props.ratio) })`)
    : 'calc(100vw - 20vh)' };)
    
  ${ props => props.isTablet && `
    left: 0;
    padding: 0 calc(6.66vw *
      ${ ((1 + (props.ratio - RATIO_SMALL) * 1.5) / 2) });
    background-color: #fff;
  ` }

  ${ props => props.isMobile && `
    left: 0;
    padding: 0 6.66vw;
  ` }
`

const Contact = styled.span`
  position: absolute;
  left: 0;
  color: #000;
  font-family: Amiri, serif;
  font-size: 0.9em;
  letter-spacing: 0.3em;
`

const Footer = ({ media, pathname, transitions: { menuOpen, timeout } }) => {
  const { ratio } = media

  return (
    <Wrapper
      between={menuOpen}
      isHome={pathname === '/' && !menuOpen}
      isMobile={isMobile(media)}
      isTablet={isTablet(media)}
      isLaptop={isLaptop(media)}
      ratio={ratio}
      timeout={timeout}
    >
      {!isTablet(media) && (
        <Transition
          in={menuOpen}
          timeout={timeout}
        >
          {state => {
            const style = formatContactStyle(state, timeout)

            return (
              <Contact style={style}>contact@prettynicestudio.com</Contact>
            )
          }}
        </Transition>
      )}
      <Icons width='165px' />
    </Wrapper>
  )
}

const mapStateToProps = ({ media, transitions }) => {
  return { media, transitions }
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
