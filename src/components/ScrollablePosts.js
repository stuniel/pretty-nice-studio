import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { find, flatMap } from 'lodash'

import { config } from '../config.js'

import BackgroundImage from '../components/BackgroundImage'
import Icons from '../components/Icons'

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

const Footer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: pink;
`

const ScrollablePosts = ({ images, media, session, views }) => {
  const { height } = media
  const photos = flatMap(views, view => [view.first, view.second])

  const filteredPhotos = images.photos
    .map(image => image.photo)
    .filter(photo =>
      photo.relativePath.includes(height < 768 ? 'small' : 'big'))

  const wrapperStyle = {
    ...config.sessions.small.wrapper.getPosition(media)
  }

  const footerStyle = {
    ...config.sessions.small.footer.getPosition(media)
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
      <Footer style={footerStyle}>
        <Icons width='165px' />
      </Footer>
    </Wrapper>
  )
}

ScrollablePosts.propTypes = propTypes

export default ScrollablePosts
