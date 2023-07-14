import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { logout } from "../actions/auth";
import Dropdowns from "../containers/Dropdowns";
import CustDrawer from "../containers/CustDrawer";
import Search from "./Search";
import { fetchCart, load_cart } from "../actions/cart";

const items = [
  {
    key: "1",
    label: (
      <Link className="drop_profile" to="/profile">
        Account
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link className="drop_profile" to="mycourses">
        My Courses
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link className="drop_profile" to="tutor">
        Become a tutor
      </Link>
    ),
  },
];

const Navbar = ({ logout, isAuthenticated,isAdmin }) => {
  const { shoppingCart, loading } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("access");
    // if(isAuthenticated) {
    dispatch(fetchCart());
    // }
  }, [dispatch]);

  const user_logout = () => {
    logout();
    navigate("/");
  };

  const guestLinks = () => {
    return (
      <>
        <Link to="/login" className="link login">
          Login
        </Link>
        <Link to="/signup" className="link signup">
          Signup
        </Link>
      </>
    );
  };



  const authLinks = () => {
    return (
      <Link onClick={user_logout} className="link signup">
        Logout
      </Link>
    );
  };

  return (
    <header>
      <div className="nav">
        <div className="nav__box">
          <div className="nav__drawer">
            <CustDrawer />
          </div>
          <div className="nav__logo">
            <Link className="logo" to="/">
              LEARNIT
            </Link>
          </div>
          <div className="nav__menu">
            <Dropdowns />
          </div>
          <Search />
          <div className="nav__right">
            <div className="nav-container__auth">
              {isAuthenticated ? authLinks() : guestLinks()}
            </div>
            <Link
              to="/cart"
              className="icon space_icon"
              style={{
                marginLeft: "15px",
              }}
            >
              <div className="cart_count">
                {isAuthenticated && (
                  <span className="count">
                    {shoppingCart !== null ? shoppingCart.items.length : 0}
                  </span>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-cart3"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </Link>

            {isAuthenticated && (
              <Dropdown placement="bottomLeft" menu={{ items }}>
                <Link
                  // to="profile/detail"
                  className="icon"
                  style={{
                    textDecoration: "none",
                    marginBottom: "-8px",
                    paddingBottom: "0px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                </Link>
              </Dropdown>
            )}

            {(isAuthenticated && isAdmin) && (
              <Link
                  to='admin'
                  className="icon"
                  style={{
                    textDecoration: "none",
                    marginBottom: "-8px",
                    paddingBottom: "0px",
                  }}
                >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-database-add"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z" />
                <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z" />
              </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.accountDetails.userInfo.admin
});

export default connect(mapStateToProps, { logout })(Navbar);
