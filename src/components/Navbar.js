import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { NAV_ROUTES } from '../config/routes.config'

export default function Navbar() {
  const navigate = useNavigate()

  const NavItem = ({ route }) => (
    <div>
      <div className="btn" onClick={() => navigate(route.path)}>
        {route.name}
      </div>
    </div>
  )

  return (
    <>
      <div className="navbar">
        {NAV_ROUTES.map(item => <NavItem route={item} key={item.path} />)}
      </div>
    </>
  )
}