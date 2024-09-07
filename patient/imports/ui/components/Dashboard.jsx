import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Patients } from '../../api/patients';
import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material';
import PatientCard from './PatientCard';

const Dashboard = () => {
  const { patients, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('patients');
    const patients = Patients.find({}).fetch();
    return {
      patients,
      isLoading: !handle.ready(),
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h4">Patient Dashboard</Typography>
        </Paper>
      </Grid>
      {patients.map((patient) => (
        <Grid item xs={12} sm={6} md={4} key={patient._id}>
          <PatientCard patient={patient} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;