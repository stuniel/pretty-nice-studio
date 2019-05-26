import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

import {
  getPadding,
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
  justify-content: ${ props => props.flexStart ? 'flex-start' : 'flex-end' };
  align-items: center;
  width: 100%;
  z-index: 10;
  transition: ${ props => `all ${ props.timeout }ms` };
  transition-delay: ${ props => `${ props.timeout / 2 }ms` };
  
  bottom: 0;
  left: 10vh;
  height: ${ props => props.paddingVertical }px;
  width: ${ props => props.isHome
    ? `calc(${ firstSliderWidth(props.ratio) })`
    : 'calc(100vw - 20vh)' };

  ${ props => props.isTablet && `
    left: 0;
    width: 100%;
    padding: 0 calc(6.66vw *
      ${ ((1 + (props.ratio - RATIO_SMALL) * 1.5) / 2) });
    background-color: ${ props.cover && '#fff' };
  ` }

  ${ props => props.isMobile && `
    left: 0;
    padding: 0 6.66vw;
  ` }
`

const Contact = styled.span`
  position: absolute;
  left: 0;
  color: inherit;
  font-family: Amiri, serif;
  font-size: 0.9em;
  letter-spacing: 0.3em;
  ${ props => props.isTablet && 'margin-left: 6.66vw;' }
`

const Footer = ({ iconsColor, media, pathname, transitions: { menuOpen, timeout } }) => {
  const { ratio, width } = media
  const { paddingVertical } = getPadding(media)
  const isSessions = pathname.includes('sessions')
  const isAboutOrContact = pathname.includes('about') || pathname.includes('contact')
  const isHome = pathname === '/'
  const isLeft = isTablet(media) && !menuOpen && isHome
  const iconsMargin = isTablet(media) ? '6.66vw' : 0

  return (
    <Wrapper
      between={menuOpen}
      cover={isAboutOrContact}
      flexStart={isTablet(media) && !isAboutOrContact && !isSessions}
      isHome={pathname === '/' && !menuOpen}
      isMobile={isMobile(media)}
      isTablet={isTablet(media)}
      isLaptop={isLaptop(media)}
      paddingVertical={paddingVertical}
      ratio={ratio}
      timeout={timeout}
    >
      {!isMobile(media) && (
        <Transition
          in={menuOpen}
          timeout={timeout}
        >
          {state => {
            const style = formatContactStyle(state, timeout)

            return (
              <Contact style={style} isTablet={isTablet(media)}>contact@prettynicestudio.com</Contact>
            )
          }}
        </Transition>
      )}
      <Icons
        iconsColor={isTablet(media) && isSessions && !menuOpen && iconsColor}
        isMobile={isMobile(media)}
        width={isMobile(media) ? '120px' : '165px'}
        isLeft={true}
        style={{
          position: 'absolute',
          left: isLeft ? 0 : '100%',
          transform: isLeft
            ? `translateX(${ iconsMargin })`
            : `translateX(-100%) translateX(-${ iconsMargin })`,
          transition: `left ${ timeout }ms, transform ${ timeout }ms`
        }}
      />
    </Wrapper>
  )
}

const mapStateToProps = ({
  color: {
    icons: iconsColor
  },
  media,
  transitions
}) => {
  return { iconsColor, media, transitions }
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
