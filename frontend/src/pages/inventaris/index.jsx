import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

export default function AppPage() {
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
            const result = await axios.get('http://localhost:5000/api/v1/inventaris');
            setData(result?.data?.data);
        } catch (error) {
            Notify.failure("Error fetching data: ", error);
        }
    };

    Confirm.init({
        titleColor: '#3f50b5',
        okButtonBackground: '#3f50b5',
    });

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
                    .delete(`http://localhost:5000/api/v1/inventaris/${itemId}`)
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
                <title>Inventaris</title>
            </Helmet>
            <Container>
                <Top namaPage="Inventaris" target="/inventaris/tambah" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nama Barang</TableCell>
                                <TableCell align="right">Kategori</TableCell>
                                <TableCell align="right">Jumlah</TableCell>
                                <TableCell align="right">Unit</TableCell>
                                <TableCell align="right">Keadaan</TableCell>
                                <TableCell align="right">Thumbnail</TableCell>
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
                                        {row.namaBarang}
                                    </TableCell>
                                    <TableCell align="right">{row.kategori}</TableCell>
                                    <TableCell align="right">{row.jumlah}</TableCell>
                                    <TableCell align="right">{row.unit}</TableCell>
                                    <TableCell align="right">{row.keadaan}</TableCell>
                                    <TableCell align="right">
                                        <ThumbnailImage
                                            src={row.foto?.exportLink}
                                            alt={row.namaBarang}
                                            onClick={() => handleThumbnailClick(row.foto?.exportLink)}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup size="small" aria-label="small button group">
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                color='success'
                                                onClick={() => navigate(`/inventaris/${row._id}`)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                color='error'
                                                onClick={() => handleDelete(row._id)}
                                            >
                                                <DeleteIcon fontSize="small" />
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
                                    Foto Barang
                                </Typography>
                                <img
                                    src={selectedThumbnail}
                                    alt="Foto Barang"
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