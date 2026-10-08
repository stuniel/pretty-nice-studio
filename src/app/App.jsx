// The whole site is this one React tree. Every Astro page renders it with
// `transition:persist`, so it stays mounted across navigations and Astro only
// re-renders it with the new page's props - the same model as gatsby-plugin-layout,
// which is what the page transitions in components/Transition.jsx rely on.
import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

import { createStore } from './state/createStore'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import CookiePolicyPage from './pages/CookiePolicyPage'
import MakingOfPage from './pages/MakingOfPage'
import NotFoundPage from './pages/NotFoundPage'
import AboutPage from './templates/about-page'
import SessionPage from './templates/session'

const PAGES = {
  home: HomePage,
  session: SessionPage,
  about: AboutPage,
  contact: ContactPage,
  making_of: MakingOfPage,
  cookie_policy: CookiePolicyPage,
  not_found: NotFoundPage,
}

let store
const getStore = () => (store ||= createStore())

// Keep layout-only props (isTablet, menuOpen, ...) off DOM elements, like styled-components v4 did.
const shouldForwardProp = (prop, target) => (typeof target === 'string' ? isPropValid(prop) : true)

export default function App ({ route, pathname, data, pageContext }) {
  const location = React.useMemo(() => ({ pathname, key: pathname }), [pathname])
  const Page = PAGES[route]

  return (
    // Text-node injection: the client router moves these <style> tags into the next
    // page's <head> (see layouts/Base.astro), which would drop CSSOM-inserted rules.
    <StyleSheetManager disableCSSOMInjection shouldForwardProp={shouldForwardProp}>
      <Provider store={getStore()}>
        <Layout location={location}>
          <Page data={data} location={location} pageContext={pageContext} />
        </Layout>
      </Provider>
    </StyleSheetManager>
  )
}
