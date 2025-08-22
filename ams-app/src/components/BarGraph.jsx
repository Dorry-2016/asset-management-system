import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const BarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/asset_distribution/name")
      .then(res => {
        if (res.data.Status) {
          const formatted = res.data.Result.map(item => ({
            asset: item.asset,
            value: item.total
          }));
          setData(formatted);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
    <BarChart width={350} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="asset" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
    </div>
  );
};

export default BarGraph;
