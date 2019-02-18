export const RATIO_SMALL = 0.7
export const RATIO_MEDIUM = 1

export const getPadding = ({ width, height, ratio }, pathname) => {
  let paddingVertical = height / 10
  let paddingHorizontal = width / 15

  if (width < 900) {
    paddingVertical = 60
    paddingHorizontal = 60
  }

  if (width < 600) {
    paddingVertical = 30
    paddingHorizontal = 30
  }

  // if (ratio >= 2) {
  //   if (!pathname.includes('sessions')) {
  //     paddingVertical = Math.min(120 * (ratio / 2) * 0.66 * ((width - 1280) / 1280 + 1), 240)
  //   }
  //   paddingHorizontal = Math.min(120 * (ratio / 2) * ((width - 1280) / 1280 + 1), 240)
  // }
  // if (ratio >= 2 || width > 1280) {
  //   if (!pathname.includes('sessions')) {
  //     paddingVertical = Math.min(120 * (ratio / 2) * 0.66 * ((width - 1280) / 1280 + 1), 240)
  //   }
  //   paddingHorizontal = Math.min(120 * (ratio / 2) * ((width - 1280) / 1280 + 1), 240)
  // }

  return {
    paddingVertical,
    paddingHorizontal
  }
}

const getFooter = ({ height, width, ratio }) => {
  return {
    height: height / 7
  }
}

export const getConfig = (media, pathname) => {
  const { height, width, ratio } = media

  const { paddingVertical, paddingHorizontal } = getPadding(media, pathname)
  const footer = getFooter(media)

  const sliderPrimaryWidth = Math.floor(width / 2 - paddingHorizontal * 2)
  const sliderSecondaryWidth = Math.floor(width / 2 - paddingHorizontal * 3.33)

  // const fits = (height * 0.8 + paddingHorizontal) <= (width / 2)

  // TODO: Check if isHome: isHome ? height * 0.8 : 0
  const contentMarginLeft = (pathname === '/' || pathname === '/contact' || pathname.includes('/sessions'))
    ? ratio < RATIO_MEDIUM
      ? sliderPrimaryWidth + paddingHorizontal * 2.25
      : width / 2
    : 0

  let sliderWidth
  let sliderHeight

  if (ratio < RATIO_SMALL) {
    sliderWidth = Math.floor(width - (paddingHorizontal * 2))
    sliderHeight = Math.floor(sliderWidth * 1.25)
  }

  if (ratio > 0.66) {
    sliderWidth = Math.floor(sliderWidth * (0.66 / ratio))
    sliderHeight = Math.floor(sliderHeight * (0.66 / ratio))
  }

  return {
    contact: {
      content: {
        getPosition () {
          if (ratio < RATIO_SMALL) {
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
              minHeight: paddingVertical * 2,
              padding: `0 ${ paddingHorizontal / 2 }px`
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
          return {
            width: paddingHorizontal * 1.5,
            height: paddingVertical,
            bottom: 48,
            left: width - (paddingHorizontal * 1.5),
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

          return {
            width: (width / 2) - paddingHorizontal * 1.5, // TODO
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
              fontSize: `${ paddingVertical * 6 }px`,
              // lineHeight: `${ paddingVertical * 6 }px`,
              // letterSpacing: `${ -paddingVertical / 2 }px`,
              left: -paddingVertical * 0.5 - paddingHorizontal / 2,
              bottom: 0,
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
              top: (height - (sliderPrimaryWidth * 1.25)) / 2,
              left: ((width / 2) - sliderPrimaryWidth),
              width: sliderPrimaryWidth,
              height: sliderPrimaryWidth * 1.25,
            }
            // 
            // const sliderPrimaryHeight = Math.floor(height - paddingVertical * 3)
            // 
            // return {
            //   top: (height - sliderPrimaryHeight) / 2,
            //   left: ((width / 2) - (sliderPrimaryHeight * 0.8)) / 2,
            //   width: sliderPrimaryHeight * 0.8,
            //   height: sliderPrimaryHeight,
            // }
          }

          return {
            top: 0,
            right: contentMarginLeft,
            width: Math.floor(height * 0.8),
            height,
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
              bottom: (height - (sliderPrimaryWidth * 1.25)) / 2,
              left: contentMarginLeft,
              width: sliderSecondaryWidth,
              height: sliderSecondaryWidth * 1.25,
            }
          }

          return {
            top: 0,
            left: width - paddingHorizontal * 1.5,
            width: Math.floor((height - paddingVertical) * 0.8),
            height: height - paddingVertical,
          }
        },
        tercery () {
          return {
            bottom: (height - (sliderPrimaryWidth * 1.25)) / 2,
            left: contentMarginLeft + sliderSecondaryWidth + paddingHorizontal * 0.25,
            width: sliderSecondaryWidth,
            height: sliderSecondaryWidth * 1.25,
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
              top: height - sliderSecondaryWidth * 1.25 - ((height - (sliderPrimaryWidth * 1.25)) / 2),
              left: contentMarginLeft,
              width: sliderSecondaryWidth,
              height: sliderSecondaryWidth * 1.25,
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
              top: height - (sliderSecondaryWidth + paddingVertical / 2) * 1.25 - ((height - (sliderPrimaryWidth * 1.25)) / 2),
              left: contentMarginLeft,
              width: sliderSecondaryWidth + paddingVertical / 2,
              height: (sliderSecondaryWidth + paddingVertical / 2) * 1.25,
            },
          },
        ]
      }
    },
    navbar: {
      burger: {
        getPosition () {
          return {
            maxHeight: paddingVertical * 1.5,
            height: paddingVertical * 1.5,
            width: paddingHorizontal * 1.5,
            top: 0,
            left: 0,
            padding: `${ paddingVertical / 2 }px ${ paddingHorizontal / 2 }px`
          }
        }
      },
      getPosition () {
        if (ratio < RATIO_SMALL) {
          return {
            top: 0,
            height: height - sliderHeight - footer.height,
            left: 0,
            maxHeight: height - sliderHeight - footer.height,
          }
        }

        if (ratio < RATIO_MEDIUM) {
          return {
            left: contentMarginLeft,
            top: (height - (sliderPrimaryWidth * 1.25)) / 2,
            height: paddingVertical,
            maxHeight: paddingVertical,
          }
        }

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
              width: '50%',
              maxWidth: 375,
              minWidth: 300,
              // marginLeft: paddingHorizontal / 2,
              alignItems: 'flex-start',
            }
          }

          return {
            width: '50%',
            maxWidth: 375,
            minWidth: 300,
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
              maxWidth: 440,
            }
          }

          if (ratio < RATIO_MEDIUM) {
            return {
              left: 0,
              width: sliderSecondaryWidth,
              maxWidth: 400,
              top: paddingVertical - 50,
            }
          }

          return {
            left: paddingHorizontal / 2,
            width: (width - (height * 0.8 + paddingHorizontal * 2.5)) * 0.8,
            maxWidth: 400,
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
                minHeight: paddingVertical * 3
              }
            }

            if (ratio < RATIO_MEDIUM) {
              return {
                left: 0,
                width: width / 2,
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
              height: paddingVertical,
              width: width / 2,
              // paddingTop: paddingVertical / 3,
              alignItems: 'flex-start',
            }
          }

          return {
            top: 0,
            left: contentMarginLeft,
            height: paddingVertical,
            width: width - (height * 0.8 + paddingHorizontal * 2.5),
            // paddingTop: paddingVertical / 3,
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
