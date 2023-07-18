import {SETTINGS_CREATED_SUCCESS,SETTINGS_CREATED_FAIL} from "../constants/types";


export const settings = (form) => async (dispatch) => {
    const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}settings/`,
      { ...form },
      config
    );
    console.log(res.data);
    dispatch({
      type: SETTINGS_CREATED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SETTINGS_CREATED_FAIL,
      payload: error.response.data,
    });
  }
};