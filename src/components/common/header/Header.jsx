import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import AddPropertyModal from "../../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../../hooks/useAuthCheck.jsx";
import { getName, isToken } from "../../data/TokenData";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const history = useHistory();
  const [showMyList, setShowMyList] = useState(false);
  const handleAddPropertyClick = () => {
    console.log("Handle add click");
    // if (validateLogin()) {
    //   setModalOpened(true);
    // }
    setModalOpened(true);
  };
  const handleBookingList = () => {
    // Redirect to the "My Booking" page when the "My List" button is clicked
    history.push("/myBooking");
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };
  const userLoggedIn = isToken();

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="/images/logo.png" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav?.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div onClick={handleAddPropertyClick} style={{ cursor: "pointer" }}>
            Add Property
          </div>
          <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

          {/* Conditionally render the "My List" button if the user is logged in */}
          {userLoggedIn && (
            <div onClick={handleBookingList} style={{ cursor: "pointer" }}>
              My List
            </div>
          )}

          <div className="button flex" style={{ marginTop: "15px" }}>
            <Link to="/register">
              {!isToken() && (
                <button className="btn1" style={{ marginRight: "10px" }}>
                  <i className="fa fa-sign-out"></i> Register/Login
                </button>
              )}
              {isToken() && (
                <span
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    background: "none",
                    color: "#000",
                  }}
                >
                  Hello, {getName()}{" "}
                </span>
              )}
            </Link>
            {getName() && (
              <button
                style={{
                  background: "#000",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                onClick={(e) => logout(e)}
              >
                Logout
              </button>
            )}
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
