import Home from '../pages/Home.page'
import Gallery from '../pages/Gallery.page'
import Marketplace from '../pages/Marketplace.page'
import Account from '../pages/Account.page'

export const ROUTES = [
  { name: "Home",         path: "/",          component: <Home />,        nav: true },
  { name: "Gallery",      path: "/gallery",   component: <Gallery />,     nav: true },
  { name: "Marketplace",  path: "/market",    component: <Marketplace />, nav: true },
  { name: "Account",      path: "/account",   component: <Account />,     nav: true },
]

export const NAV_ROUTES = ROUTES.filter(r => r.nav)