import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Media from '../components/Media'
import Transition from '../components/Transition'

import { getConfig, isLaptop, isTablet } from '../config.js'

import 'typeface-amiko'
import 'typeface-amiri'
import 'typeface-scheherazade'

import './all.sass'
import { GlobalStyle } from '../theme/globalStyle'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  
  & > div {
    height: 100%;
    width: 100%;

    & > div {
      height: 100%;
      width: 100%;
    }
  }
`

const ChildWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`

const LayoutWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const Text = styled.div`
  position: fixed;
  font-family: Amiko, sans-serif;
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 0.5em;
  word-spacing: 0.7em;
  transform: rotate(-90deg);
  transform-origin: ${ props => props.isLaptop && props.isHome
    ? '0 0'
    : '100% 0'
};
  z-index: 10;
  white-space: nowrap;
`

class TemplateWrapper extends React.PureComponent {
  renderContent = () => {
    const { children, location, media } = this.props
    const { pathname } = location

    const isHome = pathname === '/'
    const isMediaReady = !!media.height && !!media.width && !!media.ratio

    const config = getConfig(media, pathname)

    const textStyle = {
      ...config.layout.text.getPosition(isHome)
    }

    if (!isMediaReady) return null

    return (
      <React.Fragment>
        <LayoutWrapper>
          <Navbar pathname={location && location.pathname} />
          {!isTablet(media) && (
            <Text
              style={textStyle}
              isLaptop={isLaptop(media)}
              isHome={isHome}
            >
              Fashion & beauty retouch
            </Text>
          )}
          <Footer pathname={location && location.pathname} />
        </LayoutWrapper>
        <Wrapper>
          <Transition location={location}>
            <ChildWrapper>{children}</ChildWrapper>
          </Transition>
        </Wrapper>
      </React.Fragment>
    )
  }

  // <head> tags live in src/layouts/Base.astro.
  render () {
    return (
      <Media>
        <Container>
          <GlobalStyle />
          {this.renderContent()}
        </Container>
      </Media>
    )
  }
}

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateWrapper)
