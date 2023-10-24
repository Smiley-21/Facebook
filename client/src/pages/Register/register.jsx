import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== confirmpassword.current.value) {
      confirmpassword.current.setCustomValidity("Passwords are not maching");
      return;
    }

    if (password.current.value.length < 6) {
      password.current.setCustomValidity(
        "Length of Password should be more than 6 char"
      );
      return;
    }
    try {
      const existuser = await axios.get(`/users?email=${email.current.value}`);
      if (existuser) {
        email.current.setCustomValidity("User already registered");
        Navigate("/login");
        return;
      }
    } catch (err) {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: email.current.value,
        };
       await axios.post("/auth/register", user);
        Navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook
          </span>
        </div>
        <form className="registerRight" onSubmit={handleSubmit}>
          <div className="registerBox">
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              ref={email}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              ref={username}
              required
            />
            <input
              type="password"
              name=""
              id="password"
              placeholder="Password"
              className="registerInput"
              ref={password}
              required
            />
            <input
              type="password"
              name=""
              id="confirmpassword"
              placeholder="Confirm Password"
              className="registerInput"
              ref={confirmpassword}
              required
            />

            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button className="registerRegisterButton">Log into Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
