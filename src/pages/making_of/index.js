import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

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
  align-items: center;
  height: 100%;
  width: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { 
    display: none;
  }
`

const Content = styled.div`
  position: absolute;
  text-align: center;
  max-width: 450px;
  
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
  return (
    <Section>
      <ContentWrapper>
        <Content>
          <section>
            <h2>Coming soon</h2>
            <p>
              This part of the site is under construction.
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
