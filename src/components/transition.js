import React from 'react'
import {
  TransitionGroup,
  Transition as ReactTransition
} from 'react-transition-group'
import { connect } from 'react-redux'

function getEnter (type, timeout, transitionMenu) {
  switch (type) {
  case 'opacity':
    return {
      entering: {
        position: 'absolute',
        opacity: 0
      },
      entered: {
        position: 'absolute',
        transition: `all ${ timeout }ms ease-in-out`,
        opacity: 1
      }
    }
  case 'home':
    return {
      entering: {
        position: 'absolute',
        transform: 'translateY(-100vh)'
      },
      entered: {
        position: 'absolute',
        transform: 'translateY(0)'
      }
    }
  case 'sessions':
    return {
      entering: {
        position: 'absolute',
      },
      entered: {
        transition: `all ${ timeout }ms ease-in-out`,
        transitionDelay: `${ timeout }ms`,
      }
    }
  case 'normal':
    return {
      entering: {
        position: 'absolute',
        opacity: 0
      },
      entered: {
        position: 'absolute',
        opacity: 1
      }
    }
  default:
    return {
      entering: {
        position: 'absolute',
        opacity: 0
      },
      entered: {
        position: 'absolute',
        transitionDelay: `${ transitionMenu }ms`,
        opacity: 1
      }
    }
  }
}

function getExit (type, timeout) {
  switch (type) {
  case 'sessions':
    return {
      exited: {
        position: 'absolute',
        transform: 'translateY(-100vh)'
      },
      exiting: {
        position: 'absolute',
        transition: `all ${ timeout * (2 / 3) }ms ease-in-out`,
        transitionDelay: `${ timeout * (1 / 3) }ms`,
        transform: 'translateY(-100vh)'
      }
    }
  case 'home':
    return {
      exited: {},
      exiting: {}
    }
  case 'opacity':
    return {
      exited: {
        position: 'absolute',
        opacity: 0
      },
      exiting: {
        position: 'absolute',
        transition: `all ${ timeout }ms ease-in-out`,
        opacity: 0
      }
    }
  default:
    return {
      exited: {
        position: 'absolute',
        // opacity: 0
      },
      exiting: {
        position: 'absolute',
        transition: `all ${ timeout }ms ease-in-out`,
        transitionDelay: `${ timeout }ms`,
        // opacity: 0
      }
    }
  }
}

const getTransitionStyles = (enter, exit, transitionMenu) => ({
  home: {
    ...getEnter('home', enter),
    ...getExit('home', exit)
  },
  sessions: {
    ...getEnter('sessions', enter),
    ...getExit('opacity', exit)
  },
  normal: {
    ...getEnter('normal', enter, transitionMenu),
    ...getExit('')
  },
  default: {
    ...getEnter(null, enter, transitionMenu),
    ...getExit('')
  },
})

function pathnameChangedFrom (pathname, props, nextProps, includes) {
  const pathnameChanged =
    props.location.pathname !== nextProps.location.pathname

  const isPathname = includes
    ? props.location.pathname.includes(pathname)
    : props.location.pathname === pathname

  return pathnameChanged && isPathname
}

function pathnameChangedTo (pathname, props, nextProps, includes) {
  const pathnameChanged =
    props.location.pathname !== nextProps.location.pathname

  const isPathname = includes
    ? nextProps.location.pathname.includes(pathname)
    : nextProps.location.pathname === pathname

  return pathnameChanged && isPathname
}

class Transition extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      transitionStyle: this.getTransitionStyle()
    }
  }

  componentDidMount () {
    this.setActiveTransition()
  }

  componentWillReceiveProps (nextProps) {
    const { changeTimeout, toggleTransition, transitionMenu } = this.props

    if (pathnameChangedFrom('/', this.props, nextProps)) {
      setTimeout(() => {
        toggleTransition('home')
      }, transitionMenu)
    }

    if (pathnameChangedFrom('sessions', this.props, nextProps, true)) {
      setTimeout(() => {
        toggleTransition('sessions')
      }, transitionMenu)
    }

    if (pathnameChangedFrom('/about', this.props, nextProps)) {
      setTimeout(() => {
        toggleTransition('about')
      }, transitionMenu)
    }

    if (pathnameChangedFrom('/contact', this.props, nextProps)) {
      setTimeout(() => {
        toggleTransition('contact')
      }, transitionMenu)
    }

    if (pathnameChangedTo('/', this.props, nextProps)) {
      const transitionStyle = 'home'
      changeTimeout(1000)
      setTimeout(() => {
        toggleTransition('home')
      }, transitionMenu + 1000)
      this.setState({ transitionStyle })
      return
    }

    if (pathnameChangedTo('sessions', this.props, nextProps, true)) {
      const transitionStyle = 'sessions'
      changeTimeout(1000)
      setTimeout(() => {
        toggleTransition('sessions')
      }, 1000)
      this.setState({ transitionStyle })
      return
    }

    if (pathnameChangedTo('/about', this.props, nextProps)) {
      const transitionStyle = 'normal'
      changeTimeout(500)
      setTimeout(() => {
        toggleTransition('about')
      }, transitionMenu + 500)
      this.setState({ transitionStyle })
      return
    }

    if (pathnameChangedTo('/contact', this.props, nextProps)) {
      const transitionStyle = 'normal'
      changeTimeout(500)
      setTimeout(() => {
        toggleTransition('contact')
      }, transitionMenu + 500)
      this.setState({ transitionStyle })
      return
    }

    if (nextProps.location.pathname !== '/') {
      const transitionStyle = 'default'
      changeTimeout(transitionMenu)
      this.setState({ transitionStyle })
    }
  }

  formatTimeout = () => {
    const { timeout, transitionMenu } = this.props
    const { transitionStyle } = this.state

    let enter = transitionMenu
    let exit = timeout

    if (transitionStyle === 'default') {
      enter = timeout
      exit = transitionMenu + timeout
    }

    if (transitionStyle === 'home') {
      enter = timeout
      exit = transitionMenu + timeout
    }

    return {
      enter,
      exit
    }
  }

  getTransitionStyle = () => {
    if (this.props.location.pathname === '/') return 'home'
    if (this.props.location.pathname.includes('sessions')) return 'sessions'
    if (
      this.props.location.pathname === '/about' ||
      this.props.location.pathname === '/contact'
    ) return 'normal'

    return 'default'
  }

  setActiveTransition = () => {
    const { changeTimeout, toggleTransition } = this.props

    if (this.props.location.pathname === '/') {
      toggleTransition('home')
      changeTimeout(1000)
    }
    if (this.props.location.pathname.includes('sessions')) {
      toggleTransition('sessions')
      changeTimeout(1000)
    }
    if (this.props.location.pathname === '/about') {
      toggleTransition('about')
      changeTimeout(500)
    }
    if (this.props.location.pathname === '/contact') {
      toggleTransition('contact')
      changeTimeout(500)
    }
  }

  render () {
    const { children, location, transitionMenu } = this.props
    const { transitionStyle } = this.state

    const { enter, exit } = this.formatTimeout()

    return (
      <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter,
            exit,
          }}
        >
          {
            status => (
              <div
                style={{
                  ...getTransitionStyles(
                    enter, exit, transitionMenu
                  )[transitionStyle][status],
                }}
              >
                {children}
              </div>
            )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}

const mapStateToProps = ({ transitions: { timeout, transitionMenu } }) => {
  return { timeout, transitionMenu }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTimeout: value => dispatch({ type: 'CHANGE_TIMEOUT', value }),
    toggleTransition: key => dispatch({ type: 'TOGGLE_TRANSITION', key })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition)
