import React from 'react'
import posed, { PoseGroup } from 'react-pose'

const timeout = 500

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props

    const RoutesContainer = posed.div({
      enter: { opacity: 1, delay: timeout, delayChildren: timeout },
      exit: { opacity: 0, delay: timeout, delayChildren: timeout },
    })

    // To enable page transitions on mount / initial load,
    // use the prop `animateOnMount={true}` on `PoseGroup`.
    return (
      <PoseGroup animateOnMount={true}>
        <RoutesContainer key={location.pathname} style={{ top: 0 }}>
          {children}
        </RoutesContainer>
      </PoseGroup>
    )
  }
}

export default Transition
