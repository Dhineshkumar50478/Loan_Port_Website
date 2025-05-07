import React from 'react'
import About from "./About"
import Home from "./HomePage"
import {Route, Routes} from "react-router-dom"
import Layout from './Layout'
import SignIn from './SignIn'
import Register from './Register'
import Forgotpw from './Forgotpw'
import Contact from './Contact'
import SubmitDocuments from './SubmitDocuments'
import Profile from './Profile'
import Viewprofile from './Viewprofile'
import LandingPage from './LandingPage'
import Admin from './Admin'
import Adminlogin from './Adminlogin'

const Router = () => {
  return (
    <>
     <Routes>
  <Route path="/" element={<LandingPage />} /> {/* Splash screen route */}

  <Route path="/home" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="logout" element={<LandingPage />} />
  </Route>

  <Route path="/login" element={<SignIn />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgotpw" element={<Forgotpw />} />
  <Route path="/documentsub" element={<SubmitDocuments />} />
  <Route path="/create-profile" element={<Profile />} />
  <Route path="/view-profile" element={<Viewprofile />} />
  <Route path="/admin" element={<Admin/>}/>
  <Route path="/adminlogin" element={<Adminlogin/>}/>
</Routes>
        
    </>
  )
}

export default Router
