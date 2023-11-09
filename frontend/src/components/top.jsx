import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from './iconify';

export default function Top({ namaPage, target }) {
    return (
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={5}>
            <Typography variant="h4">{namaPage}</Typography>
            <Link href={target}>
                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Tambah {namaPage}
                </Button>
            </Link>
        </Stack>
    );
}
