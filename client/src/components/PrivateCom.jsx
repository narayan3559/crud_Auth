import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateCom = () => {
  const auth = localStorage.getItem('userdata')
  console.log(auth)
  return auth? <Outlet /> : <Navigate to='/login' />
}

export default PrivateCom
