import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';

import Header from './header';
import Main from './main';
import Navbar from './navbar';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children, setAuth }) {
    const [openNav, setOpenNav] = useState(false);

    return (
        <>
            <Header onOpenNav={() => setOpenNav(true)} />

            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                <Navbar openNav={openNav} onCloseNav={() => setOpenNav(false)} setAuth={setAuth} />
                <Main>{children}</Main>
            </Box>
        </>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node,
};
