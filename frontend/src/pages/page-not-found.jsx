import { Box, Button, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';
import React from 'react';
import { Helmet } from 'react-helmet-async';
const primary = grey[700]; // #f44336

export default function Error() {
    return (
        <>
            <Helmet>
                <title>404</title>
            </Helmet>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '98vh',
                    backgroundColor: primary,
                }}
            >
                <Typography variant="h1" style={{ color: 'white' }}>
                    404
                </Typography>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Halaman tidak tersedia.
                </Typography>
                <Link href="/">
                    <Button variant="contained">Back Home</Button>
                </Link>
            </Box>
        </>

    );
}