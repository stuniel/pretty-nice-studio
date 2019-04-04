import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { createStore } from './src/state/createStore'

const sheetByPathname = new Map()

export const replaceRenderer = ({
  bodyComponent,
  pathname,
  replaceBodyHTMLString
}) => {
  const sheet = new ServerStyleSheet()
  sheetByPathname.set(pathname, sheet)

  const store = createStore()

  replaceBodyHTMLString(
    renderToString(
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          {bodyComponent}
        </StyleSheetManager>
      </Provider>
    )
  )
}

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheet = sheetByPathname.get(pathname)
  if (sheet) {
    setHeadComponents([sheet.getStyleElement()])
    sheetByPathname.delete(pathname)
  }
}
