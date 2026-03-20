import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", expense: 2000 },
  { month: "Feb", expense: 3000 },
  { month: "Mar", expense: 2500 },
  { month: "Apr", expense: 4000 },
  { month: "May", expense: 3500 },
  { month: "Jun", expense: 5000 },
];

const ExpensesChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📈 Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ExpensesChart;
