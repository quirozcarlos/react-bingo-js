import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'ordering-ui'
import { Router } from './router'
import theme from './theme.json'
import settings from './config.json'
import { WebsocketProvider } from '../src/context/WebsocketContext'

/**
 * Theme images
 */
import logotype from './assets/images/logotype.svg'
import logotypeInvert from './assets/images/logotype-invert.svg'
import isotype from './assets/images/isotype.svg'
import isotypeInvert from './assets/images/isotype-invert.svg'

import homeHero from './assets/images/home-hero.jpg'
import notFound from './assets/images/not-found.svg'
import notNetwork from './assets/images/not-network.svg'
import notFound404 from './assets/images/not-found-404.svg'


const logos = {
  logotype,
  logotypeInvert,
  isotype,
  isotypeInvert
}

theme.images = {
  logos,
  general: {
    homeHero,
    notFound,
    notFound404,
    notNetwork
  },
}

const wrapper = document.getElementById('app')
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <WebsocketProvider settings={Object.assign(settings.socket, { project: settings.project, appId: settings.app_id })}>
      <Router />
    </WebsocketProvider>
  </ThemeProvider>
  , wrapper)
