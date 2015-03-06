Router.route('/events', function () {
  this.render('calendar');
});

Router.route('/events/:_id', function () {
  var event = Events.findOne({_id: this.params_id});
  this.render('event', {data: event});
});