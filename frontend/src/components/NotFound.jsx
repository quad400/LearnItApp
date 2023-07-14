import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='home'>
        <img className="not_found" src={`${process.env.STATIC_MEDIA}error.ce293654fc5b055593cf.jpg`} alt="error" />
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <h4>Go to</h4>
        <Link to="/" style={{
            fontSize: "16px",color: "#ff8811", textDecoration: "none", marginLeft:"10px"
        }}>Home</Link>
        </div>
    </div>
  )
}

export default NotFound