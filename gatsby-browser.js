/* globals window */
import objectFitImages from 'object-fit-images'

import wrapWithProvider from './wrap-with-provider'

export const onInitialClientRender = () => {
  objectFitImages()
}

export const wrapRootElement = wrapWithProvider
