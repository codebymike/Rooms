import React from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'

export default function Marketplace() {
  const navigate = useNavigate()

  return (
    <>
      <Header
        title={<>Rooms</>}
        subtitle={<>Account</>}
      />
    </>
  )
}
