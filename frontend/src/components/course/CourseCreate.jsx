import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { courseCreate } from "../../actions/course";
import { connect, useDispatch } from "react-redux";
import { parseResponse } from "../../constants";
import axios from "axios";
import {
  CATEGORY_LOADED_SUCCESS,
  CATEGORY_LOADED_FAIL,
} from "../../constants/types";

const CourseCreate = ({ courseCreate,success }) => {
  const initialState = {
    title: "",
    category: "",
    price: "",
    previous_price: "",
    detail: "",
    description: "",
    level: "",
  };
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
        console.log(categories);
      } catch (error) {
        dispatch({
          type: CATEGORY_LOADED_FAIL,
          payload: error.response,
        });
      }
    };

    getCategory();
    if (success){
      navigate("/mycourses")
    }
  }, [dispatch,success]);

  const [thumbnail, setThumbnail] = useState("");

  const [form, setForm] = useState(initialState);

  const { title, category, price, level, previous_price, detail, description } =
    form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    courseCreate(form, thumbnail);

  };

  return (
    <div className="create_course_box">
      <h5>Create your Course landing Page</h5>

      <p>
        Your course landing page is crucial to your success on LearnIt. if it's
        done right, it can also help you gain visibility in search engines like
        Google. As you complete this section, think about creating a compelling
        Course Landing Page that demonstrates why someone would want to enroll
        in your course.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="profile_container">
          <label htmlFor="title">Title</label>
          <input
            className="profile_control"
            onChange={handleChange}
            required
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
              required
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
              onChange={uploadFileHandler}
            />
          </div>
        </div>
        <div className="profile_container">
          <label htmlFor="description">Description</label>
          <textarea
            className="profile_control"
            onChange={handleChange}
            required
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
            required
            placeholder="I am a software developer..."
            name="detail"
            value={detail}
          />
        </div>
        <div className="tide">
          <button type="submit" className="new">
          Submit for Review
          </button>
        </div>
        {/* <Link to="/tutor" className="auth__submit update_btn"> */}
        {/* <button data-target="#exampleModalCenter">Submit for Review</button> */}
        {/* </Link> */}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  success: state.course.success,
})


export default connect(null, { courseCreate })(CourseCreate);
