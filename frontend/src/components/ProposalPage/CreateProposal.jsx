import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputLabel, Grid } from '@mui/material';
import Box from '@mui/material/Box';

function CreateProposal() {
    const [form, setForm] = useState({
        namaKegiatan: '',
        tempat: '',
        waktuKegiatan: '',
        jumlahMahasiswaTerlibat: '',
        jumlahDosenTerlibat: '',
        biayaYangDiajukan: '',
        narahubung: '',
        biayaYangDigunakan: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/v1/proposal', form);
            alert('Proposal created successfully');
        } catch (error) {
            console.error(error);
        }
    };
    
    const boxProps = {
        sx: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gridGap: '20px',
            padding: '10px 111px 654px 42px',
            width: '1400px',
            height: '850px',
            flexShrink: 0,
            borderRadius: '15px',
            background: '#F8F8F8',
        },
    };
    const textFieldProps = {
        shrink : true,
        variant: 'outlined',
        sx: {
            width: '575px', 
            height: '80px',
            flexShrink: 0,
            borderRadius: '10px',
            background: '#DEDEDE',
            '& .MuiInputBase-root': {
                height: '80px',
            },
            marginTop: '20px',
            marginRight: '50px',
            marginBottom: '20px', 
        },
        onChange: handleChange,
    };

    const labelProps = {
        shrink: true,
        variant: 'outlined',
        sx: {
            color: '#000',
            fontFamily: 'Inter',
            fontSize: '35px',
            fontWeight: '600',
        },
    };

    return (
        <Box {...boxProps}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                    <Grid item xs={6} style={{ paddingRight: '93px' }}>
                        <InputLabel {...labelProps}>Nama Kegiatan</InputLabel>
                        <TextField name="namaKegiatan" {...textFieldProps} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel {...labelProps}>Tempat</InputLabel>
                        <TextField name="tempat" {...textFieldProps} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel {...labelProps}>Waktu Kegiatan</InputLabel>
                        <TextField name="waktuKegiatan" {...textFieldProps} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel {...labelProps}>Jumlah Mahasiswa Terlibat</InputLabel>
                        <TextField name="jumlahMahasiswaTerlibat" {...textFieldProps} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel {...labelProps}>Jumlah Dosen Terlibat</InputLabel>
                        <TextField name="jumlahDosenTerlibat" {...textFieldProps} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel {...labelProps}>Biaya Yang Diajukan</InputLabel>
                        <TextField name="biayaYangDiajukan" {...textFieldProps} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel {...labelProps}>Narahubung</InputLabel>
                        <TextField name="narahubung" {...textFieldProps} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel {...labelProps}>Biaya Yang Digunakan</InputLabel>
                        <TextField name="biayaYangDigunakan" {...textFieldProps} />
                    </Grid>
                </Grid>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}

export default CreateProposal;