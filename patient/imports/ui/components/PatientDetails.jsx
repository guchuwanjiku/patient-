import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Patients } from '../../api/patients';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const PatientDetails = () => {
  const { id } = useParams();
  const [newStatus, setNewStatus] = useState('');
  const [newNote, setNewNote] = useState('');

  const { patient, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('patients');
    const patient = Patients.findOne(id);
    return {
      patient,
      isLoading: !handle.ready(),
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleStatusUpdate = () => {
    Meteor.call('patients.updateStatus', id, newStatus, (error) => {
      if (error) {
        alert(error.message);
      } else {
        setNewStatus('');
      }
    });
  };

  const handleAddNote = () => {
    Meteor.call('patients.addNote', id, newNote, (error) => {
      if (error) {
        alert(error.message);
      } else {
        setNewNote('');
      }
    });
  };

  return (
    <Paper>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>Age: {patient.age}</Typography>
      <Typography>Status: {patient.status}</Typography>
      
      <TextField
        label="New Status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      />
      <Button onClick={handleStatusUpdate}>Update Status</Button>

      <TextField
        label="New Note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        multiline
      />
      <Button onClick={handleAddNote}>Add Note</Button>

      <List>
        {patient.notes.map((note, index) => (
          <ListItem key={index}>
            <ListItemText primary={note.text} secondary={new Date(note.createdAt).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PatientDetails;