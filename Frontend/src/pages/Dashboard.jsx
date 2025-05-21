import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/reports', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReports(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load your health data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const mockReports = [
    { date: '2023-01-01', glucose: 140, prediction: 0.6 },
    { date: '2023-01-15', glucose: 130, prediction: 0.4 },
    { date: '2023-02-01', glucose: 125, prediction: 0.3 },
    { date: '2023-02-15', glucose: 135, prediction: 0.5 },
    { date: '2023-03-01', glucose: 120, prediction: 0.2 },
    { date: '2023-03-15', glucose: 115, prediction: 0.15 }
  ];

  const chartData = {
    labels: mockReports.map(report => {
      const date = new Date(report.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Glucose Level',
        data: mockReports.map(report => report.glucose),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4
      },
      {
        label: 'Risk Score',
        data: mockReports.map(report => report.prediction * 200),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Health Trends',
      },
    },
  };

  const getLatestRiskLevel = () => {
    if (mockReports.length === 0) return null;
    const latestReport = mockReports[mockReports.length - 1];
    return latestReport.prediction;
  };

  const getRiskStatus = () => {
    const risk = getLatestRiskLevel();
    if (risk === null) return { status: 'unknown', color: 'gray', icon: <Clock className="h-6 w-6" /> };

    if (risk < 0.2) {
      return {
        status: 'Low Risk',
        color: 'green',
        icon: <CheckCircle className="h-6 w-6 text-green-500" />
      };
    }

    if (risk < 0.5) {
      return {
        status: 'Moderate Risk',
        color: 'yellow',
        icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />
      };
    }

    return {
      status: 'High Risk',
      color: 'red',
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />
    };
  };

  const riskStatus = getRiskStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900"
          >
            Welcome back, {user?.name}
          </motion.h1>
          <p className="mt-2 text-gray-600">Here's an overview of your diabetes health metrics</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Glucose Reading</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockReports.length > 0 ? mockReports[mockReports.length - 1].glucose : 'N/A'} mg/dL
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Glucose Trend</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockReports.length > 1 &&
                    mockReports[mockReports.length - 1].glucose < mockReports[mockReports.length - 2].glucose
                    ? 'Decreasing' : 'Stable'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full mr-4 ${
                riskStatus.status === 'Low Risk' ? 'bg-green-100 text-green-600' :
                riskStatus.status === 'Moderate Risk' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {riskStatus.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Assessment</p>
                <p className="text-2xl font-semibold text-gray-900">{riskStatus.status}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Metrics Over Time</h2>
          <div className="h-80">
            <Line options={chartOptions} data={chartData} />
          </div>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Glucose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockReports.slice().reverse().map((report, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.glucose} mg/dL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(report.prediction * 100).toFixed(0)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.prediction < 0.2 ? 'bg-green-100 text-green-800' :
                        report.prediction < 0.5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.prediction < 0.2 ? 'Low Risk' :
                         report.prediction < 0.5 ? 'Moderate Risk' :
                         'High Risk'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
