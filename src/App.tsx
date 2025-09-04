import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import SecurityProvider from './components/SecurityProvider';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <SecurityProvider>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </SecurityProvider>
  );
}

export default App;