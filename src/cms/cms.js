import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import SessionPreview from './preview-templates/SessionPreview'

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('session', SessionPreview)
