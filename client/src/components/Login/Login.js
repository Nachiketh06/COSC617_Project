import React, { useState, useEffect } from "react";
// import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    name: "",
    pass: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    // const error = {};
    // const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // if (!values.email) {
    //   error.email = "Email is required";
    // } else if (!regex.test(values.email)) {
    //   error.email = "Please enter a valid email address";
    // }
    // if (!values.password) {
    //   error.password = "Password is required";
    // }
    // return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();

      fetch("https://d391-204-62-51-191.ngrok-free.app/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'any_value'
    },
    body: JSON.stringify(user)
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    alert(data.message);
    setUserState(data.user);
    navigate("/", { replace: true });
  })
  .catch(error => {
    console.error('Error:', error);
  });
    // setFormErrors(validateForm(user));
    // setIsSubmit(true);
    // if (!formErrors) {

    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
     
    }
  }, [formErrors]);
  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="name"
          onChange={changeHandler}
          value={user.name}
        />
        <p >{formErrors.name}</p>
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="pass"
          onChange={changeHandler}
          value={user.pass}
        />
        <p >{formErrors.pass}</p>
        <button onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
