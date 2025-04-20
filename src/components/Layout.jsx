import React from 'react'
import Footer from './Footer'
import Nav from "./Nav"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Nav/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout
