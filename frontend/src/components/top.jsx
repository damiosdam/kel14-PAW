import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Iconify from './iconify';

export default function Top({ namaPage, target, back }) {
    const navigate = useNavigate();
    return (
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={5}>
            <Typography variant="h4">{namaPage}</Typography>
            {target != null ? (
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => navigate(target)}
                >
                    Tambah {namaPage}
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color='secondary'
                    startIcon={<Iconify icon="ep:back" />}
                    onClick={() => navigate(back)}
                >
                    Kembali
                </Button>
            )}
        </Stack>
    );
}
