import React, { useState } from "react";
import { createTopic, topicLists } from "../../actions/course";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../containers/Message";
import { Breadcrumb } from "antd";

const TopicCreate = () => {
  const initialState = {
    title: "",
    topic_type: "",
    locked: false,
  };

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { sucess, error } = useSelector((state) => state.topicCreate);
  const {isAuthenticated} = useSelector((state)=> state.auth);

  const courseId = params.course_id;
  const syllabusId = params.syllabus_id;

  const dispatch = useDispatch();

  const [files, setFiles] = useState("");

  const [form, setForm] = useState(initialState);

  const { title, topic_type, locked } = form;

  if (!isAuthenticated){
      navigate('/login', {
        state: {
          previousUrl: location.pathname
        }
      })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setFiles(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form)
    dispatch(createTopic(form, files, courseId, syllabusId));
    dispatch(topicLists(courseId, syllabusId));

  };

  return (
    <div className="course_update">
    {sucess && 
        (<Message type="success" message="Topic is added successfully" />)
    }
    { error && 
        <Message type="error" message={error} />
    }
      <div className="profile_update">
      <Breadcrumb
        items={[
          {
            title: (
              <Link className="link" to="/">
                home
              </Link>
            ),
          },
          {
            title: (
              <Link className="link" to={`/course/edit/${courseId}/syllabus`}>
                Syllabus
              </Link>
            ),
          },
          {
            title: "Topic"
          },
        ]}
      />
        <h4>Create new topic</h4>
        <div className="form">
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
            <div className="profile_container">
              <label htmlFor="topic_type">Topic Type</label>
              <select
                name="topic_type"
                value={topic_type}
                className="profile_control"
                onChange={handleChange}
              >
                <option>choose topic type</option>
                <option value="Video">Video</option>
                <option value="Image">Image</option>
                <option value="Document">Document</option>
              </select>
            </div>
            <div className="dual_form">
              <div className="profile_container">
                <label htmlFor="files">File</label>
                <input
                  type="file"
                  name="files"
                  // value={thumbnail}
                  className="profile_control"
                  onChange={uploadFileHandler}
                />
              </div>
              <div className="profile_container">
                <label htmlFor="locked">Locked</label>
                <input
                  type="checkbox"
                  name="locked"
                  value={locked}
                  className="profile_control"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="tide">
              <button type="submit" className="new">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopicCreate;
