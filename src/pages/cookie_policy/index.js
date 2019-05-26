import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getPadding } from '../../config.js'

const SECONDARY_COLOR = '#bcbcbc'

const Section = styled.section`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  padding: ${ props => props.paddingVertical }px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { 
    display: none;
  }
`

const Content = styled.div`
  position: absolute;
  top: ${ props => props.paddingVertical }px;
  padding: ${ props => props.paddingVertical }px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding-bottom: ${ props => props.paddingVertical }px;
  
  & > section {
    margin-bottom: 60px;
    
    p {
      margin-bottom: 30px;
    }
    
    h2 {
      margin-bottom: 15px;
    }
    
    a {
      display: block;
      color: ${ SECONDARY_COLOR };
      text-decoration: underline;
    }
  }
  
  & > section:last-child {
    margin-bottom: 0;
  }
`

const Index = ({ media }) => {
  const { paddingVertical } = getPadding(media)

  return (
    <Section>
      <ContentWrapper paddingVertical={paddingVertical}>
        <Content paddingVertical={paddingVertical}>
          <section>
            <h2>What Are Cookies</h2>
            <p>
              As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
              <br />
              <br />
              For more general information on cookies see the Wikipedia article on HTTP Cookies.
            </p>
            <h2>How We Use Cookies</h2>
            <p>
              We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
            </p>
            <h2>Disabling Cookies</h2>
            <p>
              You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.
            </p>
            <h2>Third Party Cookies</h2>
            <p>
              We use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
              <br />
              <br />
              This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
              <br />
              <br />
              For more information on Google Analytics cookies, see the official Google Analytics page.
            </p>
          </section>
        </Content>
      </ContentWrapper>
    </Section>
  )
}

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = () => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
