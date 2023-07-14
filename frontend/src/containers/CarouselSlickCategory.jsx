import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { parseResponse } from "../constants";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {
  CATEGORY_LOADED_FAIL,
  CATEGORY_LOADED_SUCCESS,
} from "../constants/types";
import Loader from "./Loader";

const CarouselSlickCategory = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    rtl: true,
    className: "center",
    centerMode: true,
    autoplaySpeed: 4000,
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

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const byCategory = useSelector((state) => state.course);
  const { loading } = byCategory;

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/category/`);
        const new_res = parseResponse(res.data);
        setCategories(new_res);
        dispatch({
          type: CATEGORY_LOADED_SUCCESS,
          payload: new_res,
        });
        console.log(new_res)
      } catch (error) {
        dispatch({
          type: CATEGORY_LOADED_FAIL,
          payload: error.response,
        });
      }
    };
    getCategory();
  }, [dispatch]);

  return (
    <>
      {!loading ? (
        <Slider {...settings}>
          {categories.map((category) => {
            return (

                <Link
                  className="category__card_link"
                  to={`category/${category.category_id}`}
                >
                  {category.name}
                </Link>
            );
          })}
        </Slider>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CarouselSlickCategory;
