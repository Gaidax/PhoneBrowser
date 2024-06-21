import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';

const UserInfoTable = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleRequestSort, order, orderBy }) => {
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString();
    };
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'originationTime'}
                                direction={orderBy === 'originationTime' ? order : 'asc'}
                                onClick={() => handleRequestSort('originationTime')}
                            >
                                Origination Time
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'userId'}
                                direction={orderBy === 'userId' ? order : 'asc'}
                                onClick={() => handleRequestSort('userId')}
                            >
                                User ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'clusterId'}
                                direction={orderBy === 'clusterId' ? order : 'asc'}
                                onClick={() => handleRequestSort('clusterId')}
                            >
                                Cluster ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'phone'}
                                direction={orderBy === 'phone' ? order : 'asc'}
                                onClick={() => handleRequestSort('phone')}
                            >
                                Phone
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'voicemail'}
                                direction={orderBy === 'voicemail' ? order : 'asc'}
                                onClick={() => handleRequestSort('voicemail')}
                            >
                                Voicemail
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={`user-row-${row._id}-${i}`}>
                            <TableCell>{formatDate(row.originationTime)}</TableCell>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.clusterId}</TableCell>
                            <TableCell>{row.devices.phone}</TableCell>
                            <TableCell>{row.devices.voicemail}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default UserInfoTable;

