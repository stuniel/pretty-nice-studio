import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Transition from '../components/transition'
import Navbar from '../components/Navbar'
import './all.sass'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const TemplateWrapper = ({ children, location }) => (
  <Transition location={location}>
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
        <Container>
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
            <meta property="og:title" content={data.site.siteMetadata.title} />
            <meta property="og:url" content="/" />
            <meta property="og:image" content="/img/og-image.jpg" />
          </Helmet>
          <Navbar pathname={location && location.pathname} />
          <Wrapper>
            {children}
          </Wrapper>
        </Container>
      )}
    />
  </Transition>
)

export default TemplateWrapper
