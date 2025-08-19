import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'HR', value: 400 },
  { name: 'AI', value: 300 },
  { name: 'ADMIN', value: 300 },
];

const COLORS = ['#00C49F', '#0088FE', '#FF8042'];

const DonutChart = () => (
  <PieChart width={250} height={250}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={50}
      outerRadius={80}
      paddingAngle={5}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value) => `KSH ${value.toLocaleString()}`} />
    <Legend />
  </PieChart>
);

export default DonutChart;
