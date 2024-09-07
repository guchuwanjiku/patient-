import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ThemeProvider, CssBaseline } from '@mui/material';

import theme from './theme';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientDetails from './components/PatientDetails';
import AdminPanel from './components/AdminPanel';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};