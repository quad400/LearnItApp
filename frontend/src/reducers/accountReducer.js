import {
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_COURSE_DETAIL_REQUEST,
  ACCOUNT_COURSE_DETAIL_SUCCESS,
  ACCOUNT_COURSE_DETAIL_FAIL
} from "../constants/types";

export const accountDetailReducer = (

  state = { userInfo: {skills:[]} },
  action
) => {
  switch (action.type) {
    case ACCOUNT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_DETAIL_SUCCESS:
      // localStorage.setItem("userInfo",action.payload.userInfo)
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case ACCOUNT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const accountCourseDetailReducer = (
  state = { courseInfo: {courses:[]} , loading: true},
  action
) => {
  switch (action.type) {
    case ACCOUNT_COURSE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        courseInfo: action.payload,
      };

    case ACCOUNT_COURSE_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const accountSelfDetailReducer = (
  state = { user: null, isAuthenticated: false, error: {} },
  action
) => {
  switch (action.type) {
    case ACCOUNT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case ACCOUNT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const accountUpdateReducer = (
  state = { userInfo: { profile: {} } },
  action
) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case ACCOUNT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
