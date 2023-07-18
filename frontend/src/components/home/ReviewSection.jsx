import React from "react";

const ReviewSection = () => {
  return (
    <section>
      <h3>What our students say... </h3>

      <div className="reviews">
        <div className="review_card">
          <div className="review_card_top">
            <div className="card_image">
              <img
                src={require('../../assets/James_Hemgen.jpeg')}
                alt="James_Hemgen"
              />
            </div>
            <div className="card_titles">
              <h5>Jim Hemgen</h5>
              <p>Software developer</p>
            </div>
          </div>
          <p>
            Thanks to LearnIt Business, Booz Allen has armed our workforce,
            specifically its data scientists, with highly relevant and in-demand
            tech skills that are enabling consultants to stay ahead of big data
            trends and raise the bar on proficiency, skills, and competencies to
            meet client demand.
          </p>
        </div>

        <div className="review_card">
          <div className="review_card_top">
            <div className="card_image">
              <img

                src={require("../../assets/Ian_Stevens.png")}
                alt="Ian_Stevens"
              />
            </div>
            <div className="card_titles">
              <h5>Ismaeel Ameen</h5>
              <p>Head of Data Engineering Development and Data Management</p>
            </div>
          </div>
          <p>
            To stay at the leading edge of IT innovation, your team needs to
            regularly reinvent its skillset. With LearnIt Business, I can give
            my team the space to learn and take the initiative. It means we can
            produce higher quality work more quickly.
          </p>
        </div>
        <div className="review_card">
          <div className="review_card_top">
            <div className="card_image">
              <img
                src={require("../../assets/Karen_hunter.png")}
                alt="Karen_hunter"
              />
            </div>
            <div className="card_titles">
              <h5>Karen Hunter</h5>
              <p>America's Team Lead Learning & Development</p>
            </div>
          </div>
          <p>
            LearnIt has been a great platform to stay competitive in the digital
            transformation of the workplace by offering fresh, relevant,
            personalized on-demand learning content powered by a dynamic content
            marketplace.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
