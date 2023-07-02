import * as Yup from "yup";

const searchSchema = Yup.object().shape({
  place: Yup.string().required("Required field"),
  date: Yup.string().required("Required field"),
  price: Yup.string().required("Required field"),
});

export default searchSchema;
