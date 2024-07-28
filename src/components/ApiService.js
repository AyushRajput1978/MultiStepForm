import axios from 'axios';

const API_BASE_URL = 'https://loanmanagementsystem-nrfq.onrender.com/api/v1/customer/register';

const ApiService = {
    registerCustomer: (data) => axios.post(API_BASE_URL, data),
};

export default ApiService;
