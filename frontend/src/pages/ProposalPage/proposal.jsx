import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from './ProposalTable';

export default function ProposalPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:5000/api/v1/proposal');
            setData(result.data.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Nomor',
                id: 'row',
                Cell: ({ row }) => {
                    return <div>{row.index + 1}</div>;
                },
            },
            {
                Header: 'Nama Kegiatan',
                accessor: 'namaKegiatan',
            },
            {
                Header: 'Tempat',
                accessor: 'tempat',
            },
            {
                Header: 'Waktu Kegiatan',
                accessor: 'waktuKegiatan',
            },
            {
                Header: 'Jumlah Mahasiswa Terlibat',
                accessor: 'jumlahMahasiswaTerlibat',
            },
            {
                Header: 'Jumlah Dosen Terlibat',
                accessor: 'jumlahDosenTerlibat',
            },
            {
                Header: 'Biaya yang Diajukan',
                accessor: 'biayaYangDiajukan',
            },
            {
                Header: 'Biaya yang Digunakan',
                accessor: 'biayaYangDigunakan',
            },
            {
                Header: 'Narahubung',
                accessor: 'narahubung',
            },
        ],
        []

    );

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                gap: 2
            }}>
                <Typography
                    variant="h4"
                    component="div"
                    align="left"
                    style={{
                        color: '#737373',
                        fontFamily: 'Inter',
                        fontSize: '35px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 'normal',
                        marginLeft: '50px'
                    }}
                >
                    Proposal
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/proposal/create"
                    sx={{
                        borderRadius: 2,
                        bgcolor: '#D9D9D9',
                        color: '#4B4B4B',
                        marginRight: '60px',
                    }}
                >
                    Tambah Proposal
                </Button>
            </Box>
            <DataTable columns={columns} data={data} />
        </div>
    );
}