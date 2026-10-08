import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { connect } from 'react-redux'

const propTypes = {
  children: PropTypes.node.isRequired
}

class Media extends React.Component {
  constructor (props) {
    super(props)

    this.handleResize = debounce(this.handleResize, 100)
  }
  componentDidMount () {
    if (typeof window !== 'object') return

    this.targetWindow = window

    this.targetWindow.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount () {
    this.targetWindow.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const { setMedia } = this.props

    const height = this.targetWindow.innerHeight
    const width = this.targetWindow.innerWidth
    const ratio = width / height

    setMedia({
      height,
      width,
      ratio,
    })
    this.forceUpdate()
  }

  render () {
    const { children } = this.props

    return children
  }
}

Media.propTypes = propTypes

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => {
  return {
    setMedia: ({ width, height, ratio }) =>
      dispatch({ type: 'SET_MEDIA', width, height, ratio }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media)
