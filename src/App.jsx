import {BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Profile from "./components/Profile.jsx"

import Settings from "./components/Settings.jsx"
import Login from "./components/Login.jsx"
import Body from "./components/Body.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
       
        <Routes>
           
           <Route path="/" element={<Body></Body>}>
           <Route path="/Profile" element={<Profile></Profile>}></Route>
           <Route path="/Settings" element={<Settings></Settings>}></Route>
           <Route path="/Login" element={<Login/>}></Route>
           </Route>
          </Routes>


      </BrowserRouter>


    </>
  )
}

export default App
