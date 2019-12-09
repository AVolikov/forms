import React from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required!")
    .max(10, "First name is too long!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Email is required!")
});

const LoginForm = () => {
  return (
    <div>
      <Formik
        validationSchema={loginFormSchema}
        initialValues={{ firstName: "", email: "" }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" placeholder="first name" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : (
              <></>
            )}
            <br />
            <Field name="email" placeholder="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : <></>}
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
