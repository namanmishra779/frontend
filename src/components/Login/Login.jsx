import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const history = useHistory();

  // State to store user input (email and password)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState({
  //   token: "",
  // });

  const handleLogin = async () => {
    try {
      // Perform your login logic here.
      // For example, make a POST request to your authentication endpoint.
      const response = await axios.post(
        "/api/auth/login",
        // method: "POST",
        { username, password }
      );

      if (response.status === 200) {
        console.log(response);
        // token["token"] = response.data.token;
        localStorage.setItem("key", JSON.stringify(response.data));
        // If login is successful, redirect to the home page.

        history.push("/");
        window.location.reload();
      } else {
        // Handle login failure, e.g., display an error message to the user.
        console.error("Login failed");
      }
    } catch (error) {
      // Handle network or other errors.
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">99acres</h3>
          <span className="loginDesc">
            Ghar lena ho ya bechna <br /> 99acres se hi puchna
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              className="loginInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" onClick={handleLogin}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
