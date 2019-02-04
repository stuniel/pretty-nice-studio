import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { find, flatMap } from 'lodash'

import { getConfig } from '../config.js'

import BackgroundImage from '../components/BackgroundImage'

const propTypes = {
  images: PropTypes.array,
  session: PropTypes.string,
  views: PropTypes.array,
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  top: 0px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`

const Photo = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin-bottom: 30px;
`

const ScrollablePosts = ({ images, media, session, views }) => {
  const config = getConfig(media)

  const { height } = media
  const photos = flatMap(views, view => [view.first, view.second])

  const filteredPhotos = images.photos
    .map(image => image.photo)
    .filter(photo =>
      photo.relativePath.includes(height < 768 ? 'small' : 'big'))

  const wrapperStyle = {
    ...config.sessions.small.wrapper.getPosition()
  }

  return (
    <Wrapper style={wrapperStyle}>
      {photos.map(photoName => {
        if (!photoName) return

        const alt = `pretty nice studio - ${ session } session photo`
        const fluid = find(filteredPhotos, photo =>
          photo.relativePath.includes(photoName)
        ).childImageSharp.fluid

        return (
          <Photo>
            <BackgroundImage alt={alt} fluid={fluid} />
          </Photo>
        )
      })}
    </Wrapper>
  )
}

ScrollablePosts.propTypes = propTypes

export default ScrollablePosts
