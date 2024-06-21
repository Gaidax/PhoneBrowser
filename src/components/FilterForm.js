import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import { format } from 'date-fns';


const FilterForm = ({ onSubmit, open, onClose, selectedValue }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterByField, setFilterByField] = useState('');
    const [filterByValue, setFilterByValue] = useState('');
    const [dateError, setDateError] = useState('');

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedStartDate = startDate ? format(startDate, 'yyyyMMdd') : null;
        const formattedEndDate = endDate ? format(endDate, 'yyyyMMdd') : null;
        let params = { start_date: formattedStartDate, end_date: formattedEndDate, filter_by: {} };

        if (filterByField && filterByValue) {
            params.filter_by[filterByField] = filterByValue;
        }
        onSubmit(params);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setDateError('Start date cannot be after end date');
        } else {
            setDateError('');
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate && date < startDate) {
            setDateError('End date cannot be before start date');
        } else {
            setDateError('');
        }
    };

    const isSubmitDisabled = (!startDate && !endDate && !filterByField && !filterByValue) // all fields are empty
        || ((!startDate || !endDate) && (!filterByField && !filterByValue)) // both date must be populated 
        || dateError

    return (
        <Box sx={{ width: 500, padding: 5 }} role="presentation">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth error={!!dateError} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth error={!!dateError} />}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Filter By"
                            value={filterByField}
                            onChange={(e) => setFilterByField(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="phone">Phone Number</MenuItem>
                            <MenuItem value="voicemail">Voicemail</MenuItem>
                            <MenuItem value="userId">User ID</MenuItem>
                            <MenuItem value="clusterId">Cluster ID</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Value"
                            value={filterByValue}
                            onChange={(e) => setFilterByValue(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {dateError && (
                            <Typography variant="caption" color="error">
                                {dateError}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitDisabled}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default FilterForm;