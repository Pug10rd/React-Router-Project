import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { LoginForm, Input, Button, StyledLink } from './FormStyled';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  firstName: Yup.string()
    .matches(/^[a-zA-Z]{2,20}$/, 'Should be from 2 to 20 characters')
    .when('$isRegistration', {
      is: true,
      then: Yup.string().required('Enter your first name'),
    }),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]{2,20}$/, 'Should be from 2 to 20 characters')
    .when('$isRegistration', {
      is: true,
      then: Yup.string().required('Enter your last name'),
    }),
});

const FormComponent = ({ title, handleClick }) => {
  const location = useLocation();
  const isRegistration = location.pathname === '/registration';

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={values => {
        handleClick(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
      }}
      context={{ isRegistration }}
    >
      <LoginForm>
        <Form>
          {isRegistration && (
            <>
              <Input type="text" name="firstName" placeholder="First name" />
              <ErrorMessage
                name="firstName"
                component="div"
                style={{ color: 'red' }}
              />

              <Input type="text" name="lastName" placeholder="Last name" />
              <ErrorMessage
                name="lastName"
                component="div"
                style={{ color: 'red' }}
              />
            </>
          )}

          <Input type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

          <Input type="password" name="password" placeholder="Password" />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: 'red' }}
          />

          <Button type="submit">{title}</Button>
        </Form>

        {location.pathname === '/login' ? (
          <h3 style={{ textAlign: 'center', marginTop: '1rem' }}>
            or <StyledLink to="/registration">create account</StyledLink>
          </h3>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Already have an account? <StyledLink to="/login">Login</StyledLink>
          </p>
        )}
      </LoginForm>
    </Formik>
  );
};

export default FormComponent;
