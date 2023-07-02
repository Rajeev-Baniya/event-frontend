import React from "react";
import defImage from "../../assets/images/wed.jpg";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="row justify-content-between search-item">
      <div className="col-lg-3">
        <img src={item.photos || defImage} alt="Hotel" />
      </div>
      <div className="col-lg-9">
        <div className="d-flex justify-content-between">
          <div className="px-5">
            <h3 className="mb-3">{item.name}</h3>
            <p className="type mb-3"> {item.type} </p>
            <p className="address mb-3 text-capitalize">
              <i class="fa-solid fa-location-dot"></i> {item.address}
            </p>
            <p className="description">{item.desc}</p>
          </div>
          <div className="px-5">
            <p className="mb-3 price">Rs. {item.pricePerDay}</p>
            {/* <p className="light-text mb-4">Includes taxes and fees</p> */}
            <p className="light-text mb-4">
              Capacity : {item.maxCapacity} people
            </p>
            <Link to={`/book/${item._id}`}>
              <p
                className="availability"
                style={{ backgroundColor: "#51cf66" }}
              >
                Book Now !
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
