import React, { useEffect, useState } from "react";
import { courseUpdate, courseDetail } from "../../actions/course";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { parseResponse } from "../../constants";
import {
  CATEGORY_LOADED_FAIL,
  CATEGORY_LOADED_SUCCESS,
} from "../../constants/types";
import Message from "../../containers/Message";
import Loader from "../../containers/Loader";

const CourseUpdate = () => {
  const initialState = {
    title: "",
    category: "",
    price: "",
    previous_price: "",
    detail: "",
    description: "",
    level: "",
  };
  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.course_id;
  const courseDetails = useSelector((state) => state.courseDetails);
  const courseUpdates = useSelector((state) => state.courseUpdates);

  const { course, loading, error } = courseDetails;
  const {
    data,
    sucess,
    loading: loadingUpdate,
    error: errorUpdate,
  } = courseUpdates;

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialState);
  const [thumbnail, setThumbnail] = useState("");
  const [intro, setIntro] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { title, category, price, level, previous_price, detail, description } =
    form;

  useEffect(() => {
    if (localStorage.getItem("access") == null)
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    if (!course.title || course.course_id !== courseId) {
      dispatch(courseDetail(courseId));
    } else {
      setForm(course);
      setErrors(errorUpdate);
    }

    const getCategory = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/category/`);
        const new_res = parseResponse(res.data);
        setCategories(new_res);
        dispatch({
          type: CATEGORY_LOADED_SUCCESS,
          payload: new_res,
        });
        // console.log(categories);
      } catch (error) {
        dispatch({
          type: CATEGORY_LOADED_FAIL,
          payload: error.response,
        });
      }
    };
    getCategory();
  }, [dispatch, courseId, course, sucess]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadThumbanailHandler = async (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const uploadIntrolHandler = async (e) => {
    const file = e.target.files[0];
    setIntro(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(courseUpdate(form, thumbnail, courseId));
  };

  return (
    <>
      <div className="course_update">
        {/* {loadingUpdate && <Skeleton />} */}
        {errors && <Message variant="danger">{errors}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="course_profile">
              <form onSubmit={handleSubmit}>
                <div className="profile_container">
                  <label htmlFor="title">Title</label>
                  <input
                    className="profile_control"
                    onChange={handleChange}
                    placeholder="eg: Learn django from quadri"
                    type="text"
                    value={title}
                    name="title"
                  />
                </div>
                <div className="dual_form">
                  <div className="profile_container">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      value={category}
                      className="profile_control"
                      onChange={handleChange}
                    >
                      <option>choose category</option>

                      {categories.map((item, index) => {
                        return (
                          <option key={index} value={item.category_id}>
                            {item.name}
                          </option>
                        );
                      })}
                      {/* <option value="Business">Business</option> */}
                    </select>
                  </div>
                  <div className="profile_container">
                    <label htmlFor="level">Level</label>
                    <select
                      name="level"
                      value={level}
                      className="profile_control"
                      onChange={handleChange}
                    >
                      <option>choose level</option>
                      <option value="General">General</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advance">Advance</option>
                    </select>
                  </div>
                </div>
                <div className="dual_form">
                  <div className="profile_container">
                    <label htmlFor="price">Price</label>
                    <input
                      className="profile_control"
                      onChange={handleChange}
                      placeholder="$200"
                      type="number"
                      value={price}
                      name="price"
                    />
                  </div>
                  <div className="profile_container">
                    <label htmlFor="previous_price">Previous Price</label>
                    <input
                      className="profile_control"
                      onChange={handleChange}
                      placeholder="$300"
                      type="text"
                      value={previous_price}
                      name="previous_price"
                    />
                  </div>
                </div>
                <div className="dual_form">
                <div className="profile_container">
                  <label htmlFor="picture">Thumbnail</label>
                  <input
                    type="file"
                    name="picture"
                    // value={thumbnail}
                    className="profile_control"
                    onChange={uploadThumbanailHandler}
                  />
                </div>
                <div className="profile_container">
                  <label htmlFor="picture">Intro Video</label>
                  <input
                    type="file"
                    name="picture"
                    // value={thumbnail}
                    className="profile_control"
                    onChange={uploadIntrolHandler}
                  />
                </div>
                </div>
                <div className="profile_container">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="profile_control"
                    onChange={handleChange}
                    placeholder="I am a software developer..."
                    name="description"
                    value={description}
                  />
                </div>
                <div className="profile_container">
                  <label htmlFor="detail">Detail </label>
                  <textarea
                    className="profile_control"
                    onChange={handleChange}
                    placeholder="I am a software developer..."
                    name="detail"
                    value={detail}
                  />
                </div>
                <div className="auth__submit update_btn">
                  <button data-target="#exampleModalCenter">
                    Course Update
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CourseUpdate;

