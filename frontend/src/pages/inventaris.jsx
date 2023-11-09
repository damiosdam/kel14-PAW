import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Container } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Top from '../components/top';
export default function AppPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:5000/api/v1/inventaris');
            console.log(result?.data?.data);
            setData(result?.data?.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
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
                                        <ButtonGroup size="small" aria-label="small button group">
                                            <Link href={"/inventaris/detail/" + row._id} underline="none">
                                                <IconButton aria-label="delete" size="small" color='info'>
                                                    <InfoIcon fontSize="small" />
                                                </IconButton>
                                            </Link>
                                            <Link href={"/inventaris/edit/" + row._id} underline="none">
                                                <IconButton aria-label="edit" size="small" color='success'>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Link>
                                            <Link href={"/inventaris/delete/" + row._id} underline="none">
                                                <IconButton aria-label="delete" size="small" color='error'>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Link>
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