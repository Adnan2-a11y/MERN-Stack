import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/homepage/Dashboard';
import './styles/Auth.css'; // ✅ correct global path

const App = () => {
  const [activeTab, setActiveTab] = useState('login'); // ✅ state defined

  return (
    <Router>
      <MDBContainer className="p-4 d-flex flex-column align-items-center justify-content-center min-vh-100">
        <MDBTabs pills justify className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => setActiveTab('login')}
              active={activeTab === 'login'}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => setActiveTab('register')}
              active={activeTab === 'register'}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane open={activeTab === 'login'}>
            <Login />
          </MDBTabsPane>
          <MDBTabsPane open={activeTab === 'register'}>
            <Register />
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>

      {/* Example of routing to a dashboard */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
