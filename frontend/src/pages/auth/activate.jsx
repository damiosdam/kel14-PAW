import styled from "@emotion/styled";
import { Box, Container, Link, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../components/logo";


const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const ContentStyle = styled("div")({
    maxWidth: 480,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};

export default function Activate({ setAuth }) {
    return (
        <>
            <Helmet>
                <title> Activate Your Account</title>
            </Helmet>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle component={motion.div} {...fadeInUp}>
                            <Logo />
                            <Typography sx={{ color: "text.primary", mb: 5 }}>
                                Tautan verifikasi akun telah dikirim
                            </Typography>
                            <Typography sx={{ color: "text.secondary", mb: 5 }}>
                                Silakan cek email Anda untuk melanjutkan proses registrasi. Jika belum ditemukan, cek juga folder spam di email Anda.
                            </Typography>
                        </HeadingStyle>

                        <Typography
                            component={motion.p}
                            {...fadeInUp}
                            variant="body2"
                            align="center"
                            sx={{ mt: 3 }}
                        >
                            Already activate your accout?{" "}
                            <Link variant="subtitle2" component={RouterLink} to="/login">
                                Login
                            </Link>
                        </Typography>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </>
    );
}
