


import React from 'react'
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
  <div className="home">
    <div className="profile_tabs">
      <Link to='/profile' className="profile_tab">
        Profile Detail
      </Link>
      <Link to="/profile/update" className="profile_tab">
        Profile Update
      </Link>
    </div>

    <Outlet />
  </div>
  )
}

export default Profile