import * as Yup from "yup";

const venueSchema = Yup.object().shape({
  name: Yup.string().required("Required field"),
  address: Yup.string().required("Required field"),
  city: Yup.string().required("Required field"),
  desc: Yup.string().required("Required field"),
  pricePerDay: Yup.number().required("Required field"),
  maxCapacity: Yup.number().required("Required field"),
  type: Yup.string().required("Required field"),
});

export default venueSchema;
