import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { connect } from 'react-redux'

const SECONDARY_COLOR = '#bcbcbc'

export const COOKIES_STORAGE_KEY = 'cookies_accepted'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: #eee;
  
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`

const Text = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  p {
    margin-right: 1em;
  }
  
  a {
    text-decoration: none;
    color: #232323;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1em;
    text-align: center;
  }
`

const Button = styled.div`
  padding: 1em;
  font-family: Amiko, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 12px;
  color: #fff;
  background: #232323;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 2em;

  @media (-moz-touch-enabled: 0), (pointer: fine) {
    :hover {
      color: ${ SECONDARY_COLOR };
    }
  }
`

export function getCookiesState () {
  if (typeof window !== 'object') return

  const storage = window.localStorage

  const storageData = JSON.parse(storage.getItem(COOKIES_STORAGE_KEY))

  return storageData && storageData.state
}

export function setCookiesState (state) {
  if (typeof window !== 'object') return

  const storage = window.localStorage

  let storageData = JSON.parse(storage.getItem(COOKIES_STORAGE_KEY))

  if (!storageData) {
    storageData = { state }
  } else {
    storageData.state = state
  }

  storage.setItem(COOKIES_STORAGE_KEY, JSON.stringify(storageData))
}

class Cookies extends React.Component {
  render () {
    const { setCookies } = this.props

    return (
      <Wrapper>
        <Text>
          <p>
            This website uses cookies to ensure you get the best experience on our website.
          </p>
          <Link to='/cookie_policy'>
            <strong>
              Learn more.
            </strong>
          </Link>
        </Text>
        <Button onClick={() => {
          setCookiesState('allowed')
          setCookies(true)
        }}>
          Allow all cookies
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setCookies: allowed => dispatch({ type: 'SET_COOKIES', allowed }),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cookies)
