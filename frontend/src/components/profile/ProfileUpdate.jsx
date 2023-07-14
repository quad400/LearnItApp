import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { accountSelfDetail, accountUpdate } from "../../actions/account";
import { Link, Navigate } from "react-router-dom";

const initialState = {
  title: "",
  work_role: "",
  bio: "",
  gender: "",
  picture: "",
  location: "",
  phone: "",
};

const ProfileUpdate = ({
  profile: { user, loading },
  accountSelfDetail,
  accountUpdate,
}) => {
  const [form, setForm] = useState(initialState);

  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (!user) accountSelfDetail();

    if (!loading && user) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setForm(userData);
    }
  }, [loading, user, setForm]);

  const { title, work_role, bio, gender, location, phone } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    accountUpdate(form, picture);
  };

  return (
    <div className="home">
      <h3>Profile Detail</h3>
      <div style={{
        paddingBottom: "20px"
      }}>
        <form onSubmit={handleSubmit}>
          <div className="profile_container">
            <label htmlFor="title">Title: </label>
            <select
              name="title"
              value={title}
              className="profile_control"
              onChange={handleChange}
            >
              <option>choose title</option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
            </select>
          </div>
          <div className="profile_container">
            <label htmlFor="work_role">Work Role: </label>
            <input
              className="profile_control"
              onChange={handleChange}
              placeholder="Work Role"
              type="text"
              value={work_role}
              name="work_role"
            />
          </div>
          <div className="profile_container">
            <label htmlFor="picture">Picture: </label>
            <input
              type="file"
              name="picture"
              // value={picture}
              className="profile_control"
              onChange={uploadFileHandler}
            />
          </div>
          <div className="profile_container">
            <label htmlFor="gender">Gender: </label>
            <select
              name="gender"
              className="profile_control"
              value={gender}
              onChange={handleChange}
            >
              <option>select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="profile_container">
            <label htmlFor="work_role">Phone: </label>
            <input
              className="profile_control"
              onChange={handleChange}
              placeholder="+234 0249552356"
              type="number"
              value={phone}
              name="phone"
            />
          </div>

          <div className="profile_container">
            <label htmlFor="work_role">Location: </label>
            <input
              className="profile_control"
              onChange={handleChange}
              placeholder="Zone 4,Ayekale, Ota-Efun, Osogbo, Osun, Nigeria"
              type="text"
              value={location}
              name="location"
            />
          </div>
          <div className="profile_container">
            <label htmlFor="bio">Bio: </label>
            <textarea
              className="profile_control"
              onChange={handleChange}
              placeholder="I am a software developer..."
              name="bio"
              value={bio}
            />
          </div>
          <div className="auth__submit update_btn">
            <button data-target="#exampleModalCenter">Account Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.accountSelfDetails,
});

export default connect(mapStateToProps, { accountUpdate, accountSelfDetail })(
  ProfileUpdate
);
