import React from 'react';
import AssignmentList from './components/AssignmentList.jsx';
import './styles/main.scss';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🔐 CipherSQLStudio</h1>
          <p className="subtitle">Master SQL through hands-on assignments</p>
        </div>
      </header>
      <AssignmentList />
    </div>
  );
}

export default App;