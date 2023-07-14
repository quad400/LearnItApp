import { Button, Drawer, Space, Avatar } from "antd";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CATEGORY_LOADED_SUCCESS,
  CATEGORY_LOADED_FAIL,
} from "../constants/types";
import axios from "axios";
import { parseResponse } from "../constants";
import { accountDetail } from "../actions/account";

const CustDrawer = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const accountDetails = useSelector((state) => state.accountDetails);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { loading, userInfo } = accountDetails;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const user_logout = () => {
    dispatch(logout());
  };
  const guestLinks = () => {
    return (
      <div className="drawer__account__links">
        <Link onClick={onClose} to="/login" className="login_link">
          Login
        </Link>
        <Link onClick={onClose} to="/signup" className="signup_link">
          Signup
        </Link>
      </div>
    );
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/category/`);
        const new_res = parseResponse(res.data);
        setCategories(new_res);
        dispatch({
          type: CATEGORY_LOADED_SUCCESS,
          payload: new_res,
        });
      } catch (error) {
        dispatch({
          type: CATEGORY_LOADED_FAIL,
          payload: error.response,
        });
      }
    };

    getCategory();

    if (userInfo) {
      dispatch(accountDetail());
    }
  }, [dispatch]);

  const authLinks = () => {
    return (
      <div className="drawer__account">
        <div className="account">
          <Avatar size={50} src={userInfo.picture} />
          <h5>Hi, {userInfo.fullname}</h5>
        </div>
        <Link onClick={user_logout} className="login_link">
          Logout
        </Link>
      </div>
    );
  };

  const handleClick = () => {
    onClose();
  };

  return (
    <>
      <Space>
        <Button type="light" onClick={showDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-list menu"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </Button>
      </Space>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width={250}
        bodyStyle={{
          margin: "0px",
          paddingTop: "20px",
          paddingRight: "0px",
          paddingLeft: "0px",
        }}
      >
        <div className="drawer__container">
          <div className="drawer__top">
            {isAuthenticated ? authLinks() : guestLinks()}
          </div>
          <div className="divide"></div>
          <div className="drawer__top">
            <p>Categories</p>
          </div>
          <ul className="category__drawer">
            {categories.map((category, index) => {
              return (
                <li key={category.category_id}>
                  <Link
                    key={category.category_id}
                    onClick={handleClick}
                    to={`category/${category.category_id}`}
                    className="category__link"
                  >
                    <span>{category.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  fullName: state.auth.isAuthenticated ? state.auth.user.fullname : null,
  picture: state.auth.isAuthenticated ? state.auth.user.picture : null,
});

export default connect(mapStateToProps)(CustDrawer);
