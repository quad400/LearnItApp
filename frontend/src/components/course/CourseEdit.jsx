import React from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const CourseEdit = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  if ((localStorage.getItem("access") == null)) navigate("/login", {state: {
    previousUrl: location.pathname
  }})
  const courseId = params.course_id
  return (
    <div className="home">
      <div className="profile_tabs">
        <Link to={`/course/edit/${courseId}`} className="profile_tab">
          Edit
        </Link>
        <Link to={`/course/edit/${courseId}/syllabus`} className="profile_tab">
          Syllabus
        </Link>
        <Link
          to={`/course/edit/${courseId}/requirement`}
          className="profile_tab"
        >
          Others
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default CourseEdit;
