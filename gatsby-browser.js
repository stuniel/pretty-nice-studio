/* globals window */

import objectFitImages from 'object-fit-images'

const injectCookieHubScript = () => {
  function addSrc (src, async) {
    let s = document.createElement(`script`)

    s.src = src
    s.async = async
    document.getElementsByTagName(`head`)[0].appendChild(s)
  }

  function addJS (jsCode) {
    let s = document.createElement(`script`)

    s.type = `text/javascript`
    s.innerText = jsCode
    document.getElementsByTagName(`head`)[0].appendChild(s)
  }
  addSrc('https://www.googletagmanager.com/gtag/js?id=UA-133769927-1', true)
  addJS(`
    var gtagId = 'UA-133769927-1';
    window['ga-disable-' + gtagId] = true;
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  `)
  addSrc('https://cookiehub.net/cc/a360cb7f.js')
  addJS(`
    window.addEventListener("load", function() {
    window.cookieconsent.initialise({
      onInitialise: function(status) {
        if (this.hasConsented('required')) {
        }
        if (this.hasConsented('analytics')) {
          window['ga-disable-UA-133769927-1'] = false;
          gtag('config', gtagId);
        }
        if (this.hasConsented('marketing')) {
        }
      },
      onAllow: function(category) {
        if (category == 'required') {
        }
        if (category == 'analytics') {
          window['ga-disable-UA-133769927-1'] = false;
          gtag('config', gtagId);
        }
        if (category == 'marketing') {
        }
      },
      onRevoke: function(category) {
        if (category == 'required') {
        }
        if (category == 'analytics') {
          window['ga-disable-UA-133769927-1'] = true;
        }
        if (category == 'marketing') {
        }
      }
    })
    });
  `)
}

let injectedCookieHubScript = false

export const onClientEntry = () => {
  if (!injectedCookieHubScript) {
    injectCookieHubScript()
    injectedCookieHubScript = true
  }
}

export const onInitialClientRender = () => {
  objectFitImages()
}
