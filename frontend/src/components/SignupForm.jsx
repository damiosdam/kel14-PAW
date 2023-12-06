import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import axios from 'axios';
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const SignupForm = ({ setAuth }) => {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name required"),
    phone: Yup.string()
      .min(10, "Too Short!")
      .max(16, "Too Long!")
      .required("Phone required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password1: Yup.string().required("Password is required"),
    password2: Yup.string().required("Password Confirmation is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;
      const email = values.email;
      const password = values.password1;
      const confirmPassword = values.password2;
      axios
        .post(`${URL}/api/v1/auth/signup`, { email, password, confirmPassword })
        .then((response) => {
          setAuth(false);
          navigate('/activate', { replace: true });
        })
        .catch((error) => {
          if (error.response.data.message > 1) {
            error.response.data.message.forEach(element => {
              Notify.failure(element.msg);
            });
          } else {
            Notify.failure(error.response.data.message);
          }
          setAuth(false);
          navigate('/signup', { replace: true });
          setSubmitting(false);
        });
    },
  });

  const { errors, touched, handleSubmit, values, isSubmitting, setSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="name"
              type="text"
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              autoComplete="phone"
              type="number"
              label="Phone"
              {...getFieldProps("phone")}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="password"
              type={showPassword1 ? "text" : "password"}
              label="Password"
              {...getFieldProps("password1")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword1((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword1 ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password1 && errors.password1)}
              helperText={touched.password1 && errors.password1}
            />
            <TextField
              fullWidth
              autoComplete="confirmation-password"
              type={showPassword2 ? "text" : "password"}
              label="Password Confirmation"
              {...getFieldProps("password2")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword2((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword2 ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password2 && errors.password2)}
              helperText={touched.password2 && errors.password2}
            />
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Sign up
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
