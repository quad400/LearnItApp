import {
  COURSE_DETAIL_SUCCESS,
  COURSE_DETAIL_FAIL,
  COURSE_DETAIL_REQUEST,
  COURSE_FILTER_SUCCESS,
  COURSE_FILTER_FAIL,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  REQUIREMENT_CREATED_SUCCESS,
  REQUIREMENT_CREATED_FAIL,
  SYLLABUS_LIST_LOADED_FAIL,
  SYLLABUS_LIST_LOADED_SUCCESS,
  TOPIC_CREATE_SUCCESS,
  TOPIC_CREATE_FAIL,
  TOPIC_UPDATE_SUCCESS,
  TOPIC_UPDATE_FAIL,
  TOPIC_LOADED_SUCCESS,
  TOPIC_LOADED_FAIL,
  COURSE_REMOVE,
  SYLLABUS_REMOVE,
  TOPIC_REMOVE,
  COURSE_FILTER_ID_SUCCESS,
  COURSE_FILTER_ID_FAIL,
  COURSE_USER_SUCCESS,
  COURSE_USER_FAIL,
  CATEGORY_LOADED_SUCCESS,
  CATEGORY_LOADED_FAIL,
  CATEGORY_CREATED_SUCCESS,
  CATEGORY_CREATED_FAIL,
  CATEGORY_REMOVE,
} from "../constants/types";

export const courseDetailReducer = (
  state = {
    course: {
      profile: {},
      skills: [],
      syllabus: [],
      requirement: [],
      reviews: [],
    },
    loading: true,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case COURSE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case COURSE_DETAIL_SUCCESS:
      return { ...state, loading: false, course: action.payload };
    case COURSE_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseListReducer = (
  state = { data: { courses: [] }, loading: true },
  action
) => {
  switch (action.type) {
    case COURSE_FILTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case COURSE_FILTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const courseUserReducer = (
  state = { data: { courses: [] }, loading: true },
  action
) => {
  switch (action.type) {
    case COURSE_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case COURSE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const courseUpdateReducer = (
  state = {
    loading: true,
    data: {},
    sucess: false,
    error: null,
    isAuthenticated: false,
  },
  action
) => {
  switch (action.type) {
    case COURSE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        isAuthenticated: true,
        sucess: true,
      };
    case COURSE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const requirementCreateReducer = (
  state = {
    sucess: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case REQUIREMENT_CREATED_SUCCESS:
      return {
        ...state,
        sucess: true,
      };
    case REQUIREMENT_CREATED_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const syllabusCreateReducer = (
  state = {
    sucess: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case REQUIREMENT_CREATED_SUCCESS:
      return {
        ...state,
        sucess: true,
      };
    case REQUIREMENT_CREATED_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const syllabusListReducer = (
  state = {
    syllabuss: [],
    error: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case SYLLABUS_LIST_LOADED_SUCCESS:
      return {
        ...state,
        syllabuss: action.payload,
        loading: false,
      };
    case SYLLABUS_LIST_LOADED_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const topicListReducer = (
  state = {
    topics: [],
    error: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case TOPIC_LOADED_SUCCESS:
      return {
        ...state,
        topics: action.payload,
        loading: false,
      };
    case TOPIC_LOADED_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const topicCreateReducer = (
  state = {
    sucess: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case TOPIC_CREATE_SUCCESS:
      return {
        ...state,
        sucess: true,
      };
    case TOPIC_CREATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const topicUpdateReducer = (
  state = {
    success: false,
    error: null,
    successContent: "",
    data: {},
  },
  action
) => {
  switch (action.type) {
    case TOPIC_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        successContent: "Successfully updated topic",
        data: action.payload,
      };
    case TOPIC_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const topicDetailReducer = (
  state = {
    error: null,
    data: {},
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case TOPIC_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case TOPIC_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const courseFilterReducer = (
  state = { loading: true, success: false, error: null, data: { count: 1 } },
  action
) => {
  switch (action.type) {
    case COURSE_FILTER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        data: action.payload,
      };
    case COURSE_FILTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const courseFilterIdReducer = (
  state = { load: true, err: null, dat: {} },
  action
) => {
  switch (action.type) {
    case COURSE_FILTER_ID_SUCCESS:
      return {
        ...state,
        load: false,
        dat: action.payload,
      };
    case COURSE_FILTER_ID_FAIL:
      return {
        ...state,
        load: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export const courseRemoveReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case COURSE_REMOVE:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};

export const syllabusRemoveReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case SYLLABUS_REMOVE:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};

export const topicRemoveReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case TOPIC_REMOVE:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};



export const categoryCreateReducer = (
  state = {
    sucess: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case CATEGORY_CREATED_SUCCESS:
      return {
        ...state,
        sucess: true,
      };
    case CATEGORY_CREATED_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryListReducer = (
  state = {
    categories: [],
    error: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case CATEGORY_LOADED_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case CATEGORY_LOADED_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const categoryRemoveReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CATEGORY_REMOVE:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};