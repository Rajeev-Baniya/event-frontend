import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../../utils/TextError";
import { toast } from "react-toastify";
import { editVenue } from "../../../services/venueService";
import venueSchema from "../../../utils/formValidation/venueValidation";

function VenueEditModal({ show, item, hideModal, reFetch }) {
  const formData = {
    name: item?.name || "",
    address: item?.address || "",
    city: item?.city || "",
    desc: item?.desc || "",
    pricePerDay: item?.pricePerDay || "",
    maxCapacity: item?.maxCapacity || "",
    type: item?.type || "",
  };

  return (
    <>
      <Modal show={show} onHide={() => hideModal()} centered>
        <Formik
          initialValues={formData}
          validationSchema={venueSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            try {
              await editVenue(item._id, values);
              hideModal();
              toast.success("Edited successfully Successfully");
              reFetch();
            } catch (error) {
              toast.error(error.response.data.message);
            }
          }}
        >
          <Form className="modal-form">
            <Modal.Header closeButton>
              <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                  type="text"
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
                  type="text"
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
    </>
  );
}

export default VenueEditModal;
