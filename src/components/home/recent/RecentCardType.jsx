import React, { useEffect, useState } from "react";
import axios from "axios";
import { list } from "../../data/Data";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

//const baseURL = "/api/properties/propertyList";
const BrokenImage = "../images/list/p-1.png";
const RecentCard = ({ typeName }) => {
  // const navigate = () => {
  //   const history = useHistory();
  //   history.push(`http://localhost:8080/api/properties/propertyList${id}`);
  // };
  const [data, setData] = useState([]);
  const baseURL = `/api/properties/propertyList/${encodeURIComponent(
    typeName
  )}`;
  console.log(typeName);
  const fetchdata = async () => {
    const res = await axios.get(baseURL);
    setData(res.data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      {/* <div className="content grid3 mtop">
        {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                        category === "For Sale" ? "#25b5791a" : "#ff98001a",
                      color: category === "For Sale" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {category}
                  </span>
                  <i className="fa fa-heart"></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className="fa fa-location-dot"></i> {location}
                </p>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn2">{price}</button>{" "}
                  <label htmlFor="">/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          );
        })}
      </div> */}
      <div className="content grid3 mtop">
        {data.map((val, index) => {
          const {
            id,
            title,
            imageData,
            description,
            country,
            state,
            city,
            areacode,
            price,
            bedrooms,
            bathrooms,
            propertyArea,
            propertyType,
          } = val;
          const imageOnError = (event) => {
            event.currentTarget.src = BrokenImage;
          };
          return (
            <Link to={`/${id}`}>
              <div className="box shadow" key={index}>
                <div className="img">
                  <img
                    src={`data:image/jpeg;base64,${imageData}`}
                    onError={imageOnError}
                    onerror="this.onerror=null;this.src='public\images\list\p-7.png';"
                    alt="imag not available"
                  />
                </div>
                <div className="text">
                  <div className="category flex">
                    <span
                      style={{
                        background:
                          propertyType === "Appaerment"
                            ? "#25b5791a"
                            : "#ff98001a",
                        color:
                          propertyType === "Appartment" ? "#25b579" : "#ff9800",
                      }}
                    >
                      {propertyType}
                    </span>
                    <i className="fa fa-heart"></i>
                  </div>
                  <h4>{title}</h4>
                  <p>
                    <i className="fa fa-location-dot"></i>
                    {city},{country}
                  </p>
                </div>
                <div className="button flex">
                  <div>
                    <button className="btn2">₹{price}</button>{" "}
                    <label htmlFor="">/sqft</label>
                  </div>
                  <span>{propertyType}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
