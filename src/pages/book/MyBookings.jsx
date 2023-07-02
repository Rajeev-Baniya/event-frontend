import React, { useEffect, useContext, useState } from "react";
import event from "../../services/eventService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import EditMyBooking from "./EditMyBookings";

const MyBookings = () => {
  const [activeModal, setActiveModal] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const { data, reFetch } = useFetch(`/events/user/${user.id}`);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const hideModal = () => {
    setActiveModal(null);
  };

  const clickHandler = (e, index) => {
    setActiveModal(index);
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      try {
        await event.deleteEvent(id);
        const filter = events.filter((item) => item._id !== id);
        setEvents(filter);
        toast.success("Event deleted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="common-padding">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Venue</th>
            <th scope="col">Date</th>
            <th scope="col">Expected People</th>
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

                <td className="edit" onClick={(e) => clickHandler(e, index)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </td>
                <td className="delete">
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteBooking(item._id)}
                  ></i>
                </td>
                <EditMyBooking
                  show={activeModal === index}
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
  );
};

export default MyBookings;
