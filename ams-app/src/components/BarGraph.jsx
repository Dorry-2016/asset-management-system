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
    <div style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px"
    }}>
       <h6 style={{ textAlign: "center", marginBottom: "10px" }}>
      Asset Distribution by Name </h6>
    <BarChart width={350} height={200} data={data} barSize={40}>
      <XAxis dataKey="asset" axisLine={false} tickLine={false}/>
      <YAxis  hide />
        <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
         <Bar
          dataKey="value"
          fill="#60a5fa"
          radius={[5, 5, 0, 0]} // rounded top corners
        >
          {data.map((entry, index) => (
            <cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? "#bfdbfe" : "#1d4ed8"}
            />
          ))}
        </Bar>
      {/* <Legend /> */}
      {/* <Bar dataKey="value" fill="#8884d8" /> */}
    </BarChart>
    </div>
  );
};

export default BarGraph;
