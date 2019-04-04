export function formatArrowsStyle (state, timeout) {
  const transitionStyles = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1
    },
    exited: {
      opacity: 0
    },
    exiting: {
      opacity: 0
    }
  }

  return {
    transition: `all ${ timeout }ms ease`,
    ...(state === 'entering' && transitionStyles.entering),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exiting),
  }
}

export function formatNumbersStyle (state, timeout) {
  const transitionStyles = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1
    },
    exited: {
      opacity: 0
    },
    exiting: {
      opacity: 0
    }
  }

  return {
    transition: `all ${ timeout }ms ease`,
    ...(state === 'entering' && transitionStyles.entering),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exiting),
  }
}

// Session info

export function formatSessionInfoStyle (state, timeout) {
  const transitionStyles = {
    entering: {
      transform: `translateY(0)`,
      transitionDelay: `${ timeout * (1 / 2) }ms`,
    },
    entered: {
      transform: 'translateY(0)',
    },
    exited: {
      transform: `translateY(-100vh)`,
    },
    exiting: {
      transform: `translateY(-100vh)`,
    }
  }

  return {
    transition: `all ${ timeout }ms ease`,
    ...(state === 'entering' && transitionStyles.entering),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exiting),
  }
}

// Slider

export function formatSliderPrimaryStyle (state, timeout, config, media) {
  const { index: { sliders } } = config

  const transitionStyles = {
    entering: {
      transform: `translateY(0)`,
    },
    entered: {
      opacity: 1,
      transform: 'transitionY(0)',
    },
    exited: {
      opacity: 0,
      transform: `translateY(-100vh)`,
    },
    exiting: {
      transform: `translateY(-100vh)`,
      transitionDelay: `${ timeout * (1 / 2) }ms`,
    }
  }

  return {
    position: 'absolute',
    transform: 'transitionY(0)',
    transition: `all ${ timeout }ms`,
    ...sliders.primary(media),
    ...(state === 'entering' && transitionStyles.entering),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exiting),
  }
}

export function formatSliderSecondaryStyle (state, timeout, config, media) {
  const { index: { sliders } } = config

  const transitionStyles = {
    entering: {
      transform: `translateY(0)`,
      transitionDelay: `${ timeout * (1 / 3) }ms`,
    },
    entered: {
      opacity: 1,
      transform: 'transitionY(0)',
    },
    exited: {
      opacity: 0,
      transform: `translateY(-100vh)`,
    },
    exiting: {
      transform: `translateY(-100vh)`,
      transitionDelay: `${ timeout * (1 / 3) }ms`,
    }
  }

  return {
    position: 'absolute',
    transform: 'transitionY(0)',
    opacity: 1,
    transition: `all ${ timeout }ms ease`,
    ...sliders.secondary(media),
    ...(state === 'entering' && transitionStyles.entering),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exiting),
  }
}

// Sessions

export function formatPhotoStyle (state, timeout, left) {
  const transitionStyles = {
    entering: {
      transform: `translateX(${ left ? '-' : '' }100vw)`,
      opacity: 1
    },
    entered: {
      transform: 'translateX(0)',
      opacity: 1
    },
    exited: {
      opacity: 0,
      transform: `translateX(${ left ? '-' : '' }100vw)`,
    },
    exiting: {
      opacity: 0,
    },
  }

  return {
    opacity: 0,
    transform: 'transitionX(0)',
    transition: `all ${ timeout }ms ease`,
    ...(state === 'entering' && transitionStyles.entering),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exiting),
  }
}

export function formatSessionButtonsStyle (state, timeout) {
  const transitionStyles = {
    entering: {
      transform: `translateX(-100vh)`,
    },
    entered: {
      transform: 'translateX(0)',
      transitionDelay: `${ timeout }ms`
    },
    exited: {
      transform: `translateX(-100vh)`,
    },
    exiting: {
      transform: `translateX(-100vh)`,
      transitionDelay: `${ timeout }ms`
    },
  }

  return {
    transform: 'transitionX(0)',
    transition: `all ${ timeout }ms ease`,
    ...(state === 'entering' && transitionStyles.entering),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exiting),
  }
}

// Footer

export function formatContactStyle (state, timeout) {
  const transitionStyles = {
    entered: {
      transform: 'translateX(0)',
      opacity: 1,
    },
    exited: {
      transform: 'translateX(-200%)',
      opacity: 0,
    },
  }

  return {
    transform: 'transitionX(0)',
    opacity: 1,
    transition: 'all 0.6s ease',
    ...(state === 'entering' && transitionStyles.entered),
    ...(state === 'entered' && transitionStyles.entered),
    ...(state === 'exited' && transitionStyles.exited),
    ...(state === 'exiting' && transitionStyles.exited),
  }
}
