import React, { useState } from 'react';
import InstitutionDashboard from './components/InstitutionDashboard';
import LoginDashboard from './components/LoginDashboard';
import AicteDashboard from './components/AicteDashboard';
import StudentPortal from './components/StudentPortal';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'institution' | 'aicte' | 'student'

  if (currentView === 'institution') {
    return <InstitutionDashboard onLogout={() => setCurrentView('login')} />;
  }
  if (currentView === 'aicte') {
    return <AicteDashboard onLogout={() => setCurrentView('login')} />;
  }
  if (currentView === 'student') {
    return <StudentPortal onLogoutGateway={() => setCurrentView('login')} />;
  }
  return (
    <LoginDashboard
      onConnectInstitution={() => setCurrentView('institution')}
      onConnectAicte={() => setCurrentView('aicte')}
      onConnectStudent={() => setCurrentView('student')}
    />
  );
}

export default App;
