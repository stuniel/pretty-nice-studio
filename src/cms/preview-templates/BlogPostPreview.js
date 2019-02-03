import React from 'react'
import PropTypes from 'prop-types'
import { SessionTemplate } from '../../templates/session'

const SessionPreview = ({ entry, widgetFor }) => (
  <SessionTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

SessionPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SessionPreview
