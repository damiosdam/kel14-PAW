import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
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

export default function DetailInventaris() {
    const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;
    const { id } = useParams(); // Ambil ID dari parameter URL
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Panggil API untuk mendapatkan detail item berdasarkan ID
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/api/v1/inventaris/${id}`, { headers: authHeader() });
                setEditedData(response?.data?.data);
            } catch (error) {
                Notify.failure(`Error fetching item details: ${error}`);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;

        // Mengelola input file (foto)
        if (type === 'file') {
            setEditedData((prevData) => ({
                ...prevData,
                [name]: files[0], // Hanya mengambil file pertama dari array file
            }));
        } else {
            setEditedData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleSaveChanges = () => {
        if (checkForm() === false) {
            Notify.warning('Semua form bertanda bintang harus diisi!');
            return;
        }
        setLoading(true);
        // Panggil API untuk menyimpan perubahan
        const formDataToSend = new FormData();
        formDataToSend.append('namaBarang', editedData.namaBarang);
        formDataToSend.append('kategori', editedData.kategori);
        formDataToSend.append('jumlah', editedData.jumlah);
        formDataToSend.append('unit', editedData.unit);
        formDataToSend.append('keadaan', editedData.keadaan);
        formDataToSend.append('foto', editedData.foto);
        axios
            .put(`${URL}/api/v1/inventaris/${id}`, formDataToSend, { headers: authHeader() })
            .then((response) => {
                Notify.success('Perubahan disimpan');
                setLoading(false);
            })
            .catch((error) => {
                const message = error.response.data.message;
                Notify.failure(`Error saat menyimpan perubahan : ${message}`);
                setLoading(false);
            });
    };
    const checkForm = () => {
        let isFullfilled = true;
        if (editedData.foto === null ||
            editedData.namaBarang === '' ||
            editedData.kategori === '' ||
            editedData.jumlah === '' ||
            editedData.unit === '' ||
            editedData.keadaan === ''
        ) {
            isFullfilled = false;
        }
        return isFullfilled
    }
    return (
        <>
            <Helmet>
                <title>Detail Inventaris</title>
            </Helmet>
            <Container>
                <Top namaPage="Detail Inventaris" back="/inventaris" />
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
                        <Grid item xs={12} container justifyContent="center" alignItems="center">
                            <img
                                src={editedData.foto instanceof File ? URL.createObjectURL(editedData.foto) : editedData.foto?.exportLink || 'placeholder-image-url'}
                                alt="Foto Barang"
                                style={{ width: 'auto', maxHeight: '350px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Nama Barang"
                                fullWidth
                                name="namaBarang"
                                value={editedData.namaBarang || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Kategori"
                                fullWidth
                                name="kategori"
                                value={editedData.kategori || ''}
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
                                value={editedData.jumlah || ''}
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
                                    value={editedData.unit || ''}
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
                                    value={editedData.keadaan || ''}
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
                            <Typography>{editedData.foto?.originalFileName ? editedData.foto?.originalFileName : editedData.foto?.name}</Typography>
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveChanges}
                                style={{ marginTop: '1rem', marginLeft: '1rem' }}
                            >
                                Simpan Perubahan
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </>
    );
}