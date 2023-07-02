import React from "react";
import Logo from "../../assets/images/logos.png";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import auth from "../../services/authService";
import TextError from "../../utils/TextError";
import { useNavigate } from "react-router-dom";
import registerSchema from "../../utils/formValidation/registerValidation";

const Register = () => {
  const navigate = useNavigate();

  const formData = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <div className="login">
      <Formik
        initialValues={formData}
        validationSchema={registerSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          try {
            await auth.register(values);
            actions.setSubmitting(false);
            navigate("/login");
            toast.success("User Created Successfully, You can now login");
          } catch (error) {
            actions.setSubmitting(false);
            toast.error(error.response.data.message);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="login_form">
            <div className="img-desc text-center">
              <img src={Logo} alt="logo" />
              <h3 className="desc">Register to Venue Reservation System</h3>
            </div>
            <div className="form-pack">
              <label for="name">Full Name: </label>
              <Field
                type="text"
                autoComplete="off"
                name="username"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="username" component={TextError} />
            </div>
            <div className="form-pack">
              <label for="email">Email: </label>
              <Field
                type="email"
                autoComplete="off"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="form-pack">
              <label for="number">Phone number: </label>
              <Field
                type="text"
                autoComplete="off"
                name="phone"
                placeholder="Enter your phone number"
              />
              <ErrorMessage name="phone" component={TextError} />
            </div>
            <div className="form-pack">
              <label for="passowrd">Password:</label>
              <Field
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component={TextError} />
            </div>
            <div className="form-pack">
              <label for="cpassowrd">Confirm Password:</label>
              <Field
                type="password"
                autoComplete="off"
                name="confirmPassword"
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" component={TextError} />
            </div>
            <button type="submit" className="log-btn" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
