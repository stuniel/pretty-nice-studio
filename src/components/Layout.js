import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import csx from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
import { Provider } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Footer from '../components/Footer'
import Media from '../components/Media'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import UnderConstruction from '../components/UnderConstruction'
import './all.sass'

import { store } from '../state/index'

const UNDER_CONSTRUCTION = false

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
`

const ChildWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
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
      transition: all ${ props => props.exit }ms;
      transition-delay: ${ props => props.enter }ms;
    }

    .content-exit {
      transition: all ${ props => props.exit }ms;
      position: absolute;
      top: 0;
      opacity: 1;
    }

    .content-exit-active {
      transition-delay: ${ props => props.enter }ms;
      opacity: 0;
    }
  }
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
    }, 2000)
  }

  componentWillUnmount () {
    this.setState({ mounted: false })
  }

  render () {
    const { children, location } = this.props
    const { mounted } = this.state

    const containerClassName = csx({ 'preload': !mounted })

    // Fix this to check env variable process.env.UNDER_CONSTRUCTION === 'true' instead
    if (UNDER_CONSTRUCTION) {
      return <UnderConstruction />
    }


    return (
      <Provider store={store}>
        <Media>
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
              <Container className={containerClassName}>
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
                    <Navbar pathname={location && location.pathname} />
                    <Wrapper>
                      <ContentTransitionGroup
                        className="content-wrapper"
                        exit={600}
                        enter={600}
                      >
                        <CSSTransition
                          timeout={{ enter: 600, exit: 600 }}
                          classNames="content"
                          key={location.pathname}
                        >
                          <ChildWrapper>{children}</ChildWrapper>
                        </CSSTransition>
                      </ContentTransitionGroup>
                    </Wrapper>
                    <Footer pathname={location && location.pathname} />
                  </React.Fragment>
                ) : (
                  <Loader />
                )}
              </Container>
            )}
          />
        </Media>
      </Provider>
    )
  }
}

export default TemplateWrapper
