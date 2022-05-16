import React from 'react'
import { Link } from "react-router-dom"
import { NAV_ROUTES } from '../config/routes.config'
import { useAuth } from '../providers/AuthProvider'
import Button from './Button'

export default function Navbar() {

  const {user, loggedIn, logIn} = useAuth();

  const NavItem = ({ route }) => (
    <li className='sm:inline-block'>
      <Link to={route.path} className='p-3'>
        {route.name}
      </Link>
    </li>
  )

  const WalletButton = () => {
    if (!user || !loggedIn){
      return (<li className='sm:inline-block'>
                <Button onClick={() => logIn()}>
                  Connect Wallet
                </Button>
            </li>)
    }else{
      return (<li className='sm:inline-block'>
              Balance 0p
            </li>)
    }

  }

  return (
      <nav className='flex justify-between mx-auto px-4 sm:px-6 py-4'>
        <div className='logo'>
          <img src={`${process.env.PUBLIC_URL}/assets/pmlogo_white.png`} width="200px" alt="Popmoji" />
        </div>
        <ul className='sm:self-center'>
          { NAV_ROUTES.map(item => <NavItem route={item} key={item.path} />) }

          <WalletButton />

        </ul>
      </nav>
  )
}