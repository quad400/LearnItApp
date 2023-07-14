import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Accordion from "./Accordion";
import { Avatar } from "antd";
import ShowMoreOrLess from "../../containers/ShowMoreOrLess";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { courseDetail, courseUser } from "../../actions/course";
import Loader from "../../containers/Loader";
import CarouselSlickCourse from "../../containers/CarouselSlickCourse";
import ReactPlayer from "react-player";
import axios from "axios";
import { fetchCart } from "../../actions/cart";

const CoursePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const courseDetails = useSelector((state) => state.courseDetails);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    loading: load,
    data
  } = useSelector((state) => state.courseUsers);
  const { loading, error, course } = courseDetails;
  // const [courses, setCourses] = useState([]);
  const [url, setUrl] = useState(null);
  const user_id = course.profile.user_id

  const handleClick = (file) => {
    setUrl(file);
    console.log("url", url);
  };

  const handleAddToCart = async (course_id) => {
    if (localStorage.getItem("access") != null) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      const userId = user.user_id;

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_BACKEND_URL}order/cart/${course_id}/`,
          { course_id, userId },
          config
        );
        console.log(res.data);

        dispatch(fetchCart());
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    }
  };

  useEffect(() => {
    if (!course.course_id || course.course_id !== params.id) {
      dispatch(courseDetail(params.id));
    }
    if (!loading) {
    const initialTopicFile = course?.intro;
    setUrl(initialTopicFile);
  }
    dispatch(courseUser(user_id));
   
    
  }, [dispatch,course, setUrl]);
  
  if (!load){
    console.log("data: ",data)
  }

  return (

    <div className="page">
      <div className="top">
        <div className="image_card">
          {loading ? (
            <Loader />
          ) : (
            <video
              autoPlay={true}
              className="image_card"
              src={url}
              preload="auto"
              controls
            />
          )}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="top__body">
            <h5>{course.title}</h5>
            <p>{course.detail}</p>
            <div className="card__rate">
              <p className="rate">{course.average_rate}</p>
              <ReactStars
                edit={false}
                isHalf={true}
                value={course.average_rate}
              />
              <Link className="link_style">({course.count_rate}) ratings</Link>
              <p className="icon_paragraph">{course.enrolled_count} students</p>
            </div>
            <div className="info">
              <p className="icon_paragraph">Created by</p>
              <Link className="link_style"> {course.user}</Link>
            </div>
            <div className="info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-octagon"
                color="white"
                viewBox="0 0 16 16"
              >
                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <p className="icon_paragraph">Last updated {course.updated}</p>
            </div>
            <div className="info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="16"
                fill="currentColor"
                class="bi bi-globe2"
                color="white"
                viewBox="0 0 16 16"
              >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
              </svg>
              <p className="icon_paragraph">English</p>
            </div>
            <div className="info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="16"
                fill="currentColor"
                class="bi bi-bar-chart"
                color="white"
                viewBox="0 0 16 16"
              >
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
              </svg>
              <p className="icon_paragraph">{course.level}</p>
            </div>
            <div className="price">
              <div className="dollar">
                <strong>$</strong>
                <strong>{course.price}</strong>
              </div>
              <div className="dollar">
                <del>$</del>
                <del>{course.previous_price}</del>
              </div>
              <p className="icon_paragraph">84% off</p>
            </div>
            <div className="buy_me">
              <div className="buy_text">
                <div className="to_cart">
                  <button onClick={() => handleAddToCart(course.course_id)}>
                    Add to cart
                  </button>
                </div>
                <div className="texts">
                  <p>30-Day Money-Back Guarantee</p>
                  <p>Full Lifetime Access</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="body">
        {loading ? (
          <Loader />
        ) : (
          <>
            {course.skills.length === 0 ? (
              <></>
            ) : (
              <div className="to_learn">
                <h4>What you'll learn</h4>
                <Row>
                  {course.skills.map((skill) => (
                    <Col key={skill.skill_id} className="column" md={6} xs={12}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-check2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                      </svg>
                      <p>{skill.content}.</p>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </>
        )}

        <div className="course_content">
          <h4>Course content</h4>
          <div className="container">
            <p className="syl_count">{course.syllabus_count} sections</p>
            <p className="syl_count">{course.total_topic_count} lectures</p>
          </div>
          <div className="details">
            {loading ? (
              <Loader />
            ) : (
              <>
                <Collapse defaultActiveKey={["1"]}>
                  {course.syllabus.map((syllabus) => (
                    <Collapse.Panel
                      defaultActiveKey={syllabus.syllabus_id[0]}
                      header=<strong>{syllabus.title}</strong>
                      key={syllabus.syllabus_id}
                      extra={`${syllabus.topic_count} lectures`}
                    >
                      <div className="container">
                        {syllabus.topics.map((topic) => (
                          <div className="title">
                            <div className="icon_course">
                              {topic.topic_type === "Video" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-play-btn"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                </svg>
                              ) : topic.topic_type === "Document" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-file-earmark"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                </svg>
                              ) : topic.topic_type === "Image" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-file-earmark"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-file-earmark-code"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                  <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z" />
                                </svg>
                              )}
                            </div>
                            <button
                              disabled={topic.locked}
                              onClick={() => handleClick(topic.file)}
                              className="course_link_style link_button"
                            >
                              {topic.title}
                            </button>
                            {topic.locked && (
                              <span
                                style={{
                                  fontSize: "9px",
                                  color: "gray",
                                }}
                              >
                                payment needed
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </>
            )}
          </div>
        </div>
        <div className="course_content">
          <h4>Requirements</h4>
          <ul>
            {course.requirement.map((requires) => (
              <li>
                <p>{requires.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="course_content">
          <h4>Description</h4>
          <div className="content">
            <p>{course.description}</p>
          </div>
        </div>
        <div className="course_content">
          <h4>Instructor</h4>
          <Link className="instruct">{course.profile.fullname}</Link>
          <p>{course.profile.work_role}</p>
          <div className="instruct_data">
            <div className="avatar">
              <Avatar
                size={128}
                src={`http://127.0.0.1:8000${course.profile.picture}`}
              />
            </div>
          </div>

          <div className="content">
            <p>{course.profile.bio}</p>
          </div>
        </div>
        {course.count_rate !== 0 && (
          <div className="course_content">
            <h4>{course.average_rate} course rating</h4>
            <h4>{course.count_rate} ratings</h4>
            <Row className="row">
              {course.reviews.map((review) => (
                <Col md={5} sm={6} xs={12}>
                  <div className="divide"></div>
                  <div className="review">
                    <div className="review_top">
                      <Avatar size={30} />
                      <div className="review_data">
                        <h6>{review.user}</h6>
                        <div className="review_rate_time">
                          <ReactStars edit={false} value={review.rate} />
                          <p>{review.created}</p>
                        </div>
                      </div>
                    </div>
                    <div className="review_body">
                      <ShowMoreOrLess slicer={100} data={review.comment} />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <Link className="review_show">Show all reviews</Link>
          </div>
        )}
      </div>
      <div className="home">
        <h4>
          More Courses by{" "}
          <Link className="instruct_name">{course.profile.fullname}</Link>
        </h4>
        <div className="more_course">
        {
          load ? <Loader /> : <CarouselSlickCourse courses={data}  />
        }
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
