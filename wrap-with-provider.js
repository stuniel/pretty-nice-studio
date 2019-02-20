import React from 'react'
import { Provider } from 'react-redux'
import Media from './src/components/Media'

import { store } from './src/state/createStore'

export default ({ element }) => {
  return (
    <Provider store={store}>
      <Media>
        {element}
      </Media>
    </Provider>
  )
}
