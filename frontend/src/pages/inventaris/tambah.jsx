import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Top from '../../components/top';
import authHeader from '../../services/auth-header';
import { keadaan, units } from './config-inventaris';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function AppPage() {
    const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        namaBarang: '',
        kategori: '',
        jumlah: '',
        unit: '',
        keadaan: '',
        foto: null,
    });

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;

        // Mengelola input file (foto)
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Hanya mengambil file pertama dari array file
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const clearForm = () => {
        setFormData({
            namaBarang: '',
            kategori: '',
            jumlah: '',
            unit: '',
            keadaan: '',
            foto: null,
        });
    }
    const checkForm = () => {
        let isFullfilled = true;
        if (formData.namaBarang === '' ||
            formData.kategori === '' ||
            formData.jumlah === '' ||
            formData.unit === '' ||
            formData.keadaan === '' ||
            formData.foto === null
        ) {
            isFullfilled = false;
        }
        return isFullfilled
    }
    const handleSubmit = () => {
        if (checkForm() === false) {
            Notify.warning('Semua form bertanda bintang harus diisi!');
            return;
        }
        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('namaBarang', formData.namaBarang);
        formDataToSend.append('kategori', formData.kategori);
        formDataToSend.append('jumlah', formData.jumlah);
        formDataToSend.append('unit', formData.unit);
        formDataToSend.append('keadaan', formData.keadaan);
        formDataToSend.append('foto', formData.foto);
        // Kirim data ke backend
        axios
            .post(`${URL}/api/v1/inventaris`, formDataToSend, { headers: authHeader() })
            .then((response) => {
                Notify.success('Berhasil menambahkan barang: ' + formData.namaBarang);
                clearForm();
                setLoading(false);
            }).catch((error) => {
                Notify.failure(`Terjadi kesalahan: ${error.message}`);
                clearForm();
                setLoading(false);
            })
    };
    return (
        <>
            <Helmet>
                <title>Tambah Inventaris</title>
            </Helmet>
            <Container>
                <Top namaPage="Tambah Inventaris" back="/inventaris" />
                {loading ? Loading.dots() : Loading.remove()}
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    boxShadow={4}
                    p={2}
                    borderRadius={2}
                    bgcolor="background.paper"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Nama Barang"
                                fullWidth
                                name="namaBarang"
                                value={formData.namaBarang}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Kategori"
                                fullWidth
                                name="kategori"
                                value={formData.kategori}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Jumlah"
                                type="number"
                                fullWidth
                                name="jumlah"
                                value={formData.jumlah}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="unit-label">Unit *</InputLabel>
                                <Select
                                    required
                                    labelId="unit-label"
                                    id="unit"
                                    label="Unit"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                >
                                    {units.map((unit) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="keadaan-label">Keadaan *</InputLabel>
                                <Select
                                    required
                                    labelId="keadaan-label"
                                    id="keadaan"
                                    label="Keadaan"
                                    name="keadaan"
                                    value={formData.keadaan}
                                    onChange={handleInputChange}
                                >
                                    {keadaan.map((unit) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput
                                    name="foto"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                />
                            </Button>
                            <Typography>{formData.foto?.name}</Typography>
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '1rem', marginLeft: '1rem' }}
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Simpan
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </>
    );
}