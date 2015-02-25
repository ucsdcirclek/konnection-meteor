EventRegistrations = new Mongo.Collection('events.registrations');

EventRegistrations.attachSchema(
  new SimpleSchema({
    user: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    event: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    roles: {
      type: [String],
      allowValues: ['driver', 'photographer', 'writer'],
      maxCount: 3,
      optional: true
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  EventRegistrations.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}
