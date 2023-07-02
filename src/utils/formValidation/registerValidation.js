import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required field"),
  username: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
  confirmPassword: Yup.string()
    .required("Required field")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string()
    .required("Required field")
    .matches(phoneRegExp, "Phone number is not valid")
    .length(10),
});

export default registerSchema;
