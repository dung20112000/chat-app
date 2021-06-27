import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

interface IValues {
  email: string;
}

const ForgetPassword = () => {
  const initialValues: IValues = {
    email: '',
  };
  const onSubmit = () => {
    console.log('submit');
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
  });

  return (
    <Row className="text-center">
      <Col xs={12} className="pb-2">
        <i style={{ fontSize: '2.5rem' }} className="fas fa-user-lock" />
      </Col>
      <Col xs={12} className="pb-2">
        <h4>Trouble Logging In?</h4>
      </Col>
      <Col xs={12}>
        <p style={{ fontSize: '1.2rem' }} className="w-75 mx-auto text-muted">
          Enter your email and we will send you a link to get back into your
          account.
        </p>
      </Col>
      <Col xs={12}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {(formikProps: FormikProps<IValues>) => {
            const { errors, touched, handleSubmit, values } = formikProps;
            return (
              <Form onSubmit={handleSubmit} className="rounded-1rem px-5">
                <Col xs lg="12" className="mb-3">
                  <Field
                    className={
                      touched.email && errors.email
                        ? 'is-invalid form-control'
                        : 'form-control'
                    }
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => {
                      return (
                        <div className="d-block invalid-feedback">{msg}</div>
                      );
                    }}
                  </ErrorMessage>
                </Col>
                <Col xs lg="12" className="mb-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 mb-2"
                    disabled={
                      Object.values(errors).some((error) => error) ||
                      Object.values(values).some((value) => !value)
                    }
                  >
                    Send Login Link
                  </Button>
                </Col>
                <Col>
                  <div>
                    <div>OR</div>
                  </div>
                </Col>
                <Col xs={12}>
                  <div
                    className="d-flex justify-content-around"
                    style={{ fontSize: '1.3rem' }}
                  >
                    <NavLink
                      to="/authenticate/register"
                      className="w-100 text-link-blue"
                    >
                      Create New Account
                    </NavLink>
                    <NavLink
                      to="/authenticate/login"
                      className="w-100  text-link-blue"
                    >
                      Back To Login
                    </NavLink>
                  </div>
                </Col>
              </Form>
            );
          }}
        </Formik>
      </Col>
    </Row>
  );
};
export default ForgetPassword;
