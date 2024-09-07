
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import '../imports/api/patients';
import '../imports/api/roles';
import '../imports/api/auditLog';

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (Meteor.users.find().countAsync() === 0) {
    console.log('Creating seed user...');
    const userId = Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      email: 'admin@example.com',
    });
    Roles.addUsersToRoles(userId, 'admin');
    console.log('Seed user created.');

    // Create a test doctor account
    const doctorId = Accounts.createUser({
      username: 'doctor',
      password: 'doctorpassword',
      email: 'doctor@example.com',
    });
    Roles.addUsersToRoles(doctorId, 'doctor');

    // Create a test nurse account
    const nurseId = Accounts.createUser({
      username: 'nurse',
      password: 'nursepassword',
      email: 'nurse@example.com',
    });
    Roles.addUsersToRoles(nurseId, 'nurse');
  }

  // Log the number of users, useful for debugging
  console.log(`Number of users: ${Meteor.users.find().countAsync()}`);
});
