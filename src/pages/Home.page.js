import React from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Header
        title={<>Rooms</>}
        subtitle={<>Subtitle?</>}
      />
      <div className="btn" onClick={() => navigate("/test")}>
        Test Route
      </div>
    </>
  )
}
