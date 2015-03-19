Meteor.subscribe('events');
Meteor.subscribe('eventRegistrations');

Router.route('/events', function() {
  this.render('calendar');
});

Router.route('/events/:_id', function() {
  this.render('event', {
    data: function() {
      return Events.findOne(new Meteor.Collection.ObjectID(this.params._id));
    }
  });
});