import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBSpinner
 // MDBAlert
} from 'mdb-react-ui-kit';

// CHANGE THIS: Import from your existing api.js instead of authAPI
import { signupUser, loginUser } from '../api';  // ← Updated import

function Account() {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
    fullName: '',
    phone: '',
    studentId: '',
    department: '',
    batch: '',
    teacherId: '',
    designation: ''
  });

  // Detect route changes and update active tab
  useEffect(() => {
    if (location.pathname === '/signup') {
      setJustifyActive('tab2');
    } else {
      setJustifyActive('tab1');
    }
  }, [location.pathname]);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) return;
    
    setJustifyActive(value);
    setError('');
    setSuccess('');
    
    // Update URL when tabs are clicked
    if (value === 'tab1') {
      navigate('/');
    } else {
      navigate('/signup');
    }
  };

  // Handle login input changes
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Handle register input changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  // Handle role change
  const handleRoleChange = (role) => {
    setRegisterData({
      ...registerData,
      role: role,
      studentId: role === 'teacher' ? '' : registerData.studentId,
      teacherId: role === 'student' ? '' : registerData.teacherId,
      designation: role === 'student' ? '' : registerData.designation
    });
  };

  // UPDATED: Login handler using your api.js
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Use your existing loginUser function
      const response = await loginUser(loginData);
      
      // Check response based on your backend structure
      if (response.success || response.token) {
        setSuccess('Login successful!');
        
        // Store token and user data
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATED: Registration handler using your api.js
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Prepare data based on role
    const userData = {
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
      role: registerData.role,
      fullName: registerData.fullName,
      phone: registerData.phone,
      ...(registerData.role === 'student' ? {
        studentId: registerData.studentId,
        department: registerData.department,
        batch: registerData.batch
      } : {
        teacherId: registerData.teacherId,
        department: registerData.department,
        designation: registerData.designation
      })
    };

    try {
      // Use your existing signupUser function
      const response = await signupUser(userData);
      
      // Check response based on your backend structure
      if (response.success || response.user) {
        setSuccess('Registration successful!');
        
        // If auto-login is enabled, store token and redirect
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user || response.data));
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // Switch to login tab after successful registration
          setTimeout(() => {
            navigate('/');
            setSuccess('');
          }, 2000);
        }
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Your existing JSX remains the same
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {/* Error/Success Messages */}
      {error && (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {error}
        <button type="button" className="btn-close" onClick={() => setError('')}></button>
      </div>
    )}
    {success && (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        {success}
        <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
      </div>
    )}

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        {/* LOGIN TAB - Your existing JSX remains the same */}
        <MDBTabsPane show={justifyActive === 'tab1'}>
          <form onSubmit={handleLogin}>
            <div className="text-center mb-3">
              <p>Sign in with:</p>
              <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>
              </div>
              <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput 
              wrapperClass='mb-4' 
              label='Email address' 
              name='email'
              value={loginData.email}
              onChange={handleLoginChange}
              type='email'
              required
            />
            <MDBInput 
              wrapperClass='mb-4' 
              label='Password' 
              name='password'
              value={loginData.password}
              onChange={handleLoginChange}
              type='password'
              required
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn 
              className="mb-4 w-100" 
              type="submit"
              disabled={loading}
            >
              {loading ? <MDBSpinner size='sm' /> : 'Sign in'}
            </MDBBtn>
            <p className="text-center">
              Not a member? 
              <a href="#!" onClick={() => handleJustifyClick('tab2')}> Register</a>
            </p>
          </form>
        </MDBTabsPane>

        {/* REGISTER TAB - Your existing JSX remains the same */}
        <MDBTabsPane show={justifyActive === 'tab2'}>
          <form onSubmit={handleRegister}>
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>
              </div>
              <p className="text-center mt-3">or:</p>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="form-label">Register as:</label>
              <div className="d-flex gap-3">
                <MDBCheckbox 
                  name='role' 
                  id='studentRole'
                  label='Student'
                  checked={registerData.role === 'student'}
                  onChange={() => handleRoleChange('student')}
                />
                <MDBCheckbox 
                  name='role' 
                  id='teacherRole'
                  label='Teacher'
                  checked={registerData.role === 'teacher'}
                  onChange={() => handleRoleChange('teacher')}
                />
              </div>
            </div>

            {/* Common Fields */}
            <MDBInput 
              wrapperClass='mb-4' 
              label='Full Name' 
              name='fullName'
              value={registerData.fullName}
              onChange={handleRegisterChange}
              type='text'
              required
            />
            <MDBInput 
              wrapperClass='mb-4' 
              label='Username' 
              name='username'
              value={registerData.username}
              onChange={handleRegisterChange}
              type='text'
              required
            />
            <MDBInput 
              wrapperClass='mb-4' 
              label='Email' 
              name='email'
              value={registerData.email}
              onChange={handleRegisterChange}
              type='email'
              required
            />
            <MDBInput 
              wrapperClass='mb-4' 
              label='Phone' 
              name='phone'
              value={registerData.phone}
              onChange={handleRegisterChange}
              type='tel'
              required
            />

            {/* Role Specific Fields */}
            {registerData.role === 'student' ? (
              <>
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Student ID' 
                  name='studentId'
                  value={registerData.studentId}
                  onChange={handleRegisterChange}
                  type='text'
                  required
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Department' 
                  name='department'
                  value={registerData.department}
                  onChange={handleRegisterChange}
                  type='text'
                  required
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Batch' 
                  name='batch'
                  value={registerData.batch}
                  onChange={handleRegisterChange}
                  type='text'
                  required
                />
              </>
            ) : (
              <>
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Teacher ID' 
                  name='teacherId'
                  value={registerData.teacherId}
                  onChange={handleRegisterChange}
                  type='text'
                  required
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Department' 
                  name='department'
                  value={registerData.department}
                  onChange={handleRegisterChange}
                  type='text'
                  required
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Designation' 
                  name='designation'
                  value={registerData.designation}
                  onChange={handleRegisterChange}
                  type='text'
                  required
                />
              </>
            )}

            <MDBInput 
              wrapperClass='mb-4' 
              label='Password' 
              name='password'
              value={registerData.password}
              onChange={handleRegisterChange}
              type='password'
              required
            />

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' required />
            </div>

            <MDBBtn 
              className="mb-4 w-100" 
              type="submit"
              disabled={loading}
            >
              {loading ? <MDBSpinner size='sm' /> : 'Sign up'}
            </MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Account;