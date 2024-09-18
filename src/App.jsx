import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Carsettings from './Pages/CarSettings/Carsettings'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/adminpanel' element={<Carsettings/>}/>
      </Routes>
    </>
  )
}

export default App
