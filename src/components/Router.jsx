import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Home from './HomePage';
import Layout from './Layout';
import SignIn from './SignIn';
import Register from './Register';
import Forgotpw from './Forgotpw';
import Contact from './Contact';
import SubmitDocuments from './SubmitDocuments';
import ViewProfile from './Viewprofile';
import Viewprofile from './Viewprofile';
import LandingPage from './LandingPage';
import Admin from './Admin';
import Adminlogin from './Adminlogin';
import ProtectedRoute from '../Context/ProtectedRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="logout" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpw" element={<Forgotpw />} />
      <Route path="/documentsub" element={<SubmitDocuments />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ViewProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewprofile"
        element={
          <ProtectedRoute>
            <Viewprofile />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminlogin" element={<Adminlogin />} />
    </Routes>
  );
};

export default Router;
