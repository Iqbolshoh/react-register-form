import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import SecurityProvider from './components/SecurityProvider';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <SecurityProvider>
      <RegistrationForm />
      <AdminPanel />
    </SecurityProvider>
  );
}

export default App;