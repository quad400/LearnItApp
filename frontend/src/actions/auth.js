import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGOUT,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESEND_ACTIVATION_FAIL,
  RESEND_ACTIVATION_SUCCESS,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
} from "../constants/types";
import axios from "axios";

export const resend_activation = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}auth/users/resend_activation/`,
      body,
      config
    );
    dispatch({
      type: RESEND_ACTIVATION_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESEND_ACTIVATION_FAIL,
      payload: "Enter a valid email",
    });
  }
};

export const forget_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}auth/users/reset_password/`,
      body,
      config
    );
    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
    });
    // window.location.reload();
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
    });
  }
};

export const reset_password =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
    } catch (error) {
      console.log(error.response.data);
      const res = error.response.data;
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: res.new_password || res.token || res.non_field_errors,
      });
    }
  };
// new_password,token,non_field_errors

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const signup =
  (email, fullname, password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, fullname, password });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}accounts/create/user/`,
        body,
        config
      );
      // <Navigate to='/'/>

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: SIGNUP_FAIL,
        payload:
          error.response.data.non_field_errors || error.response.data.password,
      });
    }
  };

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}auth/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data))
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("auth", JSON.stringify(res.data))
    dispatch(load_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.detail,
    });
  }
};

export const activate = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}accounts/activate/`,body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (error) {
    console.log();
    dispatch({
      type: ACTIVATION_FAIL,
      payload: error.response.data.detail,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  localStorage.removeItem("access")
  localStorage.removeItem("userInfo")
  localStorage.removeItem("cartItems")
  localStorage.removeItem("auth")
};

export const googleAuthenticate = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(load_user());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err
      });
    }
  }
};
