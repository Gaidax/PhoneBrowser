import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Popover from '@mui/material/Popover';
import FilterForm from '../components/FilterForm';
import Loader from '../components/Loader';
import UserInfoTable from '../components/UserInfoTable';
import { fetchUserInfo } from '../services/api';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const ToolBar = styled('div')({
    display: 'flex',
    justifyContent: 'end',
    marginBottom: 10,
});

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('originationTime');
    const [filters, setFilters] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSubmit = async (filters) => {
        setFilters(filters);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    useEffect(() => {

    }, [])

    const requestUsersList = async (offset, limit = 5, order, orderBy, filters = {}) => {
        setLoading(true);
        const response = await fetchUserInfo({
            offset,
            limit,
            order_by: { [orderBy]: order },
            ...filters
        });
        setUserInfo(response?.data || []);
        setLoading(false);
    }

    useEffect(() => {
        requestUsersList(page, rowsPerPage, order, orderBy, filters)
    }, [page, rowsPerPage, order, orderBy, filters]);


    return (
        <Box sx={{ padding: 5 }} >
            <ToolBar>
                <IconButton aria-describedby={id} variant="contained" onClick={handleClick}><FilterListIcon /></IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >

                    <FilterForm
                        onSubmit={handleFilterSubmit}
                        open={open}
                        onClose={handleClose} />
                </Popover>
            </ToolBar>
            {loading ? (
                <Loader />
            ) : (
                <UserInfoTable
                    data={userInfo}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleRequestSort={handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                />
            )}
        </Box>
    );
};

export default HomePage;
