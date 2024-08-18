import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormControl, TextField, Button, Typography, Alert, Container } from '@mui/material';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { UserSignin } from '../types/types';
import { creds } from "../creds/creds";
import { setAuth } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<UserSignin>({ email: "", password: "" });
  const [wrongCreds, setWrongCreds] = useState("");

  const handleSubmit = (values: UserSignin) => {
    if (creds.email === values.email && creds.password === values.password) {
      dispatch(setAuth(true));
      setWrongCreds("");
      navigate("/");
    } else {
      dispatch(setAuth(false));
      setWrongCreds("Wrong Credentials");
    }
  }

  const signinSchema = yup.object().shape({
    email: yup.string()
      .email('Invalid email address format')
      .required('Email is required'),
    password: yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
  });

  return (
    <Container sx={{ padding: "2rem" }}>
      <Typography variant='h2' component='h2'>Sign In</Typography>
      <Formik
        initialValues={formValues}
        validationSchema={signinSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={(values) => {
          handleSubmit(values);
          setFormValues(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl sx={{ gap: '2rem', padding: "2rem" }}>
              <Field name="email">
                {({ field }: { field: { name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onBlur: () => void; } }) => (
                  <TextField
                    {...field}
                    type='text'
                    required
                    autoComplete='username'
                    label='Email'
                    error={Boolean(<ErrorMessage name="email" />)}
                    helperText={<ErrorMessage name="email" />}
                    onChange={(e) => {
                      field.onChange(e);
                      setFormValues({ ...formValues, email: e.target.value });
                    }}
                    InputProps={{
                      style: { color: 'gray' },
                    }}
                    InputLabelProps={{
                      style: { color: 'gray' },
                    }}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field }: { field: { name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onBlur: () => void; } }) => (
                  <TextField
                    {...field}
                    type='password'
                    required
                    autoComplete='current-password'
                    label='Password'
                    variant="outlined"
                    error={Boolean(<ErrorMessage name="password" />)}
                    helperText={<ErrorMessage name="password" />}
                    onChange={(e) => {
                      field.onChange(e);
                      setFormValues({ ...formValues, password: e.target.value });
                    }}
                    InputProps={{
                      style: { color: 'gray' },
                    }}
                    InputLabelProps={{
                      style: { color: 'gray' },
                    }}
                  />
                )}
              </Field>
              <Button type='submit' variant="contained" sx={{ alignSelf: 'center' }}>
                Submit
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
      <Container sx={{ padding: "1rem" }}>
        {wrongCreds && <Alert severity="error">{wrongCreds} </Alert>}
      </Container>
    </Container>
  )
}

export default Signin