import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { navigate } from 'gatsby-link'
import { graphql } from 'gatsby'

import { config } from '../../config.js'

import BackgroundImage from '../../components/BackgroundImage'

const SECONDARY_COLOR = '#bcbcbc'

const Section = styled.section`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`

const ImageWrapper = styled(BackgroundImage)`
  position: fixed;
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
      ${'' /* font-family: Amiko, serif;
      text-transform: uppercase; */}
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

function encode (data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render () {
    const { data, media } = this.props
    const { height, ratio } = media

    const imageWrapperStyle = {
      height,
      position: 'absolute'
      // width: height * 0.8,
      // left: 0
    }

    const contentWrapperStyle = {
      ...config.contact.content.wrapper.getPosition(media),
      // height,
      // width: width - (height * 0.8),
      // left: height * 0.8
    }
    
    const contentStyle = {
      ...config.contact.content.getPosition(media)
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
            {/* <form
              name="contact"
              method="post"
              action="/contact/thanks/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
            > */}
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            {/* <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don’t fill this out:{' '}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>
              <div className="field">
                <label className="label" htmlFor={'name'}>
                  Your name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'text'}
                    name={'name'}
                    onChange={this.handleChange}
                    id={'name'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'email'}>
                  Email
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'email'}
                    name={'email'}
                    onChange={this.handleChange}
                    id={'email'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'message'}>
                  Message
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name={'message'}
                    onChange={this.handleChange}
                    id={'message'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <button className="button is-link" type="submit">
                  Send
                </button>
              </div>
            </form> */}
          </Content>
        </ContentWrapper>
      </Section>
    )
  }
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
