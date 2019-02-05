export const getPadding = ({ width, height, ratio }) => {
  if (width < 600) return 30
  if (width < 900) return 60
  if (ratio >= 2 || width > 1280) return Math.min(120 * (ratio / 2) * ((width - 1280) / 1280 + 1), 240)
  return 120
}

const getFooter = ({ height, width, ratio }) => {
  const padding = getPadding({ height, width, ratio })

  return {
    height: height / 7
  }
}

export const getConfig = (media, pathname) => {
  const { height, width, ratio } = media

  const padding = getPadding(media)
  const footer = getFooter(media)

  // TODO: Check if isHome: isHome ? height * 0.8 : 0
  const contentMarginLeft = (pathname === '/' || pathname === '/contact' || pathname.includes('/sessions')) ? height * 0.8 : 0

  let sliderWidth
  let sliderHeight

  if (ratio < 1) {
    sliderWidth = Math.floor(width - (padding * 2))
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
              padding: `0 ${ padding * 1.5 }px`,
            }
          }
        },
        wrapper: {
          getPosition () {
            if (ratio < 1) {
              return {
                marginTop: height - sliderHeight - footer.height - padding,
                height: sliderHeight + footer.height - padding * 2,
                width: '100%',
                left: 0,
              }
            }

            return {
              marginTop: padding / 2,
              width: '50%',
              left: contentMarginLeft + padding * 1.5,
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
              minHeight: padding * 2,
              padding: `0 ${ padding / 2 }px`
            }
          }

          return {
            top: height - padding,
            left: contentMarginLeft + padding,
            height: padding,
            padding: `0 ${ padding / 2 }px`,
            width: width - (height * 0.8 + padding * 2.5)
          }
        }
      },
    },
    index: {
      arrows: {
        getPosition () {
          return {
            width: padding * 1.5,
            height: padding,
            bottom: 48,
            left: width - (padding * 1.5),
            top: height - padding,
          }
        }
      },
      content: {
        getPosition () {
          if (ratio < 1) {
            return {
              top: height - (padding * 2),
              width: width,
              height: (padding * 2),
              left: 0,
            }
          }

          return {
            width: width - (height * 0.8 + padding * 2.5),
            height: height,
            left: contentMarginLeft + padding,
          }
        },
        sessionInfo: {
          getPosition () {
            return {
              bottom: padding,
            }
          }
        },
        text: {
          getPosition () {
            return {
              left: padding / 2,
              bottom: padding / 2
            }
          }
        }
      },
      numbers: {
        getPosition () {
          return {
            width: padding,
            height,
            left: 0,
          }
        },
        primary: {
          getPosition () {
            return {
              padding: `${ (padding - 32) / 2 }px 0`
            }
          }
        }
      },
      sliders: {
        primary () {
          if (ratio < 1) {
            return {
              top: height - sliderHeight - footer.height,
              left: (padding / 2),
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (ratio > 1.5) {
            return {
              top: 0,
              left: padding,
              width: Math.floor(height * 0.8),
              height,
            }
          }

          return {
            top: padding,
            left: padding,
            width: Math.floor((height - padding) * 0.8),
            height: height - padding,
          }
        },
        secondary () {
          if (ratio < 1) {
            return {
              top: height - sliderHeight - footer.height,
              left: sliderWidth + padding / 2,
              width: sliderWidth,
              height: sliderHeight,
            }
          }

          if (ratio > 1.5) {
            return {
              top: 0,
              left: width - padding * 1.5,
              width: Math.floor((height - padding) * 0.8),
              height: height - padding,
            }
          }

          return {
            height: height - padding,
            top: 0,
            left: width - padding,
            width: Math.floor((height - padding) * 0.8),
          }
        },
        mask: {
          getPosition () {
            return {
              top: height - sliderHeight - footer.height,
              left: sliderWidth + padding / 2,
              width: padding / 2,
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
              left: padding,
              width: height * 0.8,
              height: height,
            },
            second: {
              top: padding * 2,
              left: height * 0.8 + padding * 1.5,
              width: (height - padding * 3) * 0.8,
              height: height - padding * 3,
            },
          },
          {
            type: 1,
            first: {
              top: padding,
              left: padding,
              width: (height - padding * 2) * 0.8,
              height: height - padding * 2,
            },
            second: {
              top: padding * 1.5,
              left: width - ((height - padding * 3) * 0.8) - padding,
              width: (height - padding * 3) * 0.8,
              height: height - padding * 3,
            },
          },
        ]
      }
    },
    navbar: {
      burger: {
        getPosition () {
          return {
            maxHeight: padding * 1.5,
            height: padding * 1.5,
            width: padding * 1.5,
            top: 0,
            left: 0,
            padding: padding / 2
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
          height: padding,
          maxHeight: padding,
        }
      },
      links: {
        getPosition (isHome) {
          if (ratio < 1) {
            return {
              width: width - padding * 3,
              left: padding * 1.5,
            }
          }

          return {
            width: '50%',
            maxWidth: 375,
            minWidth: 300,
            marginLeft: padding / 2,
            padding: '50px 0',
          }
        }
      },
      logo: {
        getPosition (isHome) {
          if (ratio < 1) {
            return {
              width: width - padding * 3,
              maxWidth: 400,
            }
          }

          return {
            left: padding / 2,
            width: (width - (height * 0.8 + padding * 2.5)) * 0.8,
            maxWidth: 400,
            top: padding,
          }
        },
        wrapper: {
          getPosition (isHome) {
            const wrapperHeight = isHome
              ? height - sliderHeight - footer.height
              : height - sliderHeight - footer.height - padding

            if (ratio < 1) {
              return {
                top: 0,
                height: wrapperHeight,
                minHeight: padding * 3
              }
            }

            return {
              left: contentMarginLeft + padding,
              width: width - (height * 0.8 + padding * 2.5),
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
            left: contentMarginLeft + padding,
            height: padding,
            width: width - (height * 0.8 + padding * 2.5),
          }
        }
      }
    },
    sessions: {
      small: {
        wrapper: {
          getPosition (isHome) {
            return {
              marginTop: Math.max((height - sliderHeight - footer.height - padding), padding * 3),
              height: sliderHeight + footer.height - padding * 2,
              padding: `0 ${ padding / 2 }px`,
            }
          }
        },
        footer: {
          getPosition () {
            const padding = getPadding({ height, width, ratio })

            return {
              top: 0,
              left: 0,
              height: (padding * 4),
            }
          }
        },
      }
    }
  }
}
