import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import event from "../../../services/eventService";
import EditBooking from "./EditBooking";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();

  const { data, loading, error, reFetch } = useFetch("events/allevents");
  const [activeModal, setActiveModal] = useState(null);
  const { user, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user, isAdmin]);

  const clickHandler = (e, index) => {
    setActiveModal(index);
  };

  const hideModal = () => {
    setActiveModal(null);
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      try {
        await event.deleteEvent(id);
        toast.success("Event deleted successfully");
        reFetch();
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };
  if (loading) {
    return <h3 className="common-padding">Loading</h3>;
  }
  return (
    <div className="common-padding">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="inner-header">
          All <span>Bookings</span>
        </h3>
        {/* <button
          className="btn btn-primary btn-lg"
          onClick={() => setShow(true)}
        >
          Create Venue
        </button> */}
      </div>
      <hr className="mb-5" />
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Event Name</th>
              <th scope="col">Venue</th>
              <th scope="col">Date</th>
              <th scope="col">Expected People</th>
              <th scope="col">Booked By</th>

              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.data && data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>

                  <td>{item.venue.venueName}</td>
                  <td>{item.dates.substring(0, 10)}</td>
                  <td>{item.expectedPeople}</td>
                  <td>{item.author.authorName}</td>

                  <td className="edit" onClick={(e) => clickHandler(e, index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </td>
                  <td className="delete">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteBooking(item._id)}
                    ></i>
                  </td>
                  <EditBooking
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
    </div>
  );
};

export default Bookings;
