import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



// ----------------------------------------------------------------------

export default function SayHi() {
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Selamat datang wahai pejuang organisasi!
            </Typography>
        </Container>
    );
}
