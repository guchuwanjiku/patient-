import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const AuditLogs = new Mongo.Collection('auditLogs');

export const logAction = (userId, action, details) => {
  AuditLogs.insert({
    userId,
    action,
    details,
    timestamp: new Date(),
  });
};

if (Meteor.isServer) {
  Meteor.publish('auditLogs', function () {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      return this.ready();
    }
    return AuditLogs.find({});
  });
}