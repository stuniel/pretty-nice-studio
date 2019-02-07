export const getPadding = ({ width, height, ratio }, pathname) => {
  let paddingVertical = 120
  let paddingHorizontal = 120

  if (width < 600) paddingVertical = paddingHorizontal = 30
  if (width < 900) paddingVertical = paddingHorizontal = 60

  if (ratio >= 2 || width > 1280) {
    if (!pathname.includes('sessions')) {
      paddingVertical = Math.min(120 * (ratio / 2) * 0.66 * ((width - 1280) / 1280 + 1), 240)
    }
    paddingHorizontal = Math.min(120 * (ratio / 2) * ((width - 1280) / 1280 + 1), 240)
  }

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

  // TODO: Check if isHome: isHome ? height * 0.8 : 0
  const contentMarginLeft = (pathname === '/' || pathname === '/contact' || pathname.includes('/sessions')) ? height * 0.8 : 0

  let sliderWidth
  let sliderHeight

  if (ratio < 1) {
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
          if (ratio < 1) {
            return {
              top: 0,
              padding: `0 ${ paddingHorizontal * 1.5 }px`,
            }
          }
        },
        wrapper: {
          getPosition () {
            if (ratio < 1) {
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
              left: contentMarginLeft + paddingHorizontal * 1.5,
              top: 0,
            }
          }
        }
      }
    },
    footer: {
      wrapper: {
        getPosition () {
          if (ratio < 1) {
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
            left: contentMarginLeft + paddingHorizontal,
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
          if (ratio < 1) {
            return {
              top: height - (paddingVertical * 2),
              width: width,
              height: (paddingVertical * 2),
              left: 0,
            }
          }

          return {
            width: width - (height * 0.8 + paddingHorizontal * 2.5),
            height: height,
            left: contentMarginLeft + paddingHorizontal,
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
              left: paddingHorizontal * -0.75,
              bottom: '55px',
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
              padding: `${ (paddingVertical - 32) / 2 }px 0`
            }
          }
        }
      },
      sliders: {
        primary () {
          if (ratio < 1) {
            return {
              top: height - sliderHeight - footer.height,
              left: (paddingHorizontal / 2),
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (ratio > 1.5) {
            return {
              top: 0,
              left: paddingHorizontal,
              width: Math.floor(height * 0.8),
              height,
            }
          }

          return {
            top: paddingVertical,
            left: paddingHorizontal,
            width: Math.floor((height - paddingVertical) * 0.8),
            height: height - paddingVertical,
          }
        },
        secondary () {
          if (ratio < 1) {
            return {
              top: height - sliderHeight - footer.height,
              left: sliderWidth + paddingHorizontal / 2,
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (ratio > 1.5) {
            return {
              top: 0,
              left: width - paddingHorizontal * 1.5,
              width: Math.floor((height - paddingVertical) * 0.8),
              height: height - paddingVertical,
            }
          }

          return {
            height: height - paddingVertical,
            top: 0,
            left: width - paddingHorizontal,
            width: Math.floor((height - paddingVertical) * 0.8),
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
              left: paddingHorizontal,
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
              left: paddingHorizontal,
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
              top: paddingVertical,
              left: paddingHorizontal,
              width: (height - paddingVertical * 2) * 0.8,
              height: height - paddingVertical * 2,
            },
            second: {
              top: paddingVertical * 1.5,
              left: width - ((height - paddingVertical * 3) * 0.8) - paddingHorizontal,
              width: (height - paddingVertical * 3) * 0.8,
              height: height - paddingVertical * 3,
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
        if (ratio < 1) {
          return {
            top: 0,
            height: height - sliderHeight - footer.height,
            left: 0,
            maxHeight: height - sliderHeight - footer.height,
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
          if (ratio < 1) {
            return {
              width: width - paddingHorizontal * 3,
              left: paddingHorizontal * 1.5,
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
          if (ratio < 1) {
            return {
              width: width - paddingHorizontal * 3,
              maxWidth: 440,
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

            if (ratio < 1) {
              return {
                top: 0,
                height: wrapperHeight,
                minHeight: paddingVertical * 3
              }
            }

            return {
              left: contentMarginLeft + paddingHorizontal,
              width: width - (height * 0.8 + paddingHorizontal * 2.5),
            }
          }
        }
      },
      navMenu: {
        getPosition (isSession) {
          if (ratio < 1) {
            return {
              top: 0,
              left: 0,
              height: height - sliderHeight - footer.height,
              width: width,
            }
          }

          return {
            top: 0,
            left: contentMarginLeft + paddingHorizontal,
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
      }
    }
  }
}
