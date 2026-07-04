import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [trendData, setTrendData] = useState({ labels: [], data: [] });

  useEffect(() => {
    api.get('/analytics/trends')
      .then(res => {
        // Assume res.data is { labels: ['Jan', ...], data: [1,2,...] }
        setTrendData(res.data);
      })
      .catch(console.error);
  }, []);

  const chartData = {
    labels: trendData.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Backup Size (GB)',
        data: trendData.data || [0, 1, 0.5, 2, 1.5, 3, 0],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Backup Trend (Last 7 Days)</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Analytics;