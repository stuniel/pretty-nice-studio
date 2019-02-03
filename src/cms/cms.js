import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import SessionPreview from './preview-templates/SessionPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('session', SessionPreview)
