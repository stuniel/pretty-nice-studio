import React from 'react'

// Replaces gatsby-image v2's <Img fluid={...}>: same markup shape (aspect-ratio
// spacer + absolutely positioned image), fed by the `fluid` objects that
// src/lib/images.ts builds. AVIF/WebP sources with a JPEG fallback.
const Img = ({ fluid, className, style, imgStyle, alt = '', ...rest }) => {
  if (!fluid) return null

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }} {...rest}>
      <div style={{ width: '100%', paddingBottom: `${ 100 / fluid.aspectRatio }%` }} />
      <picture>
        {fluid.srcSetAvif && <source type="image/avif" srcSet={fluid.srcSetAvif} sizes={fluid.sizes} />}
        {fluid.srcSetWebp && <source type="image/webp" srcSet={fluid.srcSetWebp} sizes={fluid.sizes} />}
        <img
          alt={alt}
          src={fluid.src}
          srcSet={fluid.srcSet}
          sizes={fluid.sizes}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            ...imgStyle,
          }}
        />
      </picture>
    </div>
  )
}

export default Img
