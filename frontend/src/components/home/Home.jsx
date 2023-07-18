import React from "react";
import CoursesType from "./CoursesType";
import Category from "./Category";
import Banner from "../../containers/Banner";
import FeatureCarousel from "../../containers/FeatureCarousel";
import ReviewSection from "./ReviewSection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__top__text">
          <h2>Getting
             <span>Quality Education</span> Is Now More Easy
          </h2>
          <p>
            We will provide you with latest online learning system and material
            that help your knowledge growing
          </p>
        </div>
        <div className="home__top__image">
          <img
            className="home__image"
            src={require("../../assets/img2.png")}
            alt="my_image"
          />
        </div>
      </div>
      <div className="feature_small">
        <FeatureCarousel />
      </div>
      <div className="features">
        <div className="features__container">
          <div className="features__box">
            <div className="icon">
              <img src={require("../../assets/icon1.png")} alt="my_image" />
            </div>
            <h5>Explore Courses</h5>
            <small>
            Explore some of our incredible courses.
            </small>
          </div>
          <div className="features__box">
            <div className="icon">
              <img
                src={require("../../assets/icon2.png")}
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
              <img src={require("../../assets/icon3.png")} alt="icon" />
            </div>
            <h5>Intense Learning</h5>
            <small>
            The most intense experience with nice UI.
            </small>
          </div>
        </div>
      </div>
      <div className="course__list">
        <CoursesType />
      </div>
      <div className="course_list">
        <Category />
      </div>
      <Banner />
      <ReviewSection />
      <section>
        <div className="banner_card">
          <div className="banner_card_text">
            <h3>Are you ready to start your course now!</h3>
          </div>
          <div>
            <div className="banner_btn">
              <Link className="banner_btn_text" to="/login">
                <span>Get Start</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
              </Link>
              <a className="banner_btn_text contact" href={'mailto:adedijiabdulquadri@gmail.com'}>Contact Us</a>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
