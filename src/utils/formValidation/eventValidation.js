import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  name: Yup.string().required("Required field"),
  expectedPeople: Yup.string().required("Required field"),
});

export default eventSchema;
