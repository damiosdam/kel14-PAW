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

export default function DetailAnggota() {
    const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;
    const { id } = useParams(); // Ambil ID dari parameter URL
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Panggil API untuk mendapatkan detail item berdasarkan ID
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/api/v1/anggota/${id}`, { headers: authHeader() });
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
        formDataToSend.append('namaAnggota', editedData.namaAnggota);
        formDataToSend.append('fakultasAnggota', editedData.fakultasAnggota);
        formDataToSend.append('prodiAnggota', editedData.prodiAnggota);
        formDataToSend.append('nimAnggota', editedData.nimAnggota);
        formDataToSend.append('emailAnggota', editedData.emailAnggota);
        formDataToSend.append('foto', editedData.foto);
        formDataToSend.append('statusAnggota', editedData.statusAnggota);
        formDataToSend.append('nomorHpAnggota', editedData.nomorHpAnggota);
        formDataToSend.append('ttlAnggota', editedData.ttlAnggota);
        formDataToSend.append('asalAnggota', editedData.asalAnggota);
        formDataToSend.append('periodeAnggota', editedData.periodeAnggota);
        axios
            .put(`${URL}/api/v1/anggota/${id}`, formDataToSend, { headers: authHeader() })
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
        if (editedData.namaAnggota === '' ||
            editedData.fakultasAnggota === '' ||
            editedData.prodiAnggota === '' ||
            editedData.nimAnggota === '' ||
            editedData.emailAnggota === '' ||
            editedData.foto === null ||
            editedData.statusAnggota === '' ||
            editedData.nomorHpAnggota === '' ||
            editedData.ttlAnggota === '' ||
            editedData.asalAnggota === '' ||
            editedData.periodeAnggota === ''
        ) {
            isFullfilled = false;
        }
        return isFullfilled
    }
    return (
        <>
            <Helmet>
                <title>Detail Anggota</title>
            </Helmet>
            <Container>
                <Top namaPage="Detail Anggota" back="/anggota" />
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
                                alt="Foto Anggota"
                                style={{ width: 'auto', maxHeight: '350px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Nama Anggota"
                                fullWidth
                                name="namaAnggota"
                                value={editedData.namaAnggota || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Fakultas"
                                fullWidth
                                name="fakultasAnggota"
                                value={editedData.fakultasAnggota || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Prodi"
                                fullWidth
                                name="prodiAnggota"
                                value={editedData.prodiAnggota || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="NIM"
                                fullWidth
                                name="nimAnggota"
                                value={editedData.nimAnggota || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Email"
                                fullWidth
                                name="emailAnggota"
                                value={editedData.emailAnggota || ''}
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
                                    value={editedData.posisiAnggota || ''}
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
                            <Typography>{editedData.foto?.originalFileName ? editedData.foto?.originalFileName : editedData.foto?.name}</Typography>
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
                                    value={editedData.statusAnggota || ''}
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
                                value={editedData.nomorHpAnggota || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="TTL"
                                fullWidth
                                name="ttlAnggota"
                                value={editedData.ttlAnggota || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Asal"
                                fullWidth
                                name="asalAnggota"
                                value={editedData.asalAnggota || ''}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                required
                                label="Periode"
                                fullWidth
                                name="periodeAnggota"
                                value={editedData.periodeAnggota || ''}
                                onChange={handleInputChange}
                            />
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