import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getConfig } from '../config.js'

import Icons from '../components/Icons'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const Footer = ({ media, pathname }) => {
  const config = getConfig(media, pathname)

  const wrapperStyle = {
    ...config.footer.wrapper.getPosition()
  }

  return (
    <Wrapper style={wrapperStyle}>
      <Icons width='165px' />
    </Wrapper>
  )
}

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
