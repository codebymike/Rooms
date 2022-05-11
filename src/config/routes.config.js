import Home from '../pages/Home.page'

export const ROUTES = [
  { name: "Home", path: "/", component: <Home />, nav: true }
]

export const NAV_ROUTES = ROUTES.filter(r => r.nav)