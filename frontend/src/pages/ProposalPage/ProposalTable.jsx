import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

export default function DataTable({ columns, data }) {
    const navigate = useNavigate();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const handleRowClick = (_id) => {
        navigate(`/proposal/${_id}`);
    };

    return (
        <div>
            <TableContainer
                component={Paper}
                sx={{
                    width: '1400px',
                    height: '685px',
                    flexShrink: 0,
                    borderRadius: '15px',
                    background: '#F8F8F8',
                    marginLeft: '50px',
                }}
            >
                <Table {...getTableProps()} className="baseTable w-96 h-96 bg-stone-50 rounded-2xl">
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    {...row.getRowProps()}
                                    key={row.id}
                                    onClick={() => handleRowClick(row.original._id)}
                                    style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#EAEAEA',
                                        },
                                    }}
                                >
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
