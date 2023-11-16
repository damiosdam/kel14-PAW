import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Top from '../../components/top';
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
    const { id } = useParams(); // Ambil ID dari parameter URL
    const [itemData, setItemData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Panggil API untuk mendapatkan detail item berdasarkan ID
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/inventaris/${id}`);
                setItemData(response?.data?.data);
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
        // Panggil API untuk menyimpan perubahan
        axios
            .put(`http://localhost:5000/api/v1/inventaris/${id}`, editedData)
            .then((response) => {
                Notify.success('Perubahan disimpan');
                setIsEditing(false);
            })
            .catch((error) => {
                Notify.failure(`Error saat menyimpan perubahan : ${error}`);
            });
    };
    const handleCancelEdit = () => {
        // Kembalikan data yang diubah ke data awal
        setEditedData(itemData);
        setIsEditing(false);
    };
    const checkForm = () => {
        let isFullfilled = true;

        return isFullfilled
    }
    return (
        <>
            <Helmet>
                <title>Detail Inventaris</title>
            </Helmet>
            <Container>
                <Top namaPage="Detail Inventaris" back="/inventaris" />
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
                                value={editedData.namaBarang}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Kategori"
                                fullWidth
                                name="kategori"
                                value={editedData.kategori}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Jumlah"
                                type="number"
                                fullWidth
                                name="jumlah"
                                value={editedData.jumlah}
                                onChange={handleInputChange}
                                disabled={!isEditing}
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
                                    value={editedData.unit}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
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
                                    value={editedData.keadaan}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
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
                            {/* <input
                                type="file"
                                accept="image/*"
                                name="foto"
                                onChange={handleInputChange}
                            /> */}
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
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            {isEditing ? (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSaveChanges}
                                        style={{ marginTop: '1rem', marginLeft: '1rem' }}
                                    >
                                        Simpan Perubahan
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleCancelEdit}
                                        style={{ marginTop: '1rem', marginLeft: '1rem' }}
                                    >
                                        Batal
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    style={{ marginTop: '1rem', marginLeft: '1rem' }}
                                    onClick={() => setIsEditing(true)}>
                                    Edit
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </>
    );
}