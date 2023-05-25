import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateCom from './components/PrivateCom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import View from './pages/View'
import Edit from './pages/Edit'
import Delete from './pages/Delete'
import Home from './pages/Home'
import Topbar from './components/Topbar'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateCom />}>
            <Route path="/fetch" element={<View />} />
            <Route path="/update" element={<Edit />} />
            <Route path="/delete" element={<Delete />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
//