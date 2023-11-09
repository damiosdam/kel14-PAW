import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {


  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    // <Box
    //   component="img"
    //   src="frontend\public\ukmmanage.svg" sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    // />
    <Button variant="text" size="large" sx={{ mt: 3, mb: 3 }}>UKM Manage</Button>
  );


  if (disabledLink) {
    return logo;
  }

  return (
    <Link href="/" sx={{ display: 'contents' }}>
      <Button variant="text" size="large" sx={{ mt: 3, mb: 3 }}>UKM Manage</Button>
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
