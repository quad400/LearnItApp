import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { accountCourseDetail } from "../../actions/account";
import Loader from "../../containers/Loader";
import { removeCourse } from "../../actions/course";

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()

  const accountCourseDetails = useSelector(
    (state) => state.accountCourseDetails
  );
  const { courseInfo, loading } = accountCourseDetails;

  useEffect(() => {
    dispatch(accountCourseDetail());
    if ((localStorage.getItem("access") == null)) navigate("/login", {state: {
      previousUrl: location.pathname
    }})
  }, [dispatch]);

  const handleClick = (e) => {
    dispatch(removeCourse(e))
  };

  return (
    <>
      <div className="profile_form">
        <div className="title">
          <h4>Courses</h4>
          <div className="tide">
            <Link className="new" to="/course/create">
              Add new course
            </Link>
          </div>
        </div>
        <div
          className="body"
          style={{
            marginTop: "20px",
          }}
        >
          {courseInfo.courses == 0 ? (
            <div>
              <p>Your Course page is empty</p>
            </div>
          ) : loading ? (
            <Loader />
          ) : (
            <>
              {courseInfo.courses.map((course) => (
                <div className="courses_list">
                  <Link
                    className="courses_list_link"
                    to={`/${course.course_id}`}
                  >
                    <div className="my_course_img">
                      <img
                        src={course.thumbnail}
                        alt="course"
                      />
                    </div>
                    <div className="des">
                      <h6 className="list_link">{course.title}</h6>
                      <p>${course.price}</p>
                    </div>
                  </Link>
                  <div>
                    <div className="inline_edit">
                      {/* <div className=""> */}
                      <Link
                        to={`/course/edit/${course.course_id}`}
                        className="cust_link"
                      >
                        Edit
                      </Link>
                      {/* </div> */}
                      {/* <div className=""> */}
                      <Link
                        className="cust_link delete"
                        onClick={() => handleClick(course.course_id)}
                      >
                        Remove
                      </Link>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;
