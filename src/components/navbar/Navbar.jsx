import React, { useEffect, useState, useContext } from "react";

import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logos.png";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);
  const exposeSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  useEffect(() => {
    setOpenSidebar(false);
  }, [location]);

  const { user, dispatch, isAdmin } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    toast.success("User logged out successfully");
  };
  //   console.log(isAdmin);
  return (
    <>
      <nav className="nav">
        <ul className="left-items">
          <li>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </li>
        </ul>

        <ul className="right-items">
          {user ? (
            !isAdmin ? (
              <ul className="right-items right-items1">
                <li>
                  <NavLink activeclassname="active" to="/bookings">
                    My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" to="/venue">
                    Venues
                  </NavLink>
                </li>

                <li className="user">
                  <p className="userdetail">
                    <i class="fa-solid fa-user"></i>{" "}
                    <span className="username">{user.name}</span>
                    <i class="fa-solid fa-caret-down"></i>
                  </p>
                  <p className="showme" onClick={logout}>
                    Logout
                  </p>
                </li>
              </ul>
            ) : (
              <ul className="right-items right-items1">
                <li>
                  <NavLink activeclassname="active" to="/venues">
                    Venues
                  </NavLink>
                </li>

                <li>
                  <NavLink activeclassname="active" to="/allbookings">
                    Bookings
                  </NavLink>
                </li>

                <li>
                  <NavLink activeclassname="active" to="/users">
                    Users
                  </NavLink>
                </li>

                <li className="user">
                  <p className="userdetail">
                    <i class="fa-solid fa-user"></i>{" "}
                    <span className="username">
                      {user.name}
                      {isAdmin && <span>(Admin)</span>}
                    </span>
                    <i class="fa-solid fa-caret-down"></i>
                  </p>
                  <p className="showme" onClick={logout}>
                    Logout
                  </p>
                </li>
              </ul>
            )
          ) : (
            <ul className="right-items right-items1">
              <li>
                <NavLink activeclassname="active" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          )}

          <ul className="right-items2">
            <li onClick={() => exposeSidebar()}>
              {openSidebar ? (
                <>
                  <i className="fa-solid fa-xmark"></i>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bars"></i>
                </>
              )}
            </li>
          </ul>
        </ul>
      </nav>
      <div className="side-bar">
        <ul
          className={`sidebar-items ${openSidebar ? "in" : ""}`}
          id="sidebar-items"
        >
          {user ? (
            isAdmin ? (
              <>
                <li>
                  <Link>
                    {user.name}
                    {isAdmin && <span>(Admin)</span>}
                  </Link>
                </li>

                <li>
                  <Link to="/venues">Venues</Link>
                </li>
                <li>
                  <Link to="/venues">Booking</Link>
                </li>
                <li>
                  <Link to="/venues">Users</Link>
                </li>
                <li onClick={logout}>
                  <Link>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link>My Bookings</Link>
                </li>
                <li onClick={logout}>
                  <Link>Logout</Link>
                </li>
              </>
            )
          ) : (
            <>
              <li>
                <NavLink activeclassname="active" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
