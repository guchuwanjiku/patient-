import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PatientCard = ({ patient }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{patient.name}</Typography>
        <Typography color="textSecondary">Age: {patient.age}</Typography>
        <Typography variant="body2">
          Heart Rate: {patient.vitalSigns.heartRate} bpm
        </Typography>
        <Typography variant="body2">
          Blood Pressure: {patient.vitalSigns.bloodPressure}
        </Typography>
        <Typography variant="body2">
          Temperature: {patient.vitalSigns.temperature}°C
        </Typography>
        <Button component={Link} to={`/patient/${patient._id}`}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PatientCard;