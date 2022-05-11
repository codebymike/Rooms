import React from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'

export default function Gallery() {
  const navigate = useNavigate()

  return (
    <>
      <Header
        title={<>Rooms</>}
        subtitle={<>Gallery</>}
      />
    </>
  )
}
