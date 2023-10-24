import "./login.css";
import { LoginCall } from "../../apiCalls";
import { useRef } from "react";
import { AuthContext } from "../../contest/AuthContext";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    // console.log(password.current.value);

    LoginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
 
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              minLength="6"
              required
            />
            <button className="loginButton" disabled={isFetching} type="submit" >
              {isFetching ? <CircularProgress color="inherit" /> : "Log in"}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="inherit" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
