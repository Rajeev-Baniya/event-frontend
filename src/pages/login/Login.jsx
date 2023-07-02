import { useContext } from "react";
import Logo from "../../assets/images/logos.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginSchema from "../../utils/formValidation/loginValidation";
import TextError from "../../utils/TextError";
import auth from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const formData = {
    email: "",
    password: "",
  };
  return (
    <div className="login">
      <Formik
        initialValues={formData}
        validationSchema={loginSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          dispatch({ type: "LOGIN_START" });
          try {
            const res = await auth.login(values);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            actions.setSubmitting(false);
            navigate("/");
            toast.success("Loggedin Successfully");
          } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
            actions.setSubmitting(false);
            toast.error(error.response.data.message);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="login_form">
            <div className="img-desc text-center">
              <img src={Logo} alt="logo" />
              <h3 className="desc">Login to Venue Reservation System</h3>
            </div>
            <div className="form-pack">
              <label htmlFor="email">Email: </label>
              <Field
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="form-pack">
              <label htmlFor="passowrd">Password:</label>
              <Field
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component={TextError} />
            </div>
            <button type="submit" className="log-btn" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
