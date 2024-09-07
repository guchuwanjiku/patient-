import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Paper, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
      }
    });
  };

  return (
    <Paper>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Paper>
  );
};

export default Login;