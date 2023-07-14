import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createFaq,
  createRequirement,
  createSkill,
} from "../../actions/course";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../containers/Message";

const Requirements = () => {
  const initialState = {
    question: "",
    answer: "",
  };
  const [require, setRequire] = useState("");
  const [skill, setSkill] = useState("");
  const [form, setForm] = useState(initialState);
  const { content } = require;
  const { question, answer } = form;
  const { contentSkill } = skill;
  const params = useParams();
  const dispatch = useDispatch();
  const courseId = params.course_id;

  const requirements = useSelector((state) => state.requirementCreate);
  // const courseUpdates = useSelector((state) => state.courseUpdates);

  const { sucess, error } = requirements;
  // const {
  //   data,
  //   sucess,
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  // } = courseUpdates;

  const handleChangeRequirement = (e) => {
    setRequire({ ...require, [e.target.name]: e.target.value });
  };

  const handleSubmitRequirement = async (e) => {
    e.preventDefault();
    console.log(require);
    dispatch(createRequirement(require, courseId));
  };
  const handleChangeSkill = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  const handleSubmitSkill = async (e) => {
    e.preventDefault();
    console.log(skill);
    dispatch(createSkill(skill, courseId));
  };
  const handleChangeFaq = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitFaq = async (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(createFaq(form, courseId));
  };

  return (
    <div className="course_update">
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>

          {/* Requirements */}
          <div className="requirements">
            <h4>Requirements</h4>
            <p>Add some requirements for this course</p>
            <form onSubmit={handleSubmitRequirement}>
              <div className="dual_form">
                <div className="profile_container">
                  <input
                    className="profile_control"
                    onChange={handleChangeRequirement}
                    placeholder="e.g deep knowledge of python"
                    type="text"
                    required
                    value={content}
                    name="content"
                  />
                </div>
                <div className="edit">
                  <button type="submit" className="new">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* skills */}
          <div className="requirements">
            <h4>Skill</h4>
            <p>Add some skill student will acquire in this course</p>
            <form onSubmit={handleSubmitSkill}>
              <div className="dual_form">
                <div className="profile_container">
                  <input
                    className="profile_control"
                    onChange={handleChangeSkill}
                    placeholder="e.g deep knowledge of python"
                    type="text"
                    required
                    value={contentSkill}
                    name="contentSkill"
                  />
                </div>
                <div className="edit">
                  <button type="submit" className="new">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* FAQ */}
          <div className="requirements">
            <h4>Frequently Asked Questions</h4>
            {/* <p>Add some skill student will acquire in this course</p> */}
            <form onSubmit={handleSubmitFaq}>
              <div className="dual_form">
                <div className="profile_container">
                  <input
                    className="profile_control"
                    onChange={handleChangeFaq}
                    placeholder="e.g deep knowledge of python"
                    type="text"
                    value={question}
                    name="question"
                    required
                  />
                </div>
                <div className="edit">
                  <button type="submit" className="new">
                    Add
                  </button>
                </div>
              </div>
              <textarea
                className="profile_control"
                onChange={handleChangeFaq}
                placeholder="I am a software developer..."
                name="answer"
                value={answer}
                required
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Requirements;
