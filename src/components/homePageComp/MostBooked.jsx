import React, { useState, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import wed1 from "../../assets/images/wed.jpg";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MostBooked = ({ item, rang }) => {
  const { dispatch } = useContext(SearchContext);
  const showVenue = () => {
    dispatch({
      type: "RESET_SEARCH",
    });
  };

  return (
    <div className="col-lg-3 p-4">
      <div className="most-booked_each">
        <LazyLoadImage
          src={item?.photos || wed1}
          alt="hotel"
          className="mb-2"
        />
        <div className="p-3">
          <h3>{item.name}</h3>
          <p className="type mb-3"> {item.type} </p>
          <p className="mb-3 price">Rs. {item.pricePerDay} per day</p>
          <p className="address mb-3 text-capitalize">
            <i class="fa-solid fa-location-dot"></i> {item.address}
          </p>
          <p className="description mb-4">{item.desc}</p>
          <Link to={`/book/${item._id}`} onClick={showVenue}>
            <p
              className="availability mb-2"
              style={{ display: "inline-block", backgroundColor: `${rang}` }}
            >
              Book Now !
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MostBooked;
