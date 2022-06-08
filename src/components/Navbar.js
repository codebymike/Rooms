import React from 'react'
import { Link } from "react-router-dom"
import { NAV_ROUTES } from '../config/routes.config'
import { useAuth } from '../providers/AuthProvider'
import { useUser } from '../providers/UserProvider'

export default function Navbar() {

  const { user, logOut } = useAuth();
  const { balance } = useUser();

  const NavItem = ({ route }) => (
    <li className='sm:inline-block'>
      <Link to={route.path} className='p-3'>
        {route.name}
      </Link>
    </li>
  )

  return (
      <nav className='flex justify-between mx-auto px-4 sm:px-6 py-4'>
        <div className='logo'>
          <Link to="/" >
          <img src={`${process.env.PUBLIC_URL}/assets/pmlogo_white.png`} width="200px" alt="Popmoji" />
          </Link>
        </div>
        <ul className='sm:self-center'>
          { NAV_ROUTES.map(item => <NavItem route={item} key={item.path} />) }

          {user && balance &&
            <>
              <li className='sm:inline-block'>
                <Link to="/" onClick={() => logOut()} className='p-3'>
                Logout
                  </Link>
              </li>
              <li  className='sm:inline-block'>
                [PopmojiCoins: {parseFloat(balance).toFixed(3)}]
              </li>
            </>
          }

        </ul>
      </nav>
  )
}