import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const initialState = "";
  const [data, setData] = useState({
    email: initialState,
    password: initialState,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(data);
  };

  return (
    <>
      <div className="login">
        <div className="form">
          <h2 className="form__title">Login to your account</h2>
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
              onChange={handleChange}
              value={data.email}
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
              onChange={handleChange}
              value={data.password}
            />
            <div className="form__container">
              <button className="button form__button" type="submit">
                SIGN IN
              </button>
              <div className="form__text-container">
                <p className="form__text">You're not a member?</p>
                <Link to="/signup" className="form__link">
                  Register here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
