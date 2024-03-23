import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import moment from 'moment'
import { getAllGasPricesForGraph } from './services/api';

const SimpleLineChart = ({ }) => {

  const [gasPrices, setGasPrices] = useState([]);

  useEffect(()=> {
    allGasPrices()
  },[])

  const allGasPrices = async () => {
    const response = await getAllGasPricesForGraph();
    if (response?.success) {
      setGasPrices(response?.data.gasPrices);
    } else {
      console.log(response?.error)
    }
  };

  const filteredData = gasPrices.map(item => {
    const priceUsd = parseFloat(item.price_usd.replace(/[^\d.-]/g, ''));
    const priceNavax = parseInt(item.price_navax, 10);
    const dateFormatted = moment(item.createdAt).format('LTS')
    
    return {
        ...item,
        price_usd: priceUsd,
        price_navax: priceNavax,
        createdAt: dateFormatted,
    };
});



  return (
    <LineChart width={1000} height={300} data={filteredData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="createdAt" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price_usd" name="Price (USD)" stroke="#8884d8" />
      <Line type="monotone" dataKey="price_navax" name="Price (nAVAX)" stroke="#82ca9d" />
    </LineChart>
  );
};

export default SimpleLineChart;
