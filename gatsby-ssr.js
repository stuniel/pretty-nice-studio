import React from 'react'

import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import wrapWithProvider from './wrap-with-provider'
import { store } from './src/state/createStore'

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const sheet = new ServerStyleSheet()

  const ConnectedBody = () => (
    <Provider store={store}>
      <StyleSheetManager sheet={sheet.instance}>
        {bodyComponent}
      </StyleSheetManager>
    </Provider>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
  setHeadComponents([sheet.getStyleElement()])
}

export const wrapRootElement = wrapWithProvider
