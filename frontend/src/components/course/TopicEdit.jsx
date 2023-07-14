import React, { useEffect, useState } from "react";
import { topicDetail, topicLists, topicUpdate } from "../../actions/course";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../containers/Message";
import Loader from "../../containers/Loader";
import { Breadcrumb } from "antd";

const TopicEdit = () => {
  const initialState = {
    title: "",
    topic_type: "",
    locked: false,
  };
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate()
  const courseId = params.course_id;
  const syllabusId = params.syllabus_id;
  const topicId = params.topic_id;
  const { data, error, loading } = useSelector((state) => state.topicDetails);
  const { error: errorUpdate, success,successContent: successUpdate } = useSelector(
    (state) => state.topicUpdates
  );

  const [errors, setErrors] = useState("");
  const [successContent, setSuccessContent] = useState("");
  const [files, setFiles] = useState("");

  const [form, setForm] = useState(initialState);

  const { title, topic_type, locked } = form;

  useEffect(() => {
    if (!data.title || data.topic_id !== topicId) {
      dispatch(topicDetail(courseId, syllabusId, topicId));
    } else {
      setForm(data);
    }
  }, [dispatch, courseId, syllabusId, topicId, errorUpdate]);
  
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
    dispatch(topicUpdate(form, files, courseId, syllabusId, topicId));
    setErrors(errorUpdate);
    setSuccessContent(successUpdate);
    dispatch(topicLists(courseId, syllabusId));
    navigate(`/course/edit/${courseId}/syllabus/${syllabusId}`)
  };
  
  return (
    <div className="course_update">
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
            title: (
              <Link
                className="link"
                to={`/course/edit/${courseId}/syllabus/${syllabusId}`}
              >
                Topics
              </Link>
            ),
          },
          {
            title: "Topic",
          },
        ]}
      />
      {errors && <Message type="error" message={errors} />}
      {successContent && (
        <Message type="success" message={successContent} />
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="profile_update">
          <h3>Edit topic</h3>
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
                  Update topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicEdit;
