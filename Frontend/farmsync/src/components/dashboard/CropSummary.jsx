import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#8884D8"];

const CropsSummaryChart = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/crops")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  // Transform data for the chart
  const chartData = crops.map((crop) => ({
    name: crop.name,
    value: crop.quantity, // or crop.area, depending on your schema
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 className="text-lg font-semibold mb-2">Crops Summary</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropsSummaryChart;