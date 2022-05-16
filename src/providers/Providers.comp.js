import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import TxProvider from './TxProvider'
import UserProvider from "./UserProvider"

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TxProvider>
          <UserProvider>
            <div className="app">
              {children}
            </div>
          </UserProvider>
        </TxProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}