import React from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="home">
      <div className="profile_tabs">

        <Link to="." className="profile_tab">Category</Link>
        <Link to="users" className="profile_tab">UserList</Link>
        <Link to="settings" className="profile_tab">Settings</Link>
      </div>

      <Outlet />
    </div>
  )
}

export default AdminPage