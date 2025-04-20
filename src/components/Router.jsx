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
import Faqs from "./Faqs"

const Router = () => {
  return (
    <>
     <Routes>
  <Route path="/" element={<LandingPage />} /> {/* Splash screen route */}

  <Route path="/home" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="/home/about" element={<About />} />
    <Route path="/home/contact" element={<Contact />} />
    <Route path="/home/logout" element={<LandingPage />} />
    <Route path='/home/Faq' element={<Faqs/>}/>
  </Route>

  <Route path="/login" element={<SignIn />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgotpw" element={<Forgotpw />} />
  <Route path="/documentsub" element={<SubmitDocuments />} />
  <Route path="/create-profile" element={<Profile />} />
  <Route path="/view-profile" element={<Viewprofile />} />
</Routes>
        
    </>
  )
}

export default Router
