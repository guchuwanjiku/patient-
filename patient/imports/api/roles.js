import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

if (Meteor.isServer) {
  Meteor.startup(() => {
    if (Roles.getAllRoles().fetch().length === 0) {
      Roles.createRole('doctor');
      Roles.createRole('nurse');
      Roles.createRole('admin');
    }
  });
}

Meteor.methods({
  'roles.setUserRole'(userId, role) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    Roles.addUsersToRoles(userId, role);
  },
});

export const checkUserRole = (user, roles) => {
  if (!user) return false;
  return Roles.userIsInRole(user, roles);
};