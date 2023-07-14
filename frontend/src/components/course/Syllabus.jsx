import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../../containers/Message";
import { useDispatch, useSelector } from "react-redux";
import { createSyllabus, removeSyllabus, syllabusLists } from "../../actions/course";
import Loader from "../../containers/Loader";

const Syllabus = () => {
  const params = useParams();
  const navigate = useNavigate()
  const location = useLocation()
  
  const [titles, setTitles] = useState("");
  const { title } = titles;

  const { sucess, error } = useSelector((state) => state.syllabusCreate);
  const {
    syllabuss,
    loading,
    error: errorSyllabus,
  } = useSelector((state) => state.syllabusList);
  const dispatch = useDispatch();

  const courseId = params.course_id;

  useEffect(() => {
    if (localStorage.getItem("access") == null)
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    dispatch(syllabusLists(courseId));
  }, [dispatch]);

  const handleClick = (syllabusId) => {
    dispatch(removeSyllabus(courseId, syllabusId))
    dispatch(syllabusLists(courseId));
  };

  const handleChange = (e) => {
    setTitles({ ...titles, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(titles);
    dispatch(createSyllabus(titles, courseId));
    dispatch(syllabusLists(courseId));
  };


  return (
    <div className="course_update">
     { error && 
        <Message type="error" message={error} />
     }
        <>
          <div>
            <h4>Create new syllabus</h4>
            <form onSubmit={handleSubmit}>
              <div className="dual_form">
                <div className="profile_container">
                  <input
                    className="profile_control"
                    onChange={handleChange}
                    placeholder="e.g deep knowledge of python"
                    type="text"
                    required
                    value={title}
                    name="title"
                  />
                </div>
                <div className="tide">
                  <button type="submit" className="new">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="syllabus_list">
            <h4>List of syllabus</h4>
            {loading ? (
        <Loader />
      ) :(syllabuss.length == 0 ? (
              <div>
                <p>Your Syllabus is empty</p>
              </div>
            ) : 
              syllabuss.map((item, index) => {
                return (
                  <div className="dual_form sylla">
                    <div className="list">
                      <strong>{index + 1}.</strong>
                      <Link className="list_link"
                        key={item.syllabus_id}
                      >
                        {item.title}
                      </Link>
                    </div>
                    <div className="inline_edit">
                      {/* <div className=""> */}
                        <Link  to={`/course/edit/${courseId}/syllabus/${item.syllabus_id}`} className="cust_link">
                          Edit
                        </Link>
                      {/* </div> */}
                      {/* <div className=""> */}
                        <Link className="cust_link delete" onClick={()=>handleClick(item.syllabus_id)}>
                          Remove
                        </Link>
                      {/* </div> */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
    </div>
  );
};

export default Syllabus;
