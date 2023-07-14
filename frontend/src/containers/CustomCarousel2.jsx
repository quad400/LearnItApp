import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card2 from "./Card2";
import { allCourses } from "../actions/course";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "antd";
import { responsive } from "../constants";
import Message from "./Message";

const CustomCarousel2 = () => {
  const dispatch = useDispatch();

  const popularCourse = useSelector((state) => state.course);
  const { loading, courses, isError } = popularCourse;
  useEffect(() => {
    dispatch(allCourses());
  }, [dispatch]);

  return loading ? (
    <Skeleton active />
  ) : isError ? (
    <Message variant="danger">{isError}</Message>
  ) : (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      // ssr={true}
      infinite={true}
      centerMode={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {courses.map((cou, index) => (
        <Card2 props={cou} key={index} />
      ))}
    </Carousel>
  );
};

export default CustomCarousel2;
