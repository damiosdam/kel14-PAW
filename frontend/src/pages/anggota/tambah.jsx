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
import { status, posisi } from './config-anggota';
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
        namaAnggota: '',
        fakultasAnggota: '',
        prodiAnggota: '',
        nimAnggota: '',
        emailAnggota: '',
        posisiAnggota: '',
        foto: null,
        statusAnggota: '',
        nomorHpAnggota: '',
        ttlAnggota: '',
        asalAnggota: '',
        periodeAnggota: '',
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
            namaAnggota: '',
            fakultasAnggota: '',
            prodiAnggota: '',
            nimAnggota: '',
            emailAnggota: '',
            posisiAnggota: '',
            foto: null,
            statusAnggota: '',
            nomorHpAnggota: '',
            ttlAnggota: '',
            asalAnggota: '',
            periodeAnggota: '',
        });
    }
    const checkForm = () => {
        let isFullfilled = true;
        if (formData.namaAnggota === '' ||
            formData.fakultasAnggota === '' ||
            formData.prodiAnggota === '' ||
            formData.nimAnggota === '' ||
            formData.emailAnggota === '' ||
            formData.posisiAnggota === '' ||
            formData.foto === null ||
            formData.statusAnggota === '' ||
            formData.nomorHpAnggota === '' ||
            formData.ttlAnggota === '' ||
            formData.asalAnggota === '' ||
            formData.periodeAnggota === ''
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
        formDataToSend.append('namaAnggota', formData.namaAnggota);
        formDataToSend.append('fakultasAnggota', formData.fakultasAnggota);
        formDataToSend.append('prodiAnggota', formData.prodiAnggota);
        formDataToSend.append('nimAnggota', formData.nimAnggota);
        formDataToSend.append('emailAnggota', formData.emailAnggota);
        formDataToSend.append('posisiAnggota', formData.posisiAnggota);
        formDataToSend.append('foto', formData.foto);
        formDataToSend.append('statusAnggota', formData.statusAnggota);
        formDataToSend.append('nomorHpAnggota', formData.nomorHpAnggota);
        formDataToSend.append('ttlAnggota', formData.ttlAnggota);
        formDataToSend.append('asalAnggota', formData.asalAnggota);
        formDataToSend.append('periodeAnggota', formData.periodeAnggota);
        // Kirim data ke backend
        axios
            .post(`${URL}/api/v1/anggota`, formDataToSend, { headers: authHeader() })
            .then((response) => {
                Notify.success('Berhasil menambahkan anggota: ' + formData.namaAnggota);
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
                <title>Tambah Anggota</title>
            </Helmet>
            <Container>
                <Top namaPage="Tambah Anggota" back="/anggota" />
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
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Nama Anggota"
                                fullWidth
                                name="namaAnggota"
                                value={formData.namaAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Fakultas"
                                fullWidth
                                name="fakultasAnggota"
                                value={formData.fakultasAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Prodi"
                                fullWidth
                                name="prodiAnggota"
                                value={formData.prodiAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="NIM"
                                fullWidth
                                name="nimAnggota"
                                value={formData.nimAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Email"
                                fullWidth
                                name="emailAnggota"
                                value={formData.emailAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <FormControl fullWidth>
                                <InputLabel id="posisi-label">Posisi *</InputLabel>
                                <Select
                                    required
                                    labelId="posisi-label"
                                    id="posisiAnggota"
                                    label="Posisi"
                                    name="posisiAnggota"
                                    value={formData.posisiAnggota}
                                    onChange={handleInputChange}
                                >
                                    {posisi.map((unit) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Foto
                                <VisuallyHiddenInput
                                    name="foto"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                />
                            </Button>
                            <Typography>{formData.foto?.name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <FormControl fullWidth>
                                <InputLabel id="status-label">Status Anggota *</InputLabel>
                                <Select
                                    required
                                    labelId="status-label"
                                    id="statusAnggota"
                                    label="Status"
                                    name="statusAnggota"
                                    value={formData.statusAnggota}
                                    onChange={handleInputChange}
                                >
                                    {status.map((unit) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Nomor HP"
                                fullWidth
                                name="nomorHpAnggota"
                                value={formData.nomorHpAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="TTL"
                                fullWidth
                                name="ttlAnggota"
                                value={formData.ttlAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Asal"
                                fullWidth
                                name="asalAnggota"
                                value={formData.asalAnggota}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Periode"
                                fullWidth
                                name="periodeAnggota"
                                value={formData.periodeAnggota}
                                onChange={handleInputChange}
                            />
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