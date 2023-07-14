import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";


const FeatureCarousel = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    rtl: true,
    className: "center",
    centerMode: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
      },
      },
    ],
  };

  return (
    <Slider {...settings}>
          <div className="features__box">
            <div className="icon">
              <img src={require("../assets/icon1.png")} alt="my_image" />
            </div>
            <h5>Explore Courses</h5>
            <small>
              Explore some of our incredible courses.
            </small>
          </div>
          <div className="features__box">
            <div className="icon">
              <img
                src={require("../assets/icon2.png")}
                alt="my_image"
                className="icon__image"
              />
            </div>
            <h5>Best Instructors</h5>
            <small>
              Best instructors in stock to give lectures.
            </small>
          </div>
          <div className="features__box">
            <div className="icon">
              <img src={require("../assets/icon3.png")} alt="icon" />
            </div>
            <h5>Intense Learning</h5>
            <small>
              The most intense experience.
            </small>
          </div>
    </Slider>
  );
};

export default FeatureCarousel;
