import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';


import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import MyCrop from './pages/MyCrop';
import DiseaseDetection from './pages/DiseaseDetection';
import Prescription from './pages/Prescription';
import Weather from './pages/Weather';
import Experts from './pages/Experts';
import BioKhaat from './pages/BioKhaat';
import Varieties from './pages/Varieties';
import Market from './pages/Market';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-crop" element={<MyCrop />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="prescription" element={<Prescription />} />
          <Route path="weather" element={<Weather />} />
          <Route path="experts" element={<Experts />} />
          <Route path="bio-khaat" element={<BioKhaat />} />
          <Route path="varieties" element={<Varieties />} />
          <Route path="market" element={<Market />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
