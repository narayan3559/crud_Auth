import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateCom from './components/PrivateCom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import View from './pages/View'
import Update from './pages/Update'
import Changepassword from './pages/Changepassword'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Topbar from './components/Topbar'
import Forgot from './pages/Forgot'
import Reset from './pages/Reset'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
      <ToastContainer />
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateCom />}>
            <Route path="/fetch" element={<View />} />
            <Route path="/update" element={<Update />} />
            <Route path="/changePassword" element={<Changepassword />} />
          </Route>
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/forgot/reset/:token" element={<Reset />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
//