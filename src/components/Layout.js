import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import csx from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Footer from '../components/Footer'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Media from '../components/Media'
import Transition from '../components/Transition'
// import UnderConstruction from '../components/UnderConstruction'

import { getConfig, isLaptop } from '../config.js'

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
  width: 100vw;
  height: 100vh;
`

const ChildWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
`

const ContentTransitionGroup = styled(TransitionGroup)`
  &.content-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .content-enter {
      opacity: 0;
    }

    .content-enter-active {
      opacity: 1;
      transition: all ${ props => props.exitTime }ms;
      transition-delay: ${ props => props.enterTime }ms;
    }

    .content-exit {
      transition: all ${ props => props.exitTime }ms;
      position: absolute;
      top: 0;
      opacity: 1;
    }

    .content-exit-active {
      transition-delay: ${ props => props.enterTime }ms;
      opacity: 0;
    }
  }
`

const LayoutWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`

const Text = styled.div`
  position: fixed;
  font-family: Amiko, sans-serif;
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 0.5em;
  word-spacing: 0.7em;
  transform: rotate(-90deg);
  transform-origin: 100% 0;
  z-index: 10;
`

class TemplateWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ mounted: true })
    }, 100)
  }

  componentWillUnmount () {
    this.setState({ mounted: false })
  }

  render () {
    const { children, location, media } = this.props
    const { mounted } = this.state

    const config = getConfig(media, location.pathname)

    const containerClassName = csx({ 'preload': !mounted })

    const textStyle = {
      ...config.layout.text.getPosition()
    }

    // if (process.env.SITE_STATUS !== 'ready') {
    //   return (
    //     <LayoutWrapper}>
    //       <UnderConstruction />
    //     </LayoutWrapper>
    //   )
    // }

    return (
      <StaticQuery
        query={graphql`
            query HeadingQuery {
              site {
                siteMetadata {
                  title
                  description
                }
              }
            }
          `}
        render={data => (
          <Media>
            <Container className={containerClassName}>
              <GlobalStyle />
              <Helmet>
                <html lang="en" />
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

                <meta property="og:type" content="business.business" />
                <meta
                  property="og:title"
                  content={data.site.siteMetadata.title}
                />
                <meta property="og:url" content="/" />
                <meta property="og:image" content="/img/og-image.jpg" />
              </Helmet>
              {mounted ? (
                <React.Fragment>
                  <LayoutWrapper>
                    <Navbar pathname={location && location.pathname} />
                    {!isLaptop(media) && (
                      <Text style={textStyle}>
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
              ) : (
                <LayoutWrapper>
                  <Loader />
                </LayoutWrapper>
              )}
            </Container>
          </Media>
        )}
      />
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
