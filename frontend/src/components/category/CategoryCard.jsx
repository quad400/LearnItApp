import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {Skeleton} from 'antd';
import Loader from "../../containers/Loader";

const CategoryCard = ({props,loading,error}) => {

  return (
    // !loading || error ?
      <Link className="link" to={`/${props.course_id}`}>
        <div className="container">
          <div className="course__card">
            <div className="cat_card__image">
            {!loading ?
                <img src={props.thumbnail} alt="course_image" />:
                <Loader />
            }
            </div>
            <div className="card__body">
              <div className="top">
                <h4>{props.title}</h4>
                <h5>${props.price}</h5>
              </div>
              <p className="detail">{props.detail}</p>
              <p>{props.user}</p>
              <div className="card__rate">
                <p className="rate">{props.average_rate}</p>
                <ReactStars edit={false} isHalf={true} value={props.average_rate} />
                <p className="rate__count">({props.count_rate})</p>
              </div>
            </div>
          </div>
          <div className="divide"></div>
        </div>
      </Link>
    // :
    // <Skeleton active />
  );
};

export default CategoryCard;
