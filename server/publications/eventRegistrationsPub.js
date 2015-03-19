Meteor.publishComposite('eventRegistrations', {
  find: function() {
    return EventRegistrations.find();
  },
  children: [
    {
      find: function(registration) {
        return Meteor.users.find(
          {_id: registration.user},
          {limit: 1, fields: {profile: 1}}
        );
      }
    }
  ]
});
