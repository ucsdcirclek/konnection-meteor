Posts = new Mongo.Collection('posts');

Posts.attachSchema(
  new SimpleSchema({
    title: {
      type: String
    },
    body: {
      type: String
    },
    createdBy: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      autoValue: function() { if(this.isInsert) return this.userId }
    },
    createdAt: {
      type: Date,
      autoValue: function() { if(this.isInsert) return new Date() },
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Posts.allow({
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
