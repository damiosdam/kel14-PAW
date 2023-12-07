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
            const result = await axios.get('http://localhost:5000/api/v1/anggota');
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
            'Apakah anda yakin ingin menghapus data ini?',
            'Ya',
            'Tidak',
            async function (result) {
                if (result) {
                    try {
                        await axios.delete(`http://localhost:5000/api/v1/anggota/${itemId}`);
                        Notify.success('Data berhasil dihapus');
                        fetchData();
                    } catch (error) {
                        Notify.failure('Data gagal dihapus');
                        fetchData();
                    }
                }
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
            </Container>
            
        </>
    );
}
