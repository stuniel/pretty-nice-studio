export const RATIO_SMALL = 0.7
export const RATIO_MEDIUM = 1.1
export const RATIO_LARGE = 1.5
export const RATIO_HUGE = 1.6
export const RATIO_SCROLL = 2.2

export const isMobile = ({ ratio = 2 }) => {
  return ratio < RATIO_SMALL
}

export const isTablet = ({ ratio = 2 }) => {
  return ratio < RATIO_MEDIUM
}

export const isLaptop = ({ ratio = 2 }) => {
  return ratio < RATIO_LARGE
}

export const isWide = ({ ratio = 2 }) => {
  return ratio >= RATIO_HUGE
}

export const isScrollable = ({ ratio = 2 }) => {
  return ratio >= RATIO_SCROLL
}

const widthModifier = ratio => (ratio !== null ? ratio / 2 : 2)

export const firstSliderHeight = paddingVertical =>
  `(90vh)`

export const firstSliderWidth = ratio =>
  `(90vh * 0.8 * ${ widthModifier(ratio) })`

export const sliderWidth = isMobile =>
  (isMobile ? `86.68vw` : `(100vw - 20vh)`)
export const sliderHeight = isMobile =>
  (isMobile ? `(86.68vw * 1.25)` : `((100vw - 20vh) * 1.25)`)

export const getPadding = ({ width, height, ratio }, pathname) => {
  let paddingVertical = height / 10
  let paddingHorizontal = width / 15

  if (!isLaptop({ ratio })) {
    paddingVertical = height / 10
    paddingHorizontal = height / 10
  }

  if (isScrollable({ ratio })) {
    paddingVertical = (width / 2.5) / 10
    paddingHorizontal = (width / 2.5) / 10
  }

  return {
    paddingVertical,
    paddingHorizontal
  }
}

const getFooter = ({ height, width, ratio }, paddingVertical) => {
  return {
    height: paddingVertical
  }
}

