
import axios from 'axios'

const BASE_API_URL = 'http://localhost:8081/api';

export const getAllGasPrices = async(page, limit) => {
    const allGasPrices = await axios.get(`${BASE_API_URL}/gas-prices/?page=${page}&limit=${limit}`)
    return allGasPrices.data
}

export const getAllGasPricesForGraph = async() => {
    const allGasPrices = await axios.get(`${BASE_API_URL}/gas-prices/?forGraph=true`)
    return allGasPrices.data
}
