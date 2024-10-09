import React from 'react'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Landing from './pages/Landing'
import { BrowserRouter ,Routes, Route } from "react-router-dom"

const routes = (
  <BrowserRouter>
  <Routes>
     <Route path='/Dashboard' element={<Home></Home>}></Route>
     <Route path='/' element={<Landing></Landing>}></Route>
    <Route path='/signup' element={<SignUp></SignUp>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
  </Routes>
  </BrowserRouter>
)
const App = () => {
  return (
    <div>
     {routes}
     
    </div>
  )
}

export default App