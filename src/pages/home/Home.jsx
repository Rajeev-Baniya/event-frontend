import React, { useContext } from "react";
import HomeCarousel from "../../components/homePageComp/HomeCarousel.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SearchContext } from "../../context/SearchContext.js";
import { useNavigate, Link } from "react-router-dom";
import searchSchema from "../../utils/formValidation/searchValidation.js";
import TextError from "../../utils/TextError";
import useFetch from "../../hooks/useFetch";
import BookNow from "../../components/homePageComp/BookNow.jsx";
import MostBooked from "../../components/homePageComp/MostBooked.jsx";

const Home = () => {
  const formData = {
    place: "",
    date: "",
    price: "",
    maxCapacity: "",
  };
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const { data, loading } = useFetch(`venue?count=bookedCount&limit=4`);
  return (
    <>
      <HomeCarousel />
      <div className="common-padding searchVenue">
        <h3 className="common-header">
          Search <span>Appropriate</span> Venue
        </h3>
        <Formik
          initialValues={formData}
          validationSchema={searchSchema}
          onSubmit={(values, actions) => {
            dispatch({
              type: "NEW_SEARCH",
              payload: values,
            });
            navigate("/venue", { state: values });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row g-5 justify-content-between">
                <div className="col-lg-3 col-md-6">
                  <div className="form-pack">
                    <label htmlFor="place">
                      <i className="fa-solid fa-location-dot"></i> Destination:
                    </label>
                    <Field
                      type="text"
                      name="place"
                      autoComplete="off"
                      placeholder="eg : Pokhara"
                    />
                    <ErrorMessage name="place" component={TextError} />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-pack">
                    <label htmlFor="place">
                      <i class="fa-solid fa-calendar-days"></i> Date:
                    </label>
                    <Field
                      type="date"
                      name="date"
                      min={
                        new Date(
                          new Date().getTime() -
                            new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .split("T")[0]
                      }
                      autoComplete="off"
                      placeholder="Input the Date"
                    />
                    <ErrorMessage name="date" component={TextError} />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-pack">
                    <label htmlFor="place">
                      <i className="fa-solid fa-indian-rupee-sign"></i> Min
                      Price Per Day:
                    </label>
                    <Field
                      type="text"
                      name="price"
                      autoComplete="off"
                      placeholder="eg: 300"
                    />
                    <ErrorMessage name="price" component={TextError} />
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <button
                    type="submit"
                    className="log-btn"
                    disabled={isSubmitting}
                  >
                    Search
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="common-padding cityVenue">
        <h3 className="common-header">
          Venues in <span>Famous</span> Cities
        </h3>
        <div className="row g-5">
          <div className="col-lg-3 col-md-4">
            <Link to="/city?name=kathmandu">
              <div className="city-each ktm">
                <div className="city-each_text">Kathmandu</div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-4" title="click to view">
            <Link to="/city?name=pokhara">
              <div className="city-each pkr">
                <div className="city-each_text">Pokhara</div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-4" title="click to view">
            <Link to="/city?name=chitwan">
              <div className="city-each ctn">
                <div className="city-each_text">Chitwan</div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-4" title="click to view">
            <Link to="/city?name=dharan">
              <div className="city-each drn">
                <div className="city-each_text">Dharan</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="common-padding most-booked">
        <h3 className="common-header">
          Most <span>Booked</span> Venues
        </h3>
        <div className="row g-5">
          {loading ? (
            "loading..."
          ) : (
            <>
              {data?.data && data?.data?.length > 0 ? (
                data.data.map((item) => (
                  <MostBooked key={item._id} item={item} rang="#51cf66" />
                ))
              ) : (
                <h3>No Venue found</h3>
              )}
            </>
          )}
        </div>
      </div>
      <BookNow />
    </>
  );
};

export default Home;
