import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { lazy, Suspense, useEffect } from "react";

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Venue = lazy(() => import("./pages/venue/Venue"));
const City = lazy(() => import("./pages/city/City"));
const Book = lazy(() => import("./pages/book/Book"));
const MyBookings = lazy(() => import("./pages/book/MyBookings"));
const Home = lazy(() => import("./pages/home/Home"));

const Allusers = lazy(() => import("./pages/admin/Users/Allusers"));
const Venues = lazy(() => import("./pages/admin/Venues/Venues"));
const Bookings = lazy(() => import("./pages/admin/Bookings/Bookings"));

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="main-container">
        <Suspense fallback={<h1 className="common-padding">Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/city" element={<City />} />
            <Route path="/book/:vid" element={<Book />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/users" element={<Allusers />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/allbookings" element={<Bookings />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default App;
