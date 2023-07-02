import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../../utils/TextError";
import { toast } from "react-toastify";
import venueSchema from "../../../utils/formValidation/venueValidation";
import { createVenue } from "../../../services/venueService";
import axios from "axios";

const VenueCreateModal = ({ show, setShow, reFetch }) => {
  const [files, setFiles] = useState("");

  const formData = {
    name: "",
    address: "",
    city: "",
    desc: "",
    pricePerDay: "",
    maxCapacity: "",
    type: "",
  };
  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Formik
          initialValues={formData}
          validationSchema={venueSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            try {
              if (files) {
                let list = await Promise.all(
                  Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    delete axios.defaults.headers.common["Authorization"];
                    const uploadRes = await axios.post(
                      "https://api.cloudinary.com/v1_1/dg5ku2nbh/image/upload",
                      data
                    );
                    const { url } = uploadRes.data;
                    return url;
                  })
                );
                await createVenue({ ...values, photos: list[0] });
              } else {
                await createVenue(values);
              }
              actions.setSubmitting(false);
              setShow(false);
              toast.success("venue created successfully ");
              reFetch();
            } catch (error) {
              actions.setSubmitting(false);
              console.log(error);
              toast.error(error.response.data.message);
            }
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="modal-form">
              <Modal.Header closeButton>
                <Modal.Title>Create Venue</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="left">
                  <img
                    className="venue-img-display"
                    src={
                      files
                        ? URL.createObjectURL(files[0])
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="file">Image: </label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    //   style={{ display: "none" }}
                  />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="email">Venue Name: </label>
                  <Field
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="Enter Venue Name"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="city">City Name: </label>
                  <Field
                    type="text"
                    name="city"
                    autoComplete="off"
                    placeholder="Enter Venue Name"
                  />
                  <ErrorMessage name="city" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="pricePerDay">Price per day: </label>
                  <Field
                    type="number"
                    name="pricePerDay"
                    autoComplete="off"
                    placeholder="Enter price "
                  />
                  <ErrorMessage name="pricePerDay" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="address">Address: </label>
                  <Field
                    type="text"
                    name="address"
                    autoComplete="off"
                    placeholder="Enter address "
                  />
                  <ErrorMessage name="address" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="maxCapacity">Type: </label>
                  <Field
                    type="text"
                    name="type"
                    autoComplete="off"
                    placeholder="eg: Hotel, Eventhall "
                  />
                  <ErrorMessage name="type" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="maxCapacity">Capacity: </label>
                  <Field
                    type="number"
                    name="maxCapacity"
                    autoComplete="off"
                    placeholder="Enter Max Capacity "
                  />
                  <ErrorMessage name="maxCapacity" component={TextError} />
                </div>

                <div className="modal-form-pack">
                  <label htmlFor="description">Description: </label>
                  <Field
                    as="textarea"
                    rows="3"
                    type="text"
                    name="desc"
                    autoComplete="off"
                    placeholder="Enter capacity "
                  />
                  <ErrorMessage name="desc" component={TextError} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default VenueCreateModal;
