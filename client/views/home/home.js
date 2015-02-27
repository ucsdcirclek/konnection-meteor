Meteor.subscribe('posts');
Meteor.subscribe('events');

Template.home.helpers({
  posts: function() {
    return Posts.find();
  },
  events: function(day) {
    if(arguments.length == 0)
      return Events.find({ startTime: { $gte: moment().startOf('day'), $lt: moment().endOf('day') }});
    else
      return Events.find({ startTime: { $gte: moment().add(day, 'd').endOf('day'), $lt: moment().add(day, 'd').endOf('day') }});
  }
});

Template.home.events({
});


Template.home.rendered = function () {
};
