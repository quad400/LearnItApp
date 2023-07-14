import { parseResponse } from "../constants";
import {
  COURSES_LOADED_SUCCESS,
  COURSES_LOADED_FAIL,
  COURSE_FILTER_SUCCESS,
  COURSE_FILTER_FAIL,
  COURSE_DETAIL_SUCCESS,
  COURSE_DETAIL_FAIL,
  COURSE_DETAIL_REQUEST,
  COURSE_CREATED_SUCCESS,
  COURSE_CREATED_FAIL,
  CATEGORY_LOADED_SUCCESS,
  CATEGORY_LOADED_FAIL,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  REQUIREMENT_CREATED_SUCCESS,
  REQUIREMENT_CREATED_FAIL,
  SYLLABUS_CREATED_SUCCESS,
  SYLLABUS_CREATED_FAIL,
  SYLLABUS_LIST_LOADED_SUCCESS,
  SYLLABUS_LIST_LOADED_FAIL,
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
  CATEGORY_CREATED_FAIL,
  CATEGORY_CREATED_SUCCESS,
  CATEGORY_REMOVE,
} from "../constants/types";
import axios from "axios";

export const categoryFilter =
  (category_id, sort_by, page) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}courses/${category_id}/${sort_by}/?page=${page}`,
        config
      );
      dispatch({
        type: CATEGORY_LOADED_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (error) {
      dispatch({
        type: CATEGORY_LOADED_FAIL,
        payload: error,
      });
    }
  };


export const categoryFilterId = (category_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/${category_id}/category/`,
      config
    );
    dispatch({
      type: COURSE_FILTER_ID_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: COURSE_FILTER_ID_FAIL,
      payload: error,
    });
  }
};

// ==========================course=======================

export const allCourses = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/`, config);
    dispatch({
      type: COURSES_LOADED_SUCCESS,
      payload: res.data,
    });
    console.log(res.data)
  } catch (error) {
    dispatch({
      type: COURSES_LOADED_FAIL,
      payload: error,
    });
  }
};

export const courseUser = (user_id) => async (dispatch) => {

    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/user/${user_id}`);
      dispatch({
        type: COURSE_USER_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (error) {
      dispatch({
        type: COURSE_USER_FAIL,
        payload: error,
      });
    }
};

export const courseFilterByCreator =
  (form, thumbnail, course_id) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      console.log(form);
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/`,
          { ...form, thumbnail: thumbnail },
          config
        );
        console.log(res.data);
        dispatch({
          type: COURSE_UPDATE_SUCCESS,
          payload: res.data.results,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: COURSE_UPDATE_FAIL,
          payload: error.response.data,
        });
      }
    } else {
      dispatch({
        type: COURSE_UPDATE_FAIL,
      });
    }
  };

export const courseDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAIL_REQUEST });
    const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/${id}/`);
    dispatch({
      type: COURSE_DETAIL_SUCCESS,
      payload: res.data,
    });
    // dispatch(accountDetail(res.data.user_id))
  } catch (error) {
    dispatch({
      type: COURSE_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const courseCreate = (form, thumbnail) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log(form);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/`,
        { ...form, thumbnail: thumbnail },
        config
      );
      console.log(res.data);
      dispatch({
        type: COURSE_CREATED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: COURSE_CREATED_FAIL,
        payload: error.response.data,
      });
    }
  }
};

export const courseUpdate =
  (form, thumbnail, course_id) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      console.log(form);
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/`,
          { ...form, thumbnail: thumbnail },
          config
        );
        console.log(res.data);
        dispatch({
          type: COURSE_UPDATE_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: COURSE_UPDATE_FAIL,
          payload: error.response.data,
        });
      }
    } else {
      dispatch({
        type: COURSE_UPDATE_FAIL,
      });
    }
  };

export const removeCourse = (courseId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${courseId}/`
    );
    dispatch({
      type: COURSE_REMOVE,
    });
  } catch (error) {
    console.log(error);
  }
};

// ============================================

export const createRequirement = (form, course_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/require/`,
      { ...form },
      config
    );
    console.log(res.data);
    dispatch({
      type: REQUIREMENT_CREATED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REQUIREMENT_CREATED_FAIL,
      payload: error.response.data,
    });
  }
};

