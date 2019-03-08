import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

import { RATIO_MEDIUM, getConfig } from '../config.js'

import Icons from '../components/Icons'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  z-index: 10;
  transition: all 0.6s;
`

const Contact = styled.span`
  position: absolute;
  left: 0;
  font-family: Amiri, serif;
  font-size: 0.8em;
  letter-spacing: 0.3em;
  font-weight: 700;
`

const formatContactStyle = (state, config) => {
  const transitionStyles = {
    entered: {
      transform: 'translateX(0)',
      opacity: 1,
    },
    exited: {
      transform: 'translateX(-200%)',
      opacity: 0,
    },
  }

  return {
    transform: 'transitionX(0)',
    opacity: 1,
    transition: 'all 0.6s ease',
    ...(state === 'entering' && transitionStyles.entered),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exited),
  }
}

const Footer = ({ media, pathname, transitions: { menuOpen } }) => {
  const config = getConfig(media, pathname)
  const { ratio } = media

  const wrapperStyle = {
    ...config.footer.wrapper.getPosition(menuOpen)
  }

  return (
    <Wrapper between={menuOpen} style={wrapperStyle}>
      {ratio > RATIO_MEDIUM && (
        <Transition
          in={menuOpen}
          timeout={0}
        >
          {state => {
            const style = formatContactStyle(state, config)

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
