import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Card = ({ props }) => {
  return (
    <div className="card">
      <Link className="card__image" to={`/${props.course_id}`}>
        <img
          src={props.thumbnail}
          alt="thumbnail"
        />
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
            <strong className="new__price">${props.price}</strong>
            {props.previous_price ? <del>${props.previous_price}</del> : <></>}
          </div>
        </div>
        {/* <div className="card__footer">
            <button className='buy'>BUY</button>
            <button className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            </button>
          </div> */}
      </Link>
      <div className="card__detail"></div>
    </div>
  );
};

export default Card;
