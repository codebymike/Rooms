import React from 'react'
import { Route, Routes } from 'react-router-dom'

import NotFound from '../pages/NotFound.page'

export default function Router({ routes }) {
  const renderRoutes = routes.map((route) => {
    const { path, component } = route;
    return <Route path={path} element={component} key={path} exact />
  })

  return (
    <Routes>
      {renderRoutes}
      <Route element={<NotFound />} />
    </Routes>
  )
}
