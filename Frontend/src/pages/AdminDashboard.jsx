import React from "react";
import {
  LineChart,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const data = [
    {
      name: "Mehndi Night",
      
      pv: 2400,
      
    },
    {
      name: "Haldi Night",
      
      pv: 1398,
      
    },
    {
      name: "Conference",
      
      pv: 9800,
      
    },
    {
      name: "Birthday Celebration",
      
      pv: 3908,
      
    },
    {
      name: "Concert",
      
      pv: 4800,
      
    },
    {
      name: "Destination Wedding",
      
      pv: 3800,
      
    },
    {
      name: "Akht Ceremony",
      
      pv: 4300,
      
    },
  ];

  return (
    <section>
      <div
        className="container"
        style={{
          width: "100%",
          height: 600,
        }}
      >
        {" "}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#ba8a94"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminDashboard;