import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { UserContext } from '../../contexts/UserContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface BarGraphProps {
//   projectCount: number,
//   ticketCount: number
// }

const BarGraph: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext)
  {
    return;
  }

  const {user} = userContext;

  const data = {
    labels: ['Projects', 'Tickets'],  // X-axis labels
    datasets: [
      {
        label: 'Assigned',
        data: [user?.projectCount, user?.ticketCount],
        backgroundColor: '#00CCFF',
        borderColor: '#01ABD5',
        borderWidth: 1,
        barThickness: 40
      },
      {
        label: 'Completed',
        data: [user?.completedProjectCount, user?.completedTicketCount],
        backgroundColor: '#8BF600',
        borderColor: '#80E200',
        borderWidth: 1,
        barThickness: 40
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progress Report', // graph title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="w-[60vw] min-w-[300px] max-w-lg h-[60vh] min-h-[200px] max-h-lg p-4 bg-white rounded-lg shadow-lg">
        <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;