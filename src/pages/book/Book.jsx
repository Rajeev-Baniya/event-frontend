import React, { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import wed1 from "../../assets/images/wed.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import bookSchema from "../../utils/formValidation/bookValidation";
import TextError from "../../utils/TextError";
import { toast } from "react-toastify";
import venue from "../../services/venueService";

import event from "../../services/eventService";

const Book = () => {
  const navigate = useNavigate();

  let { vid } = useParams();
  const { data } = useFetch(`/venue/${vid}`);
  const { dispatch, date } = useContext(SearchContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("You need to login before booking");
    }
  }, [navigate, user]);

  useEffect(() => {
    const chkAvailability = async () => {
      try {
        const res = await venue.checkAvailabilty(`${vid}?date=${date}`);
        console.log(res);
        toast.success("Date is availabile, You can book now");
      } catch (error) {
        toast.error("Date is not available");
        console.log(error);
      }
    };
    if (date) {
      chkAvailability();
    }
  }, [date, vid]);

  const formData = {
    name: "",
    author: user ? user?._id : "",
    dates: date ? date : "",
    expectedPeople: "",
  };

  return (
    <>
      <div className="common-padding book">
        <h3 className="common-header">{data?.data?.name}</h3>
        <div className="row g-5 justify-content-between">
          <div className="col-lg-5">
            <div className="most-booked_each">
              <img
                src={data?.data?.photos || wed1}
                alt="hotel"
                className="mb-2"
              />
              <div className="p-3 d-flex justify-content-between">
                <div>
                  <h3>{data?.data?.name}</h3>
                  <p className="type mb-3"> {data.data?.type} </p>
                  <p className="mb-3 price">
                    Rs. {data?.data?.pricePerDay} per day
                  </p>

                  <p className="address mb-3 text-capitalize">
                    <i class="fa-solid fa-location-dot"></i>{" "}
                    {data?.data?.address}
                  </p>
                  <p className="description mb-4">{data?.data?.desc}</p>
                </div>
                <div>
                  <p className="mb-2 text-bold">
                    Capacity : {data.data?.maxCapacity} people
                  </p>
                  <p class="light-text green-text">Free cancelation</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <Formik
              initialValues={formData}
              validationSchema={bookSchema}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                try {
                  const res = await venue.checkAvailabilty(
                    `${vid}?date=${values.dates}`
                  );
                  console.log(res);
                  if (res.data.status === "success") {
                    await event.createEvent(values, vid);
                    actions.setSubmitting(false);
                    dispatch({
                      type: "RESET_SEARCH",
                    });
                    navigate("/bookings");
                    toast.success("Event Booked Successfully");
                  } else {
                    toast.error("Date is not abailable");
                  }
                } catch (error) {
                  actions.setSubmitting(false);
                  toast.error(error.response.data.message);
                }
              }}
            >
              <Form>
                <div className="form-pack">
                  <label htmlFor="name">
                    <i class="fa-solid fa-signature"></i> Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="eg : Marriage"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="form-pack">
                  <label htmlFor="dates">
                    <i class="fa-solid fa-calendar-days"></i> Date:
                  </label>
                  <Field
                    type="date"
                    name="dates"
                    autoComplete="off"
                    placeholder="Select Date"
                    min={
                      new Date(
                        new Date().getTime() -
                          new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                  <ErrorMessage name="dates" component={TextError} />
                </div>
                <div className="form-pack">
                  <label htmlFor="expectedPeople">
                    <i class="fa-solid fa-users"></i> Expected Peope:
                  </label>
                  <Field
                    type="number"
                    name="expectedPeople"
                    autoComplete="off"
                    placeholder="eg: 600"
                  />
                  <ErrorMessage name="expectedPeople" component={TextError} />
                </div>
                <button type="submit" className="log-btn">
                  Book !
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
