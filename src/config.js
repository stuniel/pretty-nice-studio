export const getPadding = ({ width, height, ratio }) => {
  if (width < 600) return 30
  if (width < 900) return 60
  return 120
}

export const config = {
  index: {
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
          width: width - (height * 0.8 + 300),
          height: height,
          left: height * 0.8 + 120,
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
          padding: '0 10%'
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
          height: height - ((width - 60) * 1.25) - 60,
          left: 0,
          maxHeight: height - ((width - 60) * 1.25) - 60,
        }
      }

      return {
        top: 0,
        height: 120,
        maxHeight: 120,
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
          width: width - (height * 0.8 + 300),
          left: isHome ? '10%' : 0,
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
          left: isHome ? height * 0.8 + (width - (height * 0.8 + 300)) / 10 : 0,
          width: (width - (height * 0.8 + 300)) * 0.8,
          top: 150,
        }
      },
      wrapper: {
        getPosition ({ height, width, ratio }, isHome) {
          if (ratio < 1) {
            return {
              top: 0,
              height: height - ((width - 60) * 1.25) - 60,
            }
          }

          return {
            background: 'pink',
            height: '100%',
            width: '100%',
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
            // height: padding * 1.5,
            height: height - ((width - 60) * 1.25) - 60,
            width: width,
          }
        }

        return {
          top: 0,
          left: isHome ? height * 0.8 + 120 : padding,
          height: 120,
          width: isHome ? height * 0.8 : width,
        }
      }
    }
  }
}