export const getConfig = (media, pathname) => {
  const { height, width, ratio } = media

  const mobile = isMobile(media)
  const tablet = isTablet(media)
  const laptop = isLaptop(media)

  const { paddingVertical, paddingHorizontal } = getPadding(media, pathname)
  const footer = getFooter(media, paddingVertical)

  const widthModifier = ratio / 2

  const paddingHorizontalMedium = paddingHorizontal * ((1 + (ratio - RATIO_SMALL) * 1.5) / 2)

  const sliderPrimaryHeight = tablet
    ? height - paddingVertical * 2.5
    : height - paddingVertical * 2
  const sliderPrimaryWidth = Math.floor(sliderPrimaryHeight * 0.8)

  const sliderSecondaryHeight = Math.min(
    (width - sliderPrimaryWidth - paddingHorizontalMedium * 2 - paddingHorizontal / 2) * 1.25,
    (height - paddingVertical * 2) * (3 / 4)
  )
  const sliderSecondaryWidth = Math.floor(sliderSecondaryHeight * 0.8)

  const firstSliderHeight = height - paddingVertical
  const firstSliderWidth = Math.floor(firstSliderHeight * 0.8 * widthModifier)

  const secondSliderHeight = height - paddingVertical * 3
  const secondSliderWidth = Math.floor(secondSliderHeight * 0.8 * widthModifier)

  // TODO: Check if isHome: isHome ? height * 0.8 : 0
  const contentMarginLeft = (pathname === '/' || pathname === '/contact' || pathname.includes('/sessions'))
    ? tablet
      ? sliderPrimaryWidth + paddingHorizontal * 2.25
      : laptop
        ? width - sliderSecondaryWidth - paddingHorizontalMedium
        : ratio < RATIO_HUGE
          ? firstSliderWidth
          : firstSliderWidth + paddingHorizontal
    : 0

  let sliderWidth
  let sliderHeight

  if (mobile) {
    sliderWidth = Math.floor(width - (paddingHorizontal * 2))
    sliderHeight = Math.floor(height * 0.8)
    // sliderHeight = Math.floor(sliderWidth * 1.25)
  }

  if (!mobile) {
    sliderWidth = Math.floor(width - (paddingHorizontal * 2))
    sliderHeight = Math.floor(sliderWidth * 1.25)
  }

  return {
    contact: {
      content: {
        getPosition () {
          if (tablet) {
            return {
              width
            }
          }

          return {
            width: width / 4
          }
        },
        wrapper: {
          getPosition () {
            if (mobile) {
              return {
                marginTop: height - sliderHeight - footer.height - paddingVertical,
                height: sliderHeight + footer.height - paddingVertical * 2,
                width: '100%',
                left: 0,
              }
            }

            return {
              padding: paddingVertical,
              width: '50%',
              left: 0,
              top: 0,
            }
          }
        }
      }
    },
    // Moved to styled-components
    //
    // footer: {
    //   wrapper: {
    //     getPosition (menuOpen) {
    //       if (mobile) {
    //         return {
    //           top: height - footer.height,
    //           left: 0,
    //           height: footer.height,
    //           padding: `0 ${ paddingHorizontal }px`,
    //         }
    //       }
    // 
    //       if (tablet) {
    //         return {
    //           top: height - footer.height,
    //           left: 0,
    //           height: footer.height,
    //           padding: `0 ${ paddingHorizontalMedium }px`,
    //         }
    //       }
    // 
    //       if (laptop) {
    //         return {
    //           top: height - paddingVertical,
    //           left: paddingHorizontal,
    //           height: paddingVertical,
    //           width: pathname === '/' && !menuOpen
    //             ? 165
    //             : width - paddingHorizontal * 2
    //         }
    //       }
    // 
    //       return {
    //         top: height - paddingVertical,
    //         left: paddingHorizontal,
    //         height: paddingVertical,
    //         width: pathname === '/' && !menuOpen
    //           ? firstSliderWidth
    //           : width - paddingHorizontal * 2
    //       }
    //     }
    //   },
    // },
    index: {
      arrows: {
        getPosition () {
          if (laptop) {
            return {
              width: paddingHorizontal * 1.5,
              height: paddingVertical,
              bottom: 48,
              left: width - (paddingHorizontal * 1.5) - paddingHorizontalMedium,
              top: height - paddingVertical,
            }
          }

          return {
            height: paddingVertical,
            bottom: 48,
            left: width - paddingHorizontal * 2,
            width: paddingHorizontal,
            top: height - paddingVertical,
          }
        }
      },
      content: {
        getPosition () {
          if (mobile) {
            return {
              top: height - (paddingVertical * 2),
              width: width,
              height: (paddingVertical * 2),
              left: 0,
            }
          }

          return {
            top: paddingVertical,
            width: width - paddingHorizontal * 2 - firstSliderWidth - secondSliderWidth,
            height: height - paddingVertical * 2,
            left: firstSliderWidth + paddingHorizontal,
          }
        },
        sessionInfo: {
          getPosition () {
            return {
              bottom: paddingVertical / 2,
            }
          }
        },
        text: {
          getPosition () {
            return {
              left: paddingHorizontal / 2,
              bottom: 0
            }
          }
        },
        number: {
          getPosition () {
            const fontSize = paddingVertical * 6 * widthModifier

            return {
              fontSize: `${ fontSize }px`,
              lineHeight: `${ fontSize }px`,
              left: -fontSize * 0.22,
              bottom: -paddingVertical - fontSize * 0.132,
            }
          }
        }
      },
      numbers: {
        getPosition () {
          return {
            width: paddingHorizontal,
            height,
            left: 0,
          }
        },
        primary: {
          getPosition () {
            return {
              padding: `${ (paddingVertical - 24) / 2 }px 0`
            }
          }
        }
      },
      sliders: {
        primary () {
          if (mobile) {
            return {
              top: height - sliderHeight - footer.height,
              left: (paddingHorizontal / 2),
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (tablet) {
            return {
              top: paddingVertical * 1.5,
              left: paddingHorizontalMedium,
              width: sliderPrimaryWidth,
              height: sliderPrimaryHeight,
            }
          }

          if (laptop) {
            return {
              top: paddingVertical,
              left: paddingHorizontalMedium,
              width: sliderPrimaryWidth,
              height: sliderPrimaryHeight,
            }
          }

          return {
            top: 0,
            left: paddingHorizontal,
            width: firstSliderWidth,
            height: firstSliderHeight,
          }
        },
        secondary () {
          if (mobile) {
            return {
              top: height - sliderHeight - footer.height,
              left: sliderWidth + paddingHorizontal / 2,
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (tablet) {
            return {
              top: paddingVertical * 1.5,
              left: sliderPrimaryWidth + paddingHorizontal * (1 + (ratio - RATIO_SMALL) * 3),
              width: sliderPrimaryWidth,
              height: sliderPrimaryHeight,
            }
          }

          if (laptop) {
            return {
              top: height - paddingVertical - sliderSecondaryHeight,
              left: width - sliderSecondaryWidth - paddingHorizontalMedium,
              width: sliderSecondaryWidth,
              height: sliderSecondaryHeight,
            }
          }

          return {
            top: paddingVertical * 2,
            left: width - secondSliderWidth - paddingHorizontal,
            width: secondSliderWidth,
            height: secondSliderHeight,
          }
        },
        tercery () {
          return {
            bottom: (height - (sliderPrimaryWidth * 1.25)) / 2,
            left: contentMarginLeft + sliderPrimaryWidth + paddingHorizontal * 0.25,
            width: sliderPrimaryWidth,
            height: sliderPrimaryHeight,
          }
        },
        mask: {
          getPosition () {
            return {
              top: height - sliderHeight - footer.height,
              left: sliderWidth + paddingHorizontal / 2,
              width: paddingHorizontal / 2,
              height: sliderHeight,
            }
          }
        }
      }
    },
    layout: {
      text: {
        getPosition () {
          return {
            top: paddingVertical / 2,
            right: paddingHorizontal,
            height: paddingHorizontal,
            lineHeight: `${ paddingHorizontal }px`
          }
        }
      },
    },
    layouts: {
      getLayout () {
        return [
          {
            type: 0,
            first: {
              top: 0,
              left: (width / 2) - (height * 0.8),
              width: height * 0.8,
              height: height,
            },
            second: {
              top: paddingVertical * 2,
              left: height * 0.8 + paddingHorizontal * 1.5,
              width: (height - paddingVertical * 3) * 0.8,
              height: height - paddingVertical * 3,
            },
          },
          {
            type: 0,
            first: {
              top: 0,
              left: (width / 2) - (height * 0.8),
              width: height * 0.8,
              height: height,
            },
            second: {
              top: paddingVertical,
              left: height * 0.8 + paddingHorizontal * 1.5,
              width: (height - paddingVertical * 2) * 0.8,
              height: height - paddingVertical * 2,
            },
          },
          {
            type: 1,
            first: {
              top: (height - (sliderPrimaryWidth * 1.25)) / 2,
              left: ((width / 2) - sliderPrimaryWidth),
              width: sliderPrimaryWidth,
              height: sliderPrimaryWidth * 1.25,
            },
            second: {
              top: height - sliderPrimaryHeight - ((height - (sliderPrimaryWidth * 1.25)) / 2),
              left: contentMarginLeft,
              width: sliderPrimaryWidth,
              height: sliderPrimaryHeight,
            },
          },
          {
            type: 1,
            first: {
              top: (height - (sliderPrimaryWidth * 1.25)) / 2,
              left: ((width / 2) - sliderPrimaryWidth),
              width: sliderPrimaryWidth,
              height: sliderPrimaryWidth * 1.25,
            },
            second: {
              top: height - (sliderPrimaryWidth + paddingVertical / 2) * 1.25 - ((height - (sliderPrimaryWidth * 1.25)) / 2),
              left: contentMarginLeft,
              width: sliderPrimaryWidth + paddingVertical / 2,
              height: (sliderPrimaryWidth + paddingVertical / 2) * 1.25,
            },
          },
        ]
      }
    },
    navbar: {
      // Moved to styled-componets
      // burger: {
      //   getPosition () {
      //     if (tablet) {
      //       return {
      //         top: paddingHorizontal / 2,
      //         left: paddingHorizontal / 2,
      //       }
      //     }
      //
      //     return {
      //       top: 0,
      //       left: 0,
      //       width: paddingHorizontal,
      //       height: paddingVertical,
      //     }
      //   }
      // },
      // getPosition () {
      //   if (tablet) {
      //     return {
      //       top: 0,
      //       height: height - sliderHeight - footer.height,
      //       left: 0,
      //       maxHeight: height - sliderHeight - footer.height,
      //     }
      //   }
      // 
      //   return {
      //     top: 0,
      //     height: paddingVertical,
      //     maxHeight: paddingVertical,
      //   }
      // },
      links: {
        getPosition (isHome) {
          if (mobile) {
            return {
              width: width - paddingHorizontal * 3,
              height: height / 4,
            }
          }

          if (tablet) {
            return {
              width: width / 2,
              height: height / 4,
            }
          }

          if (laptop) {
            return {
              width: width - paddingVertical * 2,
              maxWidth: 600,
              minWidth: 300,
              padding: 0,
            }
          }

          return {
            width: Math.min(width - paddingHorizontal * 2, paddingHorizontal * 10),
            padding: '50px 0',
          }
        }
      },
      logo: {
        getPosition (menuOpen) {
          if (mobile) {
            return {
              width: width * 0.6 - paddingHorizontal * 2,
              maxWidth: paddingVertical * 4,
            }
          }

          if (tablet) {
            return {
              width: width - paddingHorizontal * 3,
              maxWidth: paddingVertical * 4
            }
          }

          if (laptop && pathname === '/' && !menuOpen) {
            return {
              left: 0,
              width: sliderSecondaryWidth,
              maxWidth: 400,
            }
          }

          return {
            width: 240
          }
        },
        wrapper: {
          getPosition (menuOpen) {
            const wrapperHeight = pathname === '/'
              ? height - sliderHeight - footer.height
              : paddingVertical * 2

            if (mobile) {
              return {
                top: 0,
                height: 'auto',
                width
              }
            }

            if (tablet) {
              return {
                left: 0,
                width: width,
                height: paddingVertical * 1.5
              }
            }

            if (laptop && pathname === '/' && !menuOpen) {
              return {
                left: contentMarginLeft,
                width: sliderSecondaryWidth,
                top: paddingVertical,
                heigh: 'auto',
                alignItems: 'flex-start'

              }
            }

            return {
              left: pathname === '/' && !menuOpen ? paddingHorizontal * 1.5 + firstSliderWidth : 0,
              width: pathname === '/' && !menuOpen ? 240 : width,
              height: paddingVertical,
            }
          }
        }
      },
      // Moved to styled-components
      // navMenu: {
      //   getPosition (isSession) {
      //     if (mobile) {
      //       return {
      //         top: 0,
      //         left: 0,
      //         height,
      //         width,
      //       }
      //     }
      // 
      //     if (tablet) {
      //       return {
      //         top: 0,
      //         left: 0,
      //         height,
      //         width,
      //         alignItems: 'center',
      //       }
      //     }
      // 
      //     return {
      //       top: 0,
      //       left: 0,
      //       height,
      //       width,
      //     }
      //   }
      // }
    },
    sessions: {
      buttons: {
        getPosition () {
          return {
            height: paddingHorizontal,
            lineHeight: `${ paddingHorizontal }px`
          }
        },
        wrapper: {
          getPosition () {
            return {
              top: height,
              left: 0,
              height: paddingHorizontal,
              width: height - paddingHorizontal * 1.5,
              transformOrigin: 'left top',
              transform: 'rotate(-90deg)',
              marginTop: `-${ paddingHorizontal * 0.5 }px`
            }
          }
        }
      },
      small: {
        wrapper: {
          getPosition (isHome) {
            return {
              marginTop: Math.max((height - sliderHeight - footer.height - paddingVertical), paddingVertical * 3),
              height: sliderHeight + footer.height - paddingVertical * 2,
              padding: `0 ${ paddingHorizontal / 2 }px`,
            }
          }
        },
        footer: {
          getPosition () {
            return {
              top: 0,
              left: 0,
              height: (paddingVertical * 4),
            }
          }
        },
      },
      medium: {
        wrapper: {
          getPosition (isHome) {
            return {
              paddingTop: paddingVertical,
              height
            }
          }
        },
        photo: {
          getPosition (index) {
            return {
              width: sliderPrimaryWidth,
              height: sliderPrimaryWidth * 1.25,
              transform: `translateX(${ index % 2 === 0 ? -60 : 60 }%) translateY(${ index % 2 === 0 ? 0 : -33 }%)`
            }
          }
        },
        footer: {
          getPosition () {
            return {
              top: 0,
              left: 0,
              height: (paddingVertical * 4),
            }
          }
        },
      }
    }
  }
}
