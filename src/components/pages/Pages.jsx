import React, { useState, useEffect } from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Login from "../Login/Login";
import Register from "../Register/Register";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
// import Property from "./pages/Property/Property";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyDetails from "./PropertyDetails";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import TypeProperty from "../blog/TypeProperty";
import MyBooking from "../blog/MyBooking";

const Pages = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    // Retrieve the token from localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  // You can now safely log the token
  if (token) {
    console.log(jwtDecode(token));
  }

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/typeProperty/:typeName" component={TypeProperty} />
          <Route exact path="/myBooking" component={MyBooking} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/:id" component={PropertyDetails} />
          {/* <Route exact component={AddPropertyModal} /> */}
        </Switch>
        <ToastContainer />
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
