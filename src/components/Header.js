import React from 'react'
export default function Header({ title, subtitle }) {
  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/assets/pmlogo_white.png`} width="200px" alt="Popmoji" />
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </>
  )
}