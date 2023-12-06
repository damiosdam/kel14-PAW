import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const navigate = useNavigate();

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    // <Box
    //   component="img"
    //   src="frontend\public\ukmmanage.svg" sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    // />
    <Button variant="text" size="large" sx={{ mt: 3, mb: 3 }} onClick={() => navigate("/")}>UKM Manage</Button>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Button variant="text" size="large" sx={{ mt: 3, mb: 3 }} onClick={() => navigate("/")}>UKM Manage</Button>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
