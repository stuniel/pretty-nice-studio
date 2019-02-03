export const getPadding = ({ width, height, ratio }) => {
  if (width < 600) return 30
  if (width < 900) return 60
  if (ratio >= 2 || width > 1280) return Math.min(120 * (ratio / 2) * ((width - 1280) / 1280 + 1), 240)
  return 120
}

export const config = {
  contact: {
    content: {
      getPosition ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

        if (ratio < 1) {
          return {
            top: 0,
            padding: `0 ${ padding * 1.5 }px`,
          }
        }
      },
      wrapper: {
        getPosition ({ height, width, ratio }) {
          const padding = getPadding({ height, width, ratio })

          if (ratio < 1) {
            return {
              marginTop: height - ((width - padding * 2) * 1.25) - padding * 2,
              height: ((width - padding * 2) * 1.25) + padding * 2,
              width: '100%',
              left: 0,
              // padding: padding * 1.5,
            }
          }

          return {
            marginTop: padding / 2,
            width: '50%',
            left: height * 0.8 + padding * 1.5
          }
        }
      }
    }
  },
  index: {
    arrows: {
      getPosition ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

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
      getPosition ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

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
          left: height * 0.8 + padding,
        }
      },
      sessionInfo: {
        getPosition ({ height, width, ratio }) {
          const padding = getPadding({ height, width, ratio })

          return {
            bottom: padding,
          }
        }
      },
      text: {
        getPosition ({ height, width, ratio }) {
          const padding = getPadding({ height, width, ratio })

          return {
            left: padding / 2,
            bottom: padding / 2
          }
        }
      }
    },
    footer: {
      getPosition ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

        if (ratio < 1) {
          return {
            top: 0,
            left: 0,
            height: (padding * 2),
            padding: `0 ${ padding / 2 }px`
          }
        }

        return {
          top: height - padding,
          left: 0,
          height: padding,
          padding: `0 ${ padding / 2 }px`
        }
      }
    },
    numbers: {
      getPosition ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

        return {
          width: padding,
          height,
          left: 0,
        }
      },
      primary: {
        getPosition ({ height, width, ratio }) {
          const padding = getPadding({ height, width, ratio })

          return {
            padding: `${ (padding - 32) / 2 }px 0`
          }
        }
      }
    },
    sliders: {
      primary ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

        if (ratio < 1) {
          return {
            top: height - ((width - (padding * 2)) * 1.25) - (padding * 2),
            left: padding / 2,
            width: width - (padding * 2),
            height: (width - (padding * 2)) * 1.25,
          }
        }

        if (ratio > 1.5) {
          return {
            top: 0,
            left: padding,
            width: height * 0.8,
            height,
          }
        }

        return {
          top: padding,
          left: padding,
          width: (height - padding) * 0.8,
          height: height - padding,
        }
      },
      secondary ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

        if (ratio < 1) {
          return {
            top: height - ((width - (padding * 2)) * 1.25) - (padding * 2),
            left: width - padding * 1.5,
            width: width - (padding * 2),
            height: (width - (padding * 2)) * 1.25,
          }
        }

        if (ratio > 1.5) {
          return {
            top: 0,
            left: width - padding * 1.5,
            width: (height - padding) * 0.8,
            height: height - padding,
          }
        }

        return {
          height: height - padding,
          top: 0,
          left: width - padding,
          width: (height - padding) * 0.8,
        }
      },
      mask: {
        getPosition ({ height, width, ratio }) {
          const padding = getPadding({ height, width, ratio })

          return {
            top: height - ((width - (padding * 2)) * 1.25) - (padding * 2),
            left: padding / 2 + width - (padding * 2),
            width: padding / 2,
            height: (width - (padding * 2)) * 1.25,
          }
        }
      }
    }
  },
  layouts: {
    getLayout ({ height, width, ratio }) {
      const padding = getPadding({ height, width, ratio })

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
            left: width - height * 0.8 + padding,
            width: (height - padding * 2.5) * 0.8,
            height: height - padding * 2.5,
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
      getPosition ({ height, width, ratio }) {
        const padding = getPadding({ height, width, ratio })

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
    getPosition ({ height, width, ratio }) {
      const padding = getPadding({ height, width, ratio })

      if (ratio < 1) {
        return {
          top: 0,
          height: height - ((width - padding * 2) * 1.25) - padding * 2,
          left: 0,
          maxHeight: height - ((width - padding * 2) * 1.25) - padding * 2,
        }
      }

      return {
        top: 0,
        height: padding,
        maxHeight: padding,
      }
    },
    links: {
      getPosition ({ height, width, ratio }, isHome) {
        const padding = getPadding({ height, width, ratio })

        if (ratio < 1) {
          return {
            width: width - padding * 3,
            left: padding * 1.5,
            // padding: '50px 0',
          }
        }

        return {
          // width: width - (height * 0.8 + 300),
          width: '50%',
          maxWidth: 375,
          minWidth: 300,
          marginLeft: padding / 2,
          padding: '50px 0',
        }
      }
    },
    logo: {
      getPosition ({ height, width, ratio }, isHome) {
        const padding = getPadding({ height, width, ratio })

        if (ratio < 1) {
          return {
            width: width - padding * 3,
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
        getPosition ({ height, width, ratio }, isHome) {
          const padding = getPadding({ height, width, ratio })

          if (ratio < 1) {
            return {
              top: 0,
              height: height - ((width - padding * 2) * 1.25) - padding * 2,
            }
          }

          return {
            left: height * 0.8 + padding,
            width: width - (height * 0.8 + padding * 2.5),
          }
        }
      }
    },
    navMenu: {
      getPosition ({ height, width, ratio }, isHome) {
        const padding = getPadding({ height, width, ratio })

        if (ratio < 1) {
          return {
            top: 0,
            left: 0,
            height: height - ((width - padding * 2) * 1.25) - padding * 2,
            width: width,
          }
        }

        return {
          top: 0,
          left: height * 0.8 + padding,
          height: padding,
          width: width - (height * 0.8 + padding * 2.5),
        }
      }
    }
  },
  sessions: {
    small: {
      wrapper: {
        getPosition ({ height, width, ratio }, isHome) {
          const padding = getPadding({ height, width, ratio })

          return {
            marginTop: height - ((width - padding * 2) * 1.25) - padding * 2,
            height: ((width - padding * 2) * 1.25) + padding * 2,
            padding: `0 ${ padding / 2 }px`,
          }
        }
      },
      footer: {
        getPosition ({ height, width, ratio }) {
          const padding = getPadding({ height, width, ratio })

          return {
            top: 0,
            left: 0,
            height: (padding * 4),
            // padding: `0 ${ padding / 2 }px`
          }
        }
      },
    }
  }
}
