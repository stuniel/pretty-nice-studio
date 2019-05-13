import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({
  activeTransitions,
  data,
  entry,
  location,
  media,
  timeout,
  transitionMenu,
  widgetFor
}) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
    data={data}
    media={media}
    timeout={timeout}
    transitionMenu={transitionMenu}
    location={location}
  />
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

const mapStateToProps = ({
  media,
  transitions: {
    activeTransitions,
    timeout,
    transitionMenu
  }
}) => {
  return { activeTransitions, media, timeout, transitionMenu }
}

const mapDispatchToProps = () => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPagePreview)
