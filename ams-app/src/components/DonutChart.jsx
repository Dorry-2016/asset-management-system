import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#0088FE", 
  "#00C49F", 
  "#FFBB28", 
  "#FF8042",
  "#A28BFE",
  "#FF6699", 
  "#33CC33",
  "#FF3333", 
  "#3399FF", 
  "#996633", 
  "#CC00CC",
  "#00CCCC",           
];
const DonutChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/auth/asset_distribution/category")
      .then(res => {
        if (res.data.Status) {
          const formatted = res.data.Result.map((item, index) => ({
            name: item.category,
            value: item.total
          }));
          setData(formatted);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      overflow: "hidden"
    }}>
      <h6 style={{
        textAlign: "center", marginBottom: "10px",
        marginTop: "0"
       }}>
      Asset Distribution by Category</h6>

    <PieChart width={350} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
          innerRadius={40}
                   outerRadius={80}
          
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
      </PieChart>
      </div>
  );
};

export default DonutChart;
