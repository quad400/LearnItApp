import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { removeTopic, topicLists } from "../../actions/course";
import { Skeleton } from "antd";
import Message from "../../containers/Message";
import Loader from "../../containers/Loader";

const Topic = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const courseId = params.course_id;
  const syllabusId = params.syllabus_id;

  useEffect(() => {
    if (localStorage.getItem("access") == null)
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    dispatch(topicLists(courseId, syllabusId));
  }, []);

  const {
    topics,
    loading,
    error
  } = useSelector((state) => state.topicList);

  const handleClick = (syllabusId, topicId) => {
    dispatch(removeTopic(courseId, syllabusId, topicId))
    dispatch(topicLists(courseId, syllabusId));
  };

  return (
    <div className="course_update">
    {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
    <>
      <div className="profile_top">
        <h4>List of topics</h4>
        <div className="edit update">
          <Link
            to={`/course/edit/${courseId}/syllabus/${syllabusId}/create`}
            className="new"
          >
            Add new topic
          </Link>
        </div>
      </div>
      {topics.length == 0 ? (
        <div>
          <p>You have no topic</p>
        </div>
      ) : (
        topics.map((item, index) => {
          return (
            <div className="dual_form sylla">
              <div className="list">
                <strong>{index + 1}.</strong>
                <Link className="list_link" key={item.topic_id}>
                  {item.title}
                </Link>
              </div>
              <div className="inline_edit">
                  <Link
                    to={`/course/edit/${courseId}/${syllabusId}/topic/${item.topic_id}`}
                    className="cust_link"
                  >
                    Edit
                  </Link>
                  <Link className="cust_link delete" onClick={()=>handleClick(syllabusId, item.topic_id)}>Remove</Link>
              </div>
            </div>
          );
        })
      )}
      </>
      )}

    </div>
  );
};

export default Topic;
