import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { getConfig } from '../../config.js'

import BackgroundImage from '../../components/BackgroundImage'

const SECONDARY_COLOR = '#bcbcbc'

const Section = styled.section`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`

const ImageWrapper = styled(BackgroundImage)`
  position: absolute;
  width: 50%;
`

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 50%;
  left: 50%;
  overflow-y: scroll;
`

const Content = styled.div`
  position: absolute;
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

const Index = ({ data, media }) => {
  const { height, ratio } = media
  const config = getConfig(media)

  const imageWrapperStyle = {
    height,
  }

  const contentWrapperStyle = {
    ...config.contact.content.wrapper.getPosition(),
  }

  const contentStyle = {
    ...config.contact.content.getPosition()
  }

  return (
    <Section>
      {ratio >= 1 && (
        <ImageWrapper
          fadeIn
          fluid={data.images.photos[0].photo.childImageSharp.fluid}
          style={imageWrapperStyle}
        />
      )}
      <ContentWrapper style={contentWrapperStyle}>
        <Content style={contentStyle}>
          <section>
            <h2>Get in touch</h2>
            <p>
              Let's create some pretty nice pictures! Contact us to discuss your project!
            </p>
            <p>
              <strong>Email: </strong>
              <a href="mailto:contact@prettynicestudio.com">
                contact@prettynicestudio.com
              </a>
            </p>
          </section>
          <section>
            <h2>About us</h2>
            <p>
              We are retouching studio based in Poland, working worldwide. Specializing in high-end beauty and fashion retouch for photographers, creatives and fashion brands from all over the world.
            </p>
            <p>
              Whether you’re a hobbyist, professional or a big agency you’re always be provided with the best results. Our experience, keen eye for details and love for perfection is a guarantee that you’ll be amazed with the final look of your pictures.
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

export const pageQuery = graphql`
  query BackgroundImage {
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "sessions" }
        relativePath: { regex: "/Wozniak/big/2.jpg/" }
      }
    ) {
      photos: edges {
        photo: node {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
          relativePath
        }
      }
    }
  }
`
