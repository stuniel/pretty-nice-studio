// import React from 'react'
// import { Provider } from 'react-redux'
// import { renderToString } from 'react-dom/server'
// import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
// 
// import createStore from './src/state/createStore'
// 
// export const replaceRenderer = ({
//   bodyComponent,
//   replaceBodyHTMLString,
//   setHeadComponents,
// }) => {
//   const store = createStore()
//   const sheet = new ServerStyleSheet()
// 
//   const ConnectedBody = () => (
//     <Provider store={store}>
//       <StyleSheetManager sheet={sheet.instance}>
//         {bodyComponent}
//       </StyleSheetManager>
//     </Provider>
//   )
//   replaceBodyHTMLString(renderToString(<ConnectedBody />))
//   setHeadComponents([sheet.getStyleElement()])
// }
