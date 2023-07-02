import React, { useEffect, useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import { userDelete } from "../../../services/authService";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Allusers = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useContext(AuthContext);
  //   console.log(isAdmin);
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user, isAdmin]);

  const { data, loading, error, reFetch } = useFetch("users/allUsers");
  const deleteBooking = async (id, isAdmin) => {
    if (isAdmin) {
      toast.error("Cannot delete Admin");
    } else {
      if (window.confirm("Are you sure you want to delete it?")) {
        try {
          await userDelete(id);
          toast.success("Venue deleted successfully");
          reFetch();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  if (loading) {
    return <h1 className="common-padding">Loading</h1>;
  }

  return (
    <div className="common-padding">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="inner-header">
          All <span>Users</span>
        </h3>
      </div>
      <hr className="mb-5" />
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Image</th>
              <th scope="col">IsAdmin</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.data && data?.data?.length > 0 ? (
              data.data.map((item, index) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.username}</td>

                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.img || "no image"}</td>
                  <td>{item.isAdmin.toString()}</td>
                  <td className="delete">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteBooking(item._id, item.isAdmin)}
                    ></i>
                  </td>
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

export default Allusers;
