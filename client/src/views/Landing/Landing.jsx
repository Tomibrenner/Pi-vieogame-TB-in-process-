import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.modules.css'

const Landing = () =>{
  return (
    <div className="MyImage">
        <img className="theImage" src="" alt="" />
        <Link to="/videogames">
          <button className="myButton">INSERT COIN</button>
        </Link>
    </div>
  )
}

export default Landing