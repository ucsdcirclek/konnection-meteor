Events = new Mongo.Collection('events');

Events.attachSchema(
  new SimpleSchema({
    title: {
      type: String
    },
    description: {
      type: String,
      optional: true
    },
    eventLocation: {
      type: String,
      optional: true
    },
    meetingLocation: {
      type: String,
      optional: true
    },
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    },
    openTime: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          var openTime = this.field('openTime');

          if (!openTime.isSet)
            return new Date();
        }
      }
    },
    closeTime: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          var closeTime = this.field('closeTime');

          if (!closeTime.isSet)
            return this.field('endTime');
        }
      }
    },
    createdBy: {
      type: String,
      autoValue: function() { if(this.isInsert) return Meteor.userId }
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
  Events.allow({
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
