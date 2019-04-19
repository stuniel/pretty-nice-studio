import React from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import { chunk } from 'lodash'

const directions = {
  forward: 'forward',
  backward: 'backward',
}

const defaultProps = {
  children: [],
  delay: 0,
  direction: directions.forward,
  offset: 0,
  animationTime: 1000,
}

function getIndexInRange (index, length) {
  return index >= 0
    ? index % length
    : (length - (Math.abs(index) % length)) % length
}

function reflow (node) {
  return node.offsetHeight
}

const Carousel = styled.div`
  user-select: none;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateX(0);
  ${'' /* transition-timing-function: ease-out; */}
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  -webkit-transform: translateZ(0);
`

const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Slide = styled.div`
  display: inline-block;
  height: 100%;
  min-width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`

class Slider extends React.PureComponent {
  constructor (props) {
    super()
    this.state = {
      slides: chunk(props.children, 1),
      currentSlide:
        props.value != null
          ? (props.children.length - props.value + props.offset) %
            props.children.length
          : 0,
      transitionDelay: props.delay,
      transitionTime: props.animationTime,
    }

    this.mounted = false
    this.transitionQueue = []

    this.handleForward = this.handleForward.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.change = this.change.bind(this)
    this.go = this.go.bind(this)
    this.goImmediately = this.goImmediately.bind(this)
  }

  componentDidMount () {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted = false
  }

  componentWillReceiveProps (props) {
    if (props.animationTime !== this.props.animationTime) {
      this.setState({
        transitionTime: props.animationTime,
      })
    }

    if (props.delay !== this.props.delay) {
      this.setState({
        transitionDelay: props.delay,
      })
    }

    // Update value if it's controlled & changed
    if (props.value != null && this.props.value !== props.value) {
      const prevValue = getIndexInRange(props.value, props.children.length)
      const value = getIndexInRange(this.props.value, this.props.children.length)
      const difference = Math.abs(prevValue - value)
      console.log({ prevValue, value });

      if (difference !== 1 && difference !== this.props.children.length - 1) {
        this.change(props.value + props.offset, 'backward')
      } else if (props.direction === directions.forward) {
        this.handleForward()
      } else if (props.direction === directions.backward) {
        this.handleBack()
      } else {
        this.change(props.value + props.offset, 'backward')
      }
    }
  }

  change (index, type = 'exact') {
    const { onChange } = this.props

    if (type === 'forward' || type === 'back') {
      return this.go(index, type)
    } else {
      if (onChange) {
        onChange(index)
      }

      // FIXME: GET CLONES IN CASE
      this.setState({
        currentSlide: index,
      })
    }
  }

  go (index, type = 'forward') {
    const { children, onChange } = this.props
    const { currentSlide } = this.state

    let length = children.length

    while (length < 1) {
      length += children.length
    }

    while (index < 0) {
      index = length + index
    }

    let current = currentSlide % length
    let next = index % length

    if (type === 'forward') {
      next = next > current ? next : length + next
    } else {
      current = next > current ? length + current : current
    }

    this.goImmediately(current).then(() => {
      // Do not update state if component has been unmounted meanwhile
      if (!this.mounted) {
        return
      }

      this.setState({ currentSlide: next }, () => {
        if (onChange) {
          onChange(next % length)
        }
      })
    })
  }

  goImmediately (slide) {
    const { currentSlide } = this.state
    const { animationTime, delay } = this.props

    if (slide === currentSlide) {
      return Promise.resolve()
    }

    return new Promise(resolve => {
      this.setState(
        {
          currentSlide: slide,
          transitionTime: 0,
          transitionDelay: 0,
        },
        () => {
          reflow(this.wrapper)

          this.setState(
            {
              transitionTime: animationTime,
              transitionDelay: delay,
            },
            resolve
          )
        }
      )
    })
  }

  handleForward () {
    const { currentSlide } = this.state

    this.change(currentSlide - 1, 'back')
  }

  handleBack () {
    const { currentSlide } = this.state

    this.change(currentSlide + 1, 'forward')
  }

  setRef = node => {
    this.wrapper = findDOMNode(node)
  }

  renderSlides () {
    const { children } = this.props

    const copies = []

    for (let i = 0; i < Math.max(children.length) + 3; i++) {
      copies.push(
        <Slide key={'copy-' + i}>{children[i % children.length]}</Slide>
      )
    }

    const slides = children.map((el, i) => <Slide key={i}>{el}</Slide>)

    return slides.concat(copies)
  }

  render () {
    const { className, width, style } = this.props
    const { currentSlide, transitionDelay, transitionTime } = this.state

    const wrapperStyle = {
      transform: `translateX(-${ currentSlide * 100 }%)`,
      transitionDuration: `${ transitionTime }ms`,
      transitionDelay: `${ transitionDelay }ms`,
    }

    return (
      <Carousel
        className={className}
        style={{ ...style, width }}
      >
        <Content>
          <Wrapper ref={this.setRef} style={wrapperStyle}>
            <Inner>{this.renderSlides()}</Inner>
          </Wrapper>
        </Content>
      </Carousel>
    )
  }
}

Slider.defaultProps = defaultProps

export default Slider
