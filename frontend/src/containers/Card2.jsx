import React from "react";
import { Link, Navigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCart } from "../actions/cart";
import { numberToPrice } from "../constants";

const Card2 = ({ props }) => {
  const courseId = props.course_id;
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleClick = async (course_id) => {

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
      <Navigate to="/login" />;
    }
  };

  return (
    <div className="card">
        <Link className="card__image" to={`/${props.course_id}`}>
          <img src={props.thumbnail} alt="thumbnail" />
        </Link>
      <Link to={`/${props.course_id}`} className="card__container">
        <div className="card__body">
          <h6>{props.title}</h6>
          <p>{props.user}</p>
          <div className="card__review">
            <div className="card__rate">
              <span className="rate">{props.average_rate}</span>
              <ReactStars
                edit={false}
                isHalf={true}
                value={props.average_rate}
              />
              <p className="rate__count">({props.count_rate})</p>
            </div>
          </div>
          <div className="card__price">
            <strong className="new__price">{numberToPrice(props.price)}</strong>
            { props.previous_price ? <del>{numberToPrice(props.previous_price)}</del> : <></>}
          </div>
        </div>
      </Link>
      <div className="card__footer">
        <Link onClick={() => handleClick(props.course_id)} className="buy">
          Add to cart
        </Link>

        <button className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </button>
      </div>
      <div className="card__detail"></div>
    </div>
  );
};

export default Card2;
