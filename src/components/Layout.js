import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { StaticQuery, graphql } from 'gatsby'

import Cookies, { getCookiesState } from '../components/Cookies'
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
    const { cookies, children, location, media } = this.props
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
          { !(cookies || getCookiesState()) && (
            <Cookies />
          )}
        </LayoutWrapper>
        <Wrapper>
          <Transition location={location}>
            <ChildWrapper>{children}</ChildWrapper>
          </Transition>
        </Wrapper>
      </React.Fragment>
    )
  }

  render () {
    const { location } = this.props

    return (
      <StaticQuery
        query={graphql`
            query HeadingQuery {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                }
              }
            }
          `}
        render={data => {
          const seo = {
            url: `${ data.site.siteMetadata.siteUrl }${ location.pathname || '/' }`,
            image: `${ data.site.siteMetadata.siteUrl }/img/og-image.jpg`,
          }

          return (
            <Media>
              <Container>
                <GlobalStyle />
                <Helmet>
                  <title>{data.site.siteMetadata.title}</title>
                  <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                  />

                  <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/img/apple-touch-icon.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    href="/img/favicon-32x32.png"
                    sizes="32x32"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    href="/img/favicon-16x16.png"
                    sizes="16x16"
                  />

                  <link
                    rel="mask-icon"
                    href="/img/safari-pinned-tab.svg"
                    color="#ff4400"
                  />
                  <meta name="theme-color" content="#fff" />
                  <meta property="og:type" content="website" />
                  <meta
                    property="og:site_name"
                    content="pretty nice studio"
                  />
                  <meta
                    property="og:title"
                    content={data.site.siteMetadata.title}
                  />
                  <meta
                    property="og:url"
                    content={seo.url}
                  />
                  <meta property="og:image" content={seo.image} />
                  <meta property="og:image:width" content="1053" />
                  <meta property="og:image:height" content="553" />
                  <meta name="viewport" content="initial-scale=1" />
                  <meta
                    name="msvalidate.01"
                    content="01B361A2AF25835C28320BF8F7714338"
                  />
                  <meta
                    name="p:domain_verify"
                    content="121103766a130ac87c9b08bff5f56608"
                  />
                </Helmet>
                {this.renderContent()}
              </Container>
            </Media>
          )
        }}
      />
    )
  }
}

const mapStateToProps = ({ cookies, media }) => {
  return { cookies, media }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateWrapper)
