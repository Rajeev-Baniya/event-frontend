import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import eventSchema from "../../utils/formValidation/eventValidation";
import { editEvent } from "../../services/eventService";
import TextError from "../../utils/TextError";

const EditMyBookings = ({ show, item, hideModal, reFetch }) => {
  const formData = {
    name: item?.name || "",
    expectedPeople: item?.expectedPeople || "",
    dates: item?.dates?.substring(0, 10) || "",
  };
  return (
    <div>
      <Modal show={show} onHide={() => hideModal()} centered>
        <Formik
          initialValues={formData}
          validationSchema={eventSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            // console.log(values);
            try {
              await editEvent(item._id, values);
              actions.setSubmitting(false);
              hideModal();
              toast.success("Edited successfully Successfully");
              reFetch();
            } catch (error) {
              toast.error(error.response.data.message);
              actions.setSubmitting(false);
            }
          }}
        >
          <Form className="modal-form">
            <Modal.Header closeButton>
              <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-form-pack">
                <label htmlFor="email">Event Name: </label>
                <Field
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Enter Event Name"
                />
                <ErrorMessage name="name" component={TextError} />
              </div>
              <div className="modal-form-pack">
                <label htmlFor="email">Expected People: </label>
                <Field
                  type="number"
                  name="expectedPeople"
                  autoComplete="off"
                  placeholder="Enter Expected people"
                />
                <ErrorMessage name="expectedPeople" component={TextError} />
              </div>

              <div className="modal-form-pack">
                <label htmlFor="email">Date: </label>
                <Field
                  type="date"
                  name="dates"
                  autoComplete="off"
                  placeholder="Select Date"
                />
                <ErrorMessage name="dates" component={TextError} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => hideModal()}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default EditMyBookings;