export const createSkill = (form, course_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/skill/`,
      { ...form },
      config
    );
    console.log(res.data);
    dispatch({
      type: REQUIREMENT_CREATED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REQUIREMENT_CREATED_FAIL,
      payload: error.response.data,
    });
  }
};

export const createFaq = (form, course_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/faq/`,
      { ...form },
      config
    );
    console.log(res.data);
    dispatch({
      type: REQUIREMENT_CREATED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REQUIREMENT_CREATED_FAIL,
      payload: error.response.data,
    });
  }
};

// =================Syllabus==============================

export const createSyllabus = (form, course_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/syllabus/`,
      { ...form },
      config
    );
    console.log(res.data);
    dispatch({
      type: SYLLABUS_CREATED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SYLLABUS_CREATED_FAIL,
      payload: error.response.data,
    });
  }
};

export const syllabusLists = (course_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/syllabus/`,
      config
    );
    console.log(res.data);
    dispatch({
      type: SYLLABUS_LIST_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SYLLABUS_LIST_LOADED_FAIL,
      payload: error.response.data,
    });
  }
};

export const removeSyllabus = (courseId, syllabusId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${courseId}/syllabus/${syllabusId}/`
    );
    dispatch({
      type: SYLLABUS_REMOVE,
    });
  } catch (error) {
    console.log(error);
  }
};

// ==================Topics==========================

export const topicLists = (course_id, syllabus_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/${syllabus_id}/topic/`,
      config
    );
    console.log(res.data);
    dispatch({
      type: TOPIC_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: TOPIC_LOADED_FAIL,
      payload: error.response.data,
    });
  }
};

export const createTopic =
  (form, file, course_id, syllabus_id) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log(form, file);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/${syllabus_id}/topic/`,
        { ...form, file },
        config
      );
      console.log(res.data);
      dispatch({
        type: TOPIC_CREATE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: TOPIC_CREATE_FAIL,
        payload: error.response.data,
      });
    }
  };

export const topicUpdate =
  (form, file, course_id, syllabus_id, topic_id) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      console.log(form);
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/${syllabus_id}/topic/${topic_id}/`,
          { ...form, file: file },
          config
        );
        console.log(res.data);
        dispatch({
          type: TOPIC_UPDATE_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: TOPIC_UPDATE_FAIL,
          payload: error.response.data,
        });
      }
    } else {
      dispatch({
        type: COURSE_UPDATE_FAIL,
      });
    }
  };

export const topicDetail =
  (course_id, syllabus_id, topic_id) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${course_id}/${syllabus_id}/topic/${topic_id}/`,
          config
        );
        console.log(res.data);
        dispatch({
          type: TOPIC_UPDATE_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: TOPIC_UPDATE_FAIL,
          payload: error.response.data,
        });
      }
    } else {
      dispatch({
        type: COURSE_UPDATE_FAIL,
      });
    }
  };

export const removeTopic =
  (courseId, syllabusId, topicId) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_BACKEND_URL}courses/course/${courseId}/${syllabusId}/topic/${topicId}/`
      );
      dispatch({
        type: TOPIC_REMOVE,
      });
    } catch (error) {
      console.log(error);
    }
  };

// =================Category==============================

export const createCategory = (name) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/category/`,
      { name },
      config
    );
    console.log(res.data);
    dispatch({
      type: CATEGORY_CREATED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CATEGORY_CREATED_FAIL,
      payload: error.response.data,
    });
  }
};

export const categoryLists = () => async (dispatch) => {

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/category/`,
    );
    console.log(res.data);
    dispatch({
      type: CATEGORY_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CATEGORY_LOADED_FAIL,
      payload: error.response.data,
    });
  }
};

export const removeCategory = (categoryId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_BACKEND_URL}courses/category/${categoryId}/`
    );
    dispatch({
      type: CATEGORY_REMOVE,
    });
  } catch (error) {
    console.log(error);
  }
};



// ====================================================
