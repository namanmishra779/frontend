

import React, { useEffect, useState } from "react";
import Back from "../common/Back"
import "../home/recent/recent.css"
import img from "../images/about.jpg"
import { useParams } from "react-router-dom";
import RecentCardBooking from "../home/recent/RecentCardBooking"; // Import your RecentCard component

const MyBooking = () => {
  const [propertyList, setPropertyList] = useState([]);

  const { typeName } = useParams();
  console.log(typeName);
  // useEffect(() => {
  //   // Make a GET request to the API endpoint
  //   Axios.get(`http://localhost:3000/api/properties/propertyList/${encodeURIComponent(typeName)}`)
  //     .then((response) => {
  //       // Handle the response data
  //       setPropertyList(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <section className='blog-out mb'>
    <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
    <div className='container recent'>
      <RecentCardBooking  />
    </div>
  </section>
  );
};

export default MyBooking
