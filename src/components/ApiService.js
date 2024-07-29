import axios from "axios";

const API_BASE_URL = "http://34.131.30.54:8000/api/v1/customer/register";

const ApiService = {
  registerCustomer: (data) => axios.post(API_BASE_URL, data),
};

export default ApiService;
