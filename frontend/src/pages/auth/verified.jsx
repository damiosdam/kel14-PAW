import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { motion } from "framer-motion";
import React from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
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

export default function Verified({ setAuth }) {
    const navigate = useNavigate();
    return (
        <>
            <Helmet>
                <title> Verified </title>
            </Helmet>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle component={motion.div} {...fadeInUp}>
                            <Logo />
                            <Typography sx={{ color: "text.primary", mb: 5 }}>
                                Email Anda berhasil diverifikasi. Silakan login
                            </Typography>
                        </HeadingStyle>

                        <Button variant="contained" onClick={() => navigate("/login")} size="large" sx={{ mt: 3, mb: 3 }}>Login</Button>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </>
    );
}
