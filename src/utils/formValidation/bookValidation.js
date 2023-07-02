import * as Yup from "yup";

const bookSchema = Yup.object().shape({
  name: Yup.string().required("Required field"),
  dates: Yup.string().required("Required field"),
  expectedPeople: Yup.string().required("Required field"),
});

export default bookSchema;
