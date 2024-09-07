import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Paper, Typography, List, ListItem, ListItemText, Button, TextField, Select, MenuItem } from '@mui/material';

const AdminPanel = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');

  const { users, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('allUsers');
    const users = Meteor.users.find({}).fetch();
    return {
      users,
      isLoading: !handle.ready(),
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCreateUser = () => {
    Meteor.call('createUser', newUsername, newPassword, newRole, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        setNewUsername('');
        setNewPassword('');
        setNewRole('');
        alert('User created successfully');
      }
    });
  };

  const handleChangeRole = (userId, newRole) => {
    Meteor.call('roles.setUserRole', userId, newRole, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        alert('Role updated successfully');
      }
    });
  };

  return (
    <Paper>
      <Typography variant="h4">Admin Panel</Typography>
      
      <Typography variant="h5">Create New User</Typography>
      <TextField
        label="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Select
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>Select Role</MenuItem>
        <MenuItem value="doctor">Doctor</MenuItem>
        <MenuItem value="nurse">Nurse</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
      <Button onClick={handleCreateUser}>Create User</Button>

      <Typography variant="h5">Manage Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText primary={user.username} secondary={`Role: ${Roles.getRolesForUser(user._id).join(', ')}`} />
            <Select
              value={Roles.getRolesForUser(user._id)[0] || ''}
              onChange={(e) => handleChangeRole(user._id, e.target.value)}
            >
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="nurse">Nurse</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminPanel;