import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    TextField
} from "@mui/material";
import axios from 'axios';
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

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

const LoginForm = ({ setAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;
            const email = values.email;
            const password = values.password;
            axios
                .post(`${URL}/api/v1/auth/signin`, { email, password })
                .then((response) => {
                    if (response.data.token) {
                        localStorage.setItem("token", JSON.stringify(response.data.token));
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                    }
                    setAuth(true);
                    navigate(from, { replace: true });
                })
                .catch((error) => {
                    Notify.failure(error.response.data.message);
                    setAuth(false);
                    navigate('/login', { replace: true });
                    setSubmitting(false);
                });
        },
    });

    const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } =
        formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box
                    component={motion.div}
                    animate={{
                        transition: {
                            staggerChildren: 0.55,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                        component={motion.div}
                        initial={{ opacity: 0, y: 40 }}
                        animate={animate}
                    >
                        <TextField
                            fullWidth
                            autoComplete="email"
                            name="email"
                            type="email"
                            label="Email Address"
                            {...getFieldProps("email")}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            autoComplete="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            name="password"
                            {...getFieldProps("password")}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <Icon icon="eva:eye-fill" />
                                            ) : (
                                                <Icon icon="eva:eye-off-fill" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={animate}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ my: 2 }}
                        >
                        </Stack>

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            {isSubmitting ? "loading..." : "Login"}
                        </LoadingButton>
                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;
