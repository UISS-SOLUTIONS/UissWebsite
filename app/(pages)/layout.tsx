import React, { ReactNode } from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

interface props{
    children: ReactNode
}

const WebLayout = ({children}: props) => {
  return (
    <div>
        <NavBar/>
        {children}
        <Footer/>
    </div>
  )
}

export default WebLayout