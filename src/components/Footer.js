import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { config } from '../config.js'

import Icons from '../components/Icons'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
`

const Footer = ({ media }) => {
  const wrapperStyle = {
    ...config.footer.wrapper.getPosition(media)
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

const mapDispatchToProps = () => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
