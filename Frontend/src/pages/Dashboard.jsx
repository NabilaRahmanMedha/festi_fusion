import React from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from 'reactstrap';
import '../styles/dashboard.css';

const Dashboard = () => {
  const data = {
    labels: ['Event A', 'Event B', 'Event C', 'Event D', 'Event E'],
    datasets: [
      {
        label: 'Bookings',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <div className="chart-container">
        <Line data={data} />
      </div>
    </Container>
  );
};

export default Dashboard;
