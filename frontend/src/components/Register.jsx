import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleRegistration(data);
  };

  return (
    <>
      <div className="register">
        <div className="form">
          <h2 className="form__title">Register your account</h2>
          <form className="form__set" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              id="email"
              className="form__input form__input-username"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              required
              autoComplete="on"
              value={data.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              className="form__input form__input-password"
              placeholder="Password"
              minLength="2"
              maxLength="40"
              required
              autoComplete="on"
              value={data.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`form__input form__input-password ${
                !data.password ? "form__input-confirm-password" : ""
              }`}
              placeholder="Confirm Password"
              minLength="2"
              maxLength="40"
              required
              autoComplete="on"
              value={data.confirmPassword}
              onChange={handleChange}
              disabled={!data.password}
            />
            <span className="form__error" id="form__error"></span>
            <div className="form__container">
              <button className="button form__button" type="submit">
                SIGN UP
              </button>
              <div className="form__text-container">
                <p className="form__text">Already a member?</p>
                <Link to="/signin" className="form__link">
                  Login here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
