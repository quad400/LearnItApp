import { useEffect } from "react";
import { Avatar } from "antd";
import ReactStars from "react-rating-stars-component";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { accountDetail, accountCourseDetail } from "../../actions/account";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../containers/Card";
import { Col, Row } from "react-bootstrap";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const accountDetails = useSelector((state) => state.accountDetails);
  const accountCourseDetails = useSelector(
    (state) => state.accountCourseDetails
  );
  const { userInfo } = accountDetails;
  const { courseInfo } = accountCourseDetails;

  useEffect(() => {
    if (localStorage.getItem("access") == null) {
      return navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    }
    dispatch(accountCourseDetail());
    if (userInfo) {
      dispatch(accountDetail());
    }
  }, [dispatch]);

  return (
    <div className="home">
        <h3>Profile Detail</h3>
      <div className="profile_detail">
        <div className="profile_detail_top">
          <Avatar size={128} src={userInfo.picture} />
          {/* <div className="url_links">
                    <Link className='url_link'>Website</Link>
                    <Link className='url_link'>Website</Link>
                    <Link className='url_link'>Website</Link>
                    <Link className='url_link'>Website</Link>
                </div> */}
        </div>
        <div className="top">
          <h3>{userInfo.fullname}</h3>
          <h6>{userInfo.work_role}</h6>
          <div className="row">
            <div className="col">
              <p>Total Students</p>
              <h4>{courseInfo.total_enrolled_student}</h4>
            </div>
            <div className="col">
              <p>Reviews</p>
              <h4>{courseInfo.total_rate_count}</h4>
            </div>
            <div className="col">
              <p>Ratings</p>
              <div className="d-flex">
                <h4>{courseInfo.total_average_rate}</h4>
                <ReactStars
                  edit={false}
                  isHalf={true}
                  value={userInfo.total_average_rate}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bio">
          <h5>About me</h5>
          <p>{userInfo.bio}</p>
        </div>
        <div className="skills">
          <h5>My Skills</h5>
          <div className="skill">
            {userInfo.skills.map((skill) => (
              <p key={skill.skill_id}>{skill.skill}</p>
            ))}
          </div>
        </div>
        {/* <div className="other_course"> */}
        <Row>
          <h5>My Courses</h5>

          {courseInfo.courses.map((course) => (
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card props={course} />
            </Col>
          ))}
        </Row>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProfileDetail;
