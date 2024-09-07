import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Patients = new Mongo.Collection('patients');

if (Meteor.isServer) {
  Meteor.publish('patients', function () {
    if (!this.userId) {
      return this.ready();
    }
    return Patients.find({}, {
      fields: {
        name: 1,
        age: 1,
        vitalSigns: 1,
        status: 1,
        notes: 1,
      }
    });
  });
}

Meteor.methods({
  'patients.updateStatus'(patientId, status) {
    check(patientId, String);
    check(status, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Patients.update(patientId, { $set: { status } });
  },

  'patients.addNote'(patientId, note) {
    check(patientId, String);
    check(note, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Patients.update(patientId, { $push: { notes: { text: note, createdAt: new Date(), createdBy: this.userId } } });
  },

  'patients.updateVitalSigns'(patientId, vitalSigns) {
    check(patientId, String);
    check(vitalSigns, {
      heartRate: Number,
      bloodPressure: String,
      temperature: Number,
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Patients.update(patientId, { $set: { vitalSigns } });
  },
});