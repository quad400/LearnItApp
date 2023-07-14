import Slider from "react-slick";
import Card2 from "./Card2";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselSlickCourse = ({courses}) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    // speed: 4000,
    className: "center",
    centerMode: true,
    cssEase: "linear",
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
          //   infinite: true,
        //   dots: true,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(courses)


  return (
    <Slider {...settings}>
      {courses.map((cou, index) => (
        <Card2 props={cou} key={index} />
      ))}
    </Slider>
  );
};

export default CarouselSlickCourse;
