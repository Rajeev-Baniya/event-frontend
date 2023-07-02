import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import venue from "../../../services/venueService";
import { toast } from "react-toastify";
import VenueEditModal from "./VenueEditModal";
import VenueCreateModal from "./VenueCreateModal";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Venues = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useContext(AuthContext);
  const [activeModal, setActiveModal] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user, isAdmin]);

  const { data, loading, reFetch } = useFetch("venue");
  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      try {
        await venue.deleteVenue(id);
        toast.success("Venue deleted successfully");
        reFetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clickHandler = (e, index) => {
    setActiveModal(index);
  };

  const hideModal = () => {
    setActiveModal(null);
  };

  if (loading) {
    return <h1 className="common-padding">Loading...</h1>;
  }
  return (
    <div className="common-padding">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="inner-header">
          All <span>Venue</span>
        </h3>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShow(true)}
        >
          Create Venue
        </button>
      </div>
      <hr className="mb-5" />

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Venue Name</th>
              <th scope="col">City</th>
              <th scope="col">Price Per Day</th>
              <th scope="col">Address</th>
              <th scope="col">Capacity</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.data && data?.data?.length > 0 ? (
              data.data.map((item, index) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>

                  <td>{item.city}</td>
                  <td>{item.pricePerDay}</td>
                  <td>{item.address}</td>
                  <td>{item.maxCapacity}</td>

                  <td className="edit" onClick={(e) => clickHandler(e, index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </td>
                  <td className="delete">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteBooking(item._id)}
                    ></i>
                  </td>
                  <VenueEditModal
                    show={activeModal === index}
                    //   setShow={setShow}
                    hideModal={hideModal}
                    item={item}
                    reFetch={reFetch}
                  />
                </tr>
              ))
            ) : (
              <>
                <h3 className="my-2">No data to show</h3>
              </>
            )}
          </tbody>
        </table>
      </div>
      <VenueCreateModal show={show} setShow={setShow} reFetch={reFetch} />
    </div>
  );
};

export default Venues;
