import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import {
    ButtonGroup,
    Card,
    CardContent,
    Container,
    Fade,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Top from '../../components/top';
import authHeader from '../../services/auth-header';

export default function Anggota() {
    const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const ThumbnailImage = styled('img')({
        width: 50,
        height: 50,
        cursor: 'pointer',
    });

    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleThumbnailClick = (thumbnailUrl) => {
        setSelectedThumbnail(thumbnailUrl);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        fetchData();
        console.log("data", data);
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get(`${URL}/api/v1/anggota`, { headers: authHeader() });
            setData(result?.data?.data);
        } catch (error) {
            Notify.failure("Error fetching data: ", error);
        }
    };

    Confirm.init({
        okButtonColor: '#1174EF',
        cancelButtonColor: '#FF0000',
    });

    // make handleDelete with confirmation modal and refresh the page
    const handleDelete = (itemId) => {
        Confirm.show(
            'Konfirmasi',
            'Apakah Anda yakin ingin menghapus item ini?',
            'Ya',
            'Tidak',
            () => {
                setData((prevData) => prevData.filter(item => item._id !== itemId));
                // Panggil API untuk menghapus item dengan ID tertentu
                axios
                    .delete(`${URL}/api/v1/anggota/${itemId}`, { headers: authHeader() })
                    .then((response) => {
                        Notify.success('Item berhasil dihapus');
                        // Panggil fungsi untuk memperbarui data setelah penghapusan
                        fetchData();
                    })
                    .catch((error) => {
                        Notify.failure('Error saat menghapus item:', error);
                        fetchData();
                    });

            },
            () => {
                fetchData();
            }
        );
    };


    return (
        <>
            <Helmet>
                <title> Anggota </title>
            </Helmet>
            <Container>
                <Top namaPage="Anggota" target="/anggota/tambah" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nama</TableCell>
                                <TableCell align="right">Fakultas</TableCell>
                                <TableCell align="right">Prodi</TableCell>
                                <TableCell align="right">NIM</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Posisi</TableCell>
                                <TableCell align="right">Foto</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Nomor HP</TableCell>
                                <TableCell align="right">TTL</TableCell>
                                <TableCell align="right">Asal</TableCell>
                                <TableCell align="right">Periode</TableCell>
                                <TableCell align="right">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.namaAnggota}
                                    </TableCell>
                                    <TableCell align="right">{row.fakultasAnggota}</TableCell>
                                    <TableCell align="right">{row.prodiAnggota}</TableCell>
                                    <TableCell align="right">{row.nimAnggota}</TableCell>
                                    <TableCell align="right">{row.emailAnggota}</TableCell>
                                    <TableCell align="right">{row.posisiAnggota}</TableCell>
                                    <TableCell align="right">
                                        <ThumbnailImage
                                            src={row.foto?.exportLink}
                                            alt={row.namaAnggota}
                                            onClick={() => handleThumbnailClick(row.foto?.exportLink)}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{row.statusAnggota}</TableCell>
                                    <TableCell align="right">{row.nomorHpAnggota}</TableCell>
                                    <TableCell align="right">{row.ttlAnggota}</TableCell>
                                    <TableCell align="right">{row.asalAnggota}</TableCell>
                                    <TableCell align="right">{row.periodeAnggota}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup>
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                color='success'
                                                onClick={() => navigate(`/anggota/${row._id}`)}
                                            >
                                                <Edit fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                color='error'
                                                onClick={() => handleDelete(row._id)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Fade in={openModal} align="center">
                        <Card style={{
                            maxWidth: '80%',
                            maxHeight: '80%',
                            overflow: 'hidden',
                            backgroundColor: 'white'
                        }}>
                            <CardContent>
                                <Typography variant="h6" align="center" gutterBottom>
                                    Foto Anggota
                                </Typography>
                                <img
                                    src={selectedThumbnail}
                                    alt="Foto Anggota"
                                    style={{ width: '100%', height: '100%', maxHeight: '500px' }}
                                />
                            </CardContent>
                        </Card>
                    </Fade>
                </Modal>
            </Container>

        </>
    );
}
