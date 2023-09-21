import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // axios.defaults.withCredentials = true;
  const onSubmitForm = async (e) => {
    console.log("clicked");

    axios({
      method: "post",
      url: "/api/auth/register",
      data: data,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          //navigate kara denge home page pe
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
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
              placeholder="Name"
              className="loginInput"
              onChange={(e) => {
                onInputChange(e);
              }}
              name="username"
              value={data.username}
            />
            <input
              placeholder="Email"
              className="loginInput"
              onChange={(e) => {
                onInputChange(e);
              }}
              name="email"
              value={data.email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              onChange={(e) => {
                onInputChange(e);
              }}
              name="password"
              value={data.password}
            />
            <label style={{ fontWeight: "700", fontSize: "15px" }}>
              Select Type
            </label>
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <span>
                <label htmlfor="buyer" style={{ marginRight: "15px" }}>
                  Buyer
                </label>
                <input
                  type="radio"
                  id="buyer"
                  name="role"
                  value="ROLE_BUYER"
                  onChange={(e) => onInputChange(e)}
                />
              </span>
              <span>
                <label htmlFor="agent" style={{ marginRight: "15px" }}>
                  Agent
                </label>
                <input
                  type="radio"
                  id="agent"
                  name="role"
                  value="ROLE_AGENT"
                  onChange={(e) => onInputChange(e)}
                />
              </span>
            </div>
            {/* <input placeholder="Password Again" className="loginInput" /> */}
            <button
              className="loginButton"
              onClick={() => {
                onSubmitForm();
              }}
            >
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
