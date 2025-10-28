import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';

import Login from './Login';
import Register from './Register';
import '../../styles/Auth.css';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
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
  );
};

export default AuthTabs;
