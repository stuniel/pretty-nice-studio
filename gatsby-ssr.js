import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import createStore from './src/state/createStore'
import Media from './src/components/Media'

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const store = createStore()
  const sheet = new ServerStyleSheet()

  const ConnectedBody = () => (
    <Provider store={store}>
      <Media>
        <StyleSheetManager sheet={sheet.instance}>
          {bodyComponent}
        </StyleSheetManager>
      </Media>
    </Provider>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
  setHeadComponents([sheet.getStyleElement()])
}
