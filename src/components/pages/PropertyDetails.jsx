import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Property.css";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const baseURL = "/api/properties/propertyList/";
const BrokenImage = "../images/list/p-1.png";

const PropertyDetails = () => {
  const { id } = useParams();
  const baseURL = `/api/properties/property/${id}`;
  const [data, setData] = useState();
  const [token, setToken] = useState();
  const [decodedToken, setDecodedToken] = useState();
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setData(res.data);
    });
  }, [baseURL]);

  useEffect(() => {
    // Check local storage for booking status when the component mounts
    const bookedStatus = localStorage.getItem(`property_${id}_booking_status`);
    if (bookedStatus) {
      setIsBooked(bookedStatus === "true");
    }
  }, [id]);

  useEffect(() => {
    // Retrieve the token from localStorage when the component mounts
    const storedToken = localStorage.getItem("key");
    console.log("Stored Token:", storedToken); // Debugging line
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    // You can now safely decode the token if it exists
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecodedToken(decodedToken);
        console.log("Decoded Token:", decodedToken); // Debugging line
      } catch (error) {
        // Handle any errors that occur during decoding
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const handleBooking = () => {
    // Prepare booking data (you can add more data if needed)
    // Make a POST request to book the property
    const userEmail = decodedToken.email; // Replace with the actual user ID
    localStorage.setItem("email", decodedToken.email);
    const propertyId = id; // Replace with the actual property ID
    console.log(userEmail);
    axios
      .post(`/api/booking/bookingProperty/${userEmail}/${propertyId}`)
      .then((response) => {
        // Handle success, e.g., show a success message
        localStorage.setItem(`property_${id}_booking_status`, "true");
        alert("Property booked successfully!");
        setIsBooked((prevIsBooked) => true);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        alert("Error booking property.");
        console.error("Error booking property:", error);
      });
  };
  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
  };
  return (
    <div class="card-wrapper">
      <div class="card">
        <div class="product-imgs">
          <div class="img-display">
            <div class="img-showcase">
              <img
                src={`data:image/jpeg;base64,${data?.imageData}`}
                onError={imageOnError}
                alt="imag not available"
              />
              <img
                src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                alt="imag not available"
              />
              <img
                src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                alt="imag not available"
              />
              <img
                src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                alt="imag not available"
              />
            </div>
          </div>
          {/* <div class="img-select">
            <div class="img-item">
              <a href="#" data-id="1">
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg"
                  alt="imag not availablee"
                />
              </a>
            </div>
            <div class="img-item">
              <a href="#" data-id="2">
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                  alt="imag not availablee"
                />
              </a>
            </div>
            <div class="img-item">
              <a href="#" data-id="3">
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                  alt="imag not availablee"
                />
              </a>
            </div>
            <div class="img-item">
              <a href="#" data-id="4">
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                  alt="imag not availablee"
                />
              </a>
            </div>
          </div> */}
        </div>

        <div class="product-content">
          <h2 class="product-title">{data?.title}</h2>
          <a href="/" class="product-link">
            visit 99acers
          </a>
          <div class="product-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div class="product-price">
            <p class="new-price">
              Price: <span>₹{data?.price}.00/sqft only</span>
            </p>
          </div>

          <div class="product-detail">
            <h2>Descrption </h2>
            <p>{data?.description}</p>
            <ul>
              <li>
                Location:{" "}
                <span>
                  {data?.city}, {data?.country}
                </span>
              </li>
              <li>
                Address:{" "}
                <span>
                  {data?.address}, {data?.areaCode}
                </span>
              </li>

              <li>
                Bedrooms: <span>{data?.bedrooms}</span>
              </li>
              <li>
                Bathrooms: <span>{data?.bathrooms}</span>
              </li>
            </ul>
          </div>

          {/* <div class="purchase-info">
            <button
              type="button"
              class="btn"
              style={{ backgroundColor: "blue" }}
              onClick={handleBooking}
            >
              Book Property
            </button>
          </div> */}
          <div className="purchase-info">
            {isBooked ? (
              <button
                className="btn"
                style={{ backgroundColor: "gray" }}
                disabled
              >
                Booked
              </button>
            ) : (
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "blue" }}
                onClick={handleBooking}
              >
                {isBooked ? "Booked" : "Book Property"}
              </button>
            )}
          </div>

          <div class="social-links">
            <p>Share At: </p>
            <a href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i class="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
