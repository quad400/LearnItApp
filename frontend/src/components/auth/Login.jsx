import React, { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import GoogleButton from "react-google-button";
import { login } from "../../actions/auth";
import Message from "../../containers/Message";

const REACT_APP_GOOGLE_CLIENT_ID = '873380657679-hqtcem9visj3dod62fdjvr6ruu5iib0c.apps.googleusercontent.com'
const REACT_APP_BASE_BACKEND_URL = 'http://127.0.0.1:8000'

const Login = ({ login, isAuthenticated, isError }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    navigate(location?.state?.previousUrl ? location.state.previousUrl : "/");
  }

  // const openGoogleLoginPage = useCallback(() => {
  //   const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  //   const redirectUri = "accounts/google/";

  //   const scope = [
  //     "https://www.googleapis.com/auth/userinfo.email",
  //     "https://www.googleapis.com/auth/userinfo.profile",
  //   ].join(" ");

  //   const params = {
  //     response_type: "code",
  //     client_id: REACT_APP_GOOGLE_CLIENT_ID,
  //     redirect_uri: 'http://127.0.0.1:8000/accounts/google/',
  //     prompt: "select_account",
  //     access_type: "offline",
  //     scope,
  //   };

  //   const urlParams = new URLSearchParams(params).toString();

  //   window.location = `${googleAuthUrl}?${urlParams}`;
  // }, []);

  return (
    <div className="auth__container">
      <div className="auth__wrapper">
        <div className="auth__text">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        {isError && (
          <Message className="alert_error" message={isError} type="error" />
        )}
        <div className="auth__form">
          <form onSubmit={handleSubmit}>
            <div className="auth__form__container">
              <input
                className="auth__form__control"
                onChange={handleChange}
                required
                placeholder="Email"
                type="email"
                name="email"
              />
            </div>
            <div className="auth__form__container">
              <input
                className="auth__form__control"
                onChange={handleChange}
                required
                placeholder="Password"
                type="password"
                name="password"
              />
            </div>
            <div className="forget__password">
              <Link className="auth__link" to="/forget_password">
                forget password
              </Link>
            </div>
            <div className="auth__submit">
              <button data-target="#exampleModalCenter">Login</button>
            </div>
          </form>
        </div>
        {/* <div className="auth__google"> */}
          {/* <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                            </svg>
                            <div className="auth__google__text">
                                <p>Login with Google</p>
                                <Link to='/google'>Google</Link>

                            </div>
                        </button> */}
          {/* <GoogleButton
            onClick={openGoogleLoginPage}
            label="Sign in with Google"
            disabled={!REACT_APP_GOOGLE_CLIENT_ID}
          /> */}
        {/* </div> */}
        <div className="auth__account">
          <div className="auth__account__text">
            <p>Do not have an account?</p>
          </div>
          <Link className="auth__link" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isError: state.auth.isError,
});

export default connect(mapStateToProps, { login })(Login);
