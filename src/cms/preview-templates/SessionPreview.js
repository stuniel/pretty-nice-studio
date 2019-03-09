import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SessionTemplate } from '../../templates/session'

const SessionPreview = ({
  data,
  entry,
  hideLogo,
  location,
  media,
  pageContext,
  showLogo,
  widgetFor
}) => {
  const { prev, next } = pageContext

  return (
    <SessionTemplate
      // contentComponent={HTMLContent}
      cover={entry.getIn(['data', 'cover'])}
      hideLogo={hideLogo}
      showLogo={showLogo}
      session={entry.getIn(['data', 'session'])}
      views={entry.getIn(['data', 'views'])}
      image={entry.getIn(['data', 'image'])}
      images={entry.getIn(['data', 'images'])}
      prev={prev}
      next={next}
      location={location}
      media={media}
      // helmet={
      //   <Helmet titleTemplate="%s | Session">
      //     <title>{`${ post.frontmatter.title }`}</title>
      //     <meta
      //       name="description"
      //       content={`${ post.frontmatter.description }`}
      //     />
      //   </Helmet>
      // }

      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={entry.getIn(['data', 'tags'])}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

SessionPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = dispatch => {
  return {
    hideLogo: () => dispatch({ type: 'HIDE_LOGO' }),
    showLogo: () => dispatch({ type: 'SHOW_LOGO' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionPreview)
