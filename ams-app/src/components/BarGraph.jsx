import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { category: 'Laptop', value: 300 },
  { category: 'Furniture', value: 500 },
  { category: 'Vehicle', value: 400 },
];

const BarGraph = () => (
  <BarChart width={300} height={250} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip formatter={(value) => `KSH ${value.toLocaleString()}`} />
    <Legend />
    <Bar dataKey="value" fill="#0088FE" />
  </BarChart>
);

export default BarGraph;
