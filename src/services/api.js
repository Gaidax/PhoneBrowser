import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
});

export const fetchUserInfo = async (options = {}) => {
    let { start_date, end_date, filter_by, order_by } = options;
    const params = {
        start_date,
        end_date,
        filter_by: filter_by ? JSON.stringify(filter_by) : null,
        order_by: order_by ? JSON.stringify(order_by) : null,
    };

    const response = await api.get('/users', { params });
    return response?.data;
};
