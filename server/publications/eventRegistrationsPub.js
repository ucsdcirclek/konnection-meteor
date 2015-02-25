Meteor.publish('eventRegistrations', function () {
  return EventRegistrations.find();
});
