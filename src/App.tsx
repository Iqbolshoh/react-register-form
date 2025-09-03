import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import SecurityProvider from './components/SecurityProvider';

function App() {
  return (
    <SecurityProvider>
      <RegistrationForm />
    </SecurityProvider>
  );
}

export default App;