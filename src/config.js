export const RATIO_SMALL = 0.7
export const RATIO_MEDIUM = 1.1
export const RATIO_LARGE = 1.5
export const RATIO_HUGE = 1.6

export const getPadding = ({ width, height, ratio }, pathname) => {
  let paddingVertical = height / 10
  let paddingHorizontal = width / 15

  // if (width < 900) {
  //   paddingVertical = 60
  //   paddingHorizontal = 60
  // }
  // 
  // if (width < 600) {
  //   paddingVertical = 30
  //   paddingHorizontal = 30
  // }

  // if (ratio >= 2) {
  //   if (!pathname.includes('sessions')) {
  //     paddingVertical = Math.min(120 * (ratio / 2) * 0.66 * ((width - 1280) / 1280 + 1), 240)
  //   }
  //   paddingHorizontal = Math.min(120 * (ratio / 2) * ((width - 1280) / 1280 + 1), 240)
  // }
  if (ratio >= RATIO_LARGE) {
    paddingVertical = height * 0.15
    paddingHorizontal = height * 0.15
    // if (!pathname.includes('sessions')) {
    //   paddingVertical = Math.min(120 * (ratio / 2) * 0.66 * ((width - 1280) / 1280 + 1), 240)
    // }
    // paddingHorizontal = Math.min(120 * (ratio / 2) * ((width - 1280) / 1280 + 1), 240)
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

  const { paddingVertical, paddingHorizontal } = getPadding(media, pathname)
  const footer = getFooter(media, paddingVertical)

  const paddingHorizontalMedium = paddingHorizontal * ((1 + (ratio - RATIO_SMALL) * 1.5) / 2)

  const sliderPrimaryHeight = ratio < RATIO_MEDIUM
    ? height - paddingVertical * 2.5
    : height - paddingVertical * 2
  const sliderPrimaryWidth = Math.floor(sliderPrimaryHeight * 0.8)

  const sliderSecondaryHeight = Math.min(
    (width - sliderPrimaryWidth - paddingHorizontalMedium * 2 - paddingHorizontal / 2) * 1.25,
    (height - paddingVertical * 2) * (3 / 4)
  )
  const sliderSecondaryWidth = Math.floor(sliderSecondaryHeight * 0.8)

  const firstSliderHeight = height
  const firstSliderWidth = Math.floor(firstSliderHeight * 0.8)

  // const fits = (height * 0.8 + paddingHorizontal) <= (width / 2)

  // TODO: Check if isHome: isHome ? height * 0.8 : 0
  const contentMarginLeft = (pathname === '/' || pathname === '/contact' || pathname.includes('/sessions'))
    ? ratio < RATIO_MEDIUM
      ? sliderPrimaryWidth + paddingHorizontal * 2.25
      : ratio < RATIO_LARGE
        ? width - sliderSecondaryWidth - paddingHorizontalMedium
        : ratio < RATIO_HUGE
          ? firstSliderWidth
          : firstSliderWidth + paddingHorizontal
    : 0

  let sliderWidth
  let sliderHeight

  if (ratio < RATIO_SMALL) {
    sliderWidth = Math.floor(width - (paddingHorizontal * 2))
    sliderHeight = Math.floor(sliderWidth * 1.25)
  }

  if (ratio >= RATIO_SMALL) {
    sliderWidth = Math.floor(width - (paddingHorizontal * 2))
    sliderHeight = Math.floor(sliderWidth * 1.25)
    // sliderWidth = Math.floor(sliderWidth * (RATIO_SMALL / ratio))
    // sliderHeight = Math.floor(sliderHeight * (RATIO_SMALL / ratio))
  }

  return {
    contact: {
      content: {
        getPosition () {
          if (ratio < RATIO_MEDIUM) {
            return {
              top: 0,
              padding: `0 ${ paddingHorizontal * 1.5 }px`,
            }
          }
        },
        wrapper: {
          getPosition () {
            if (ratio < RATIO_SMALL) {
              return {
                marginTop: height - sliderHeight - footer.height - paddingVertical,
                height: sliderHeight + footer.height - paddingVertical * 2,
                width: '100%',
                left: 0,
              }
            }

            return {
              marginTop: paddingVertical / 2,
              width: '50%',
              left: contentMarginLeft + paddingHorizontal * 0.5,
              top: 0,
            }
          }
        }
      }
    },
    footer: {
      wrapper: {
        getPosition () {
          if (ratio < RATIO_SMALL) {
            return {
              top: height - footer.height,
              left: 0,
              height: footer.height,
              // minHeight: paddingVertical * 2,
              padding: `0 ${ paddingHorizontal / 2 }px`
            }
          }

          if (ratio < RATIO_MEDIUM) {
            return {
              top: height - footer.height,
              left: 0,
              height: footer.height,
              padding: `0 ${ paddingHorizontalMedium }px`
            }
          }

          if (ratio < RATIO_LARGE) {
            return {
              top: height - paddingVertical,
              left: paddingHorizontalMedium,
              height: paddingVertical,
              width: width - (height * 0.8 + paddingHorizontal * 2.5)
            }
          }

          return {
            top: height - paddingVertical,
            left: contentMarginLeft,
            height: paddingVertical,
            padding: `0 ${ paddingHorizontal / 2 }px`,
            width: width - (height * 0.8 + paddingHorizontal * 2.5)
          }
        }
      },
    },
    index: {
      arrows: {
        getPosition () {
          if (ratio < RATIO_LARGE) {
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
            left: width - paddingHorizontal,
            width: paddingHorizontal,
            // left: Math.min(width - paddingHorizontal, width - (width - firstSliderWidth * 2)),
            // width: Math.max(paddingHorizontal, width - firstSliderWidth * 2),
            // left: width - (paddingHorizontal * 1.5), // TODO
            // width: paddingHorizontal * 1.5,
            top: height - paddingVertical,
          }
        }
      },
      content: {
        getPosition () {
          if (ratio < RATIO_SMALL) {
            return {
              top: height - (paddingVertical * 2),
              width: width,
              height: (paddingVertical * 2),
              left: 0,
            }
          }
          
          if (ratio < RATIO_HUGE) {
            return {
              width: width - firstSliderWidth - paddingHorizontal, // TODO
              height: height,
              left: contentMarginLeft,
            }
          }
          
          return {
            width: width - paddingHorizontal - firstSliderWidth - Math.max(paddingHorizontal, (width - firstSliderWidth * 2 - paddingHorizontal)), // TODO
            height: height,
            left: contentMarginLeft,
          }
        },
        sessionInfo: {
          getPosition () {
            return {
              bottom: paddingVertical,
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
            return {
              fontSize: `${ paddingVertical * 4.5 }px`,
              left: -paddingVertical * 0.6 - paddingHorizontal / 2,
              top: height - paddingVertical * 2 - paddingVertical / 4,
            }
          }
        }
      },
      numbers: {
        getPosition () {
          return {
            width: contentMarginLeft - Math.floor(height * 0.8),
            height,
            left: 0,
          }
        },
        primary: {
          getPosition () {
            return {
              padding: `${ (paddingVertical - 32) / 2 }px 0`
            }
          }
        }
      },
      sliders: {
        primary () {
          if (ratio < RATIO_SMALL) {
            return {
              top: height - sliderHeight - footer.height,
              left: (paddingHorizontal / 2),
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (ratio < RATIO_MEDIUM) {
            return {
              top: paddingVertical * 1.5,
              left: paddingHorizontalMedium,
              width: sliderPrimaryWidth,
              height: sliderPrimaryHeight,
            }
          }

          if (ratio < RATIO_LARGE) {
            return {
              top: paddingVertical,
              left: paddingHorizontalMedium,
              width: sliderPrimaryWidth,
              height: sliderPrimaryHeight,
            }
          }

          if (ratio < RATIO_HUGE) {
            return {
              top: 0,
              left: 0,
              width: firstSliderWidth,
              height: firstSliderHeight,
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
          if (ratio < RATIO_SMALL) {
            return {
              top: height - sliderHeight - footer.height,
              left: sliderWidth + paddingHorizontal / 2,
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (ratio < RATIO_MEDIUM) {
            return {
              top: paddingVertical * 1.5,
              left: sliderPrimaryWidth + paddingHorizontal * (1 + (ratio - RATIO_SMALL) * 3),
              width: sliderPrimaryWidth,
              height: sliderPrimaryHeight,
            }
          }

          if (ratio < RATIO_LARGE) {
            return {
              top: height - paddingVertical - sliderSecondaryHeight,
              left: width - sliderSecondaryWidth - paddingHorizontalMedium,
              width: sliderSecondaryWidth,
              height: sliderSecondaryHeight,
            }
          }

          return {
            top: 0,
            // left: width - paddingHorizontal,
            left: Math.min(width - paddingHorizontal, width - (width - firstSliderWidth * 2 - paddingHorizontal)),
            width: Math.floor((height - paddingVertical) * 0.8),
            height: height - paddingVertical,
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
    layouts: {
      getLayout () {
        return [
          {
            type: 0,
            first: {
              top: 0,
              left: (width / 2) - (height * 0.8),
              // left: paddingHorizontal,
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
      burger: {
        getPosition () {
          if (ratio < RATIO_SMALL) {
            return {
              top: paddingHorizontal / 2,
              left: paddingHorizontal / 2,
            }
          }
          
          return {
            top: paddingVertical * 0.75,
            transform: 'translateY(-10px)',
            right: paddingHorizontalMedium,
          }
        }
      },
      getPosition () {
        if (ratio < RATIO_MEDIUM) {
          return {
            top: 0,
            height: height - sliderHeight - footer.height,
            left: 0,
            maxHeight: height - sliderHeight - footer.height,
          }
        }
        // TODO: changed
        // if (ratio < RATIO_MEDIUM) {
        //   return {
        //     left: contentMarginLeft,
        //     top: (height - (sliderPrimaryWidth * 1.25)) / 2,
        //     height: paddingVertical,
        //     maxHeight: paddingVertical,
        //   }
        // }

        return {
          top: 0,
          height: paddingVertical,
          maxHeight: paddingVertical,
        }
      },
      links: {
        getPosition (isHome) {
          if (ratio < RATIO_SMALL) {
            return {
              width: width - paddingHorizontal * 3,
              left: paddingHorizontal * 1.5,
            }
          }

          if (ratio < RATIO_MEDIUM) {
            return {
              width: width / 2,
              left: paddingHorizontal,
            }
          }
          // TODO: changed
          // if (ratio < RATIO_MEDIUM) {
          //   return {
          //     width: '50%',
          //     maxWidth: 375,
          //     minWidth: 300,
          //     // marginLeft: paddingHorizontal / 2,
          //     alignItems: 'flex-start',
          //   }
          // }

          if (ratio < RATIO_LARGE) {
            return {
              width: '50%',
              maxWidth: 375,
              minWidth: 300,
              padding: 0,
            }
          }

          return {
            width: 280,
            // maxWidth: 375,
            // minWidth: 300,
            marginLeft: paddingHorizontal / 2,
            padding: '50px 0',
          }
        }
      },
      logo: {
        getPosition (isHome) {
          if (ratio < RATIO_SMALL) {
            return {
              width: width - paddingHorizontal * 3,
              maxWidth: paddingVertical * 4,
            }
          }
          // TODO: changed
          // if (ratio < RATIO_MEDIUM) {
          //   return {
          //     left: 0,
          //     width: sliderPrimaryWidth,
          //     maxWidth: 400,
          //     top: paddingVertical - 50,
          //   }
          // }
          if (ratio < RATIO_MEDIUM) {
            return {
              top: paddingVertical / 4,
              left: paddingHorizontalMedium,
              width: sliderPrimaryWidth,
              maxWidth: paddingVertical * 4,
              // top: paddingVertical - 50,
            }
          }

          if (ratio < RATIO_LARGE) {
            return {
              left: 0,
              width: sliderSecondaryWidth,
              maxWidth: 400,
              top: paddingVertical * 1.5,
            }
          }

          const paddingRight = Math.max(paddingHorizontal, (width - firstSliderWidth * 2 - paddingHorizontal))
          return {
            left: paddingHorizontal / 2,
            // width: (width - (height * 0.8 + paddingHorizontal * 2 + paddingRight)) * 0.8, // TODO: CHANGE
            width: 340, // TODO: CHANGE
            // maxWidth: 400,
            top: paddingVertical,
          }
        },
        wrapper: {
          getPosition (isHome) {
            const wrapperHeight = isHome
              ? height - sliderHeight - footer.height
              : height - sliderHeight - footer.height - paddingVertical

            if (ratio < RATIO_SMALL) {
              return {
                top: 0,
                height: wrapperHeight,
                // minHeight: paddingVertical * 3
              }
            }

            if (ratio < RATIO_MEDIUM) {
              return {
                left: 0,
                width: width / 2,
              }
            }

            if (ratio < RATIO_LARGE) {
              return {
                background: 'red',
                left: contentMarginLeft,
                width: sliderSecondaryWidth
              }
            }

            return {
              left: contentMarginLeft,
              width: width - (height * 0.8 + paddingHorizontal * 2.5),
            }
          }
        }
      },
      navMenu: {
        getPosition (isSession) {
          if (ratio < RATIO_SMALL) {
            return {
              top: 0,
              left: 0,
              height: height - sliderHeight - footer.height,
              width: width,
            }
          }

          if (ratio < RATIO_MEDIUM) {
            return {
              top: 0,
              left: 0,
              height: paddingVertical * 1.5,
              width: width,
              alignItems: 'center',
            }
          }

          if (ratio < RATIO_LARGE) {
            return {
              top: paddingVertical / 2,
              left: contentMarginLeft,
              height: paddingVertical,
              width: sliderSecondaryWidth,
              transform: `translateY(0.5em)`
            }
          }

          return {
            top: 0,
            left: contentMarginLeft,
            height: paddingVertical,
            width: width - (height * 0.8 + paddingHorizontal * 2.5),
          }
        }
      }
    },
    sessions: {
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
              marginTop: paddingVertical * 2,
              height: sliderHeight + footer.height - paddingVertical * 2,
              padding: `0 ${ paddingHorizontal * 2 }px`,
            }
          }
        },
        photo: {
          getPosition () {
            return {
              width: sliderPrimaryWidth,
              height: sliderPrimaryWidth * 1.25,
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
