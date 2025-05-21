import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from'./pages/Dashboard';
import LabReport from './pages/LabReport';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="lab-report" element={<LabReport />} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default App;