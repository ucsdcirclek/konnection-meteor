Meteor.subscribe('eventRegistrations');

Template['event'].helpers({
  upcomingWeekEvents: function() {
    var events = Events.find({
      startTime: {
        $gte: moment().endOf('day'),
        $lt: moment().add(7, 'd').endOf('day')
      }
    }, {sort: {createdAt: 1}})
      .fetch();

    // Group events by start time
    var grouped = _.groupBy(events, function(item) {
      return new moment(item.startTime).hours(0).minutes(0).seconds(0).milliseconds(0);
    });

    // Array of results
    var results = [];

    // Sort by date difference
    var comp = function(a, b) {
      return new moment(a) - new moment(b);
    };

    // Sort date keys and create new array of days
    Object.keys(grouped)
      .sort(comp)
      .forEach(function(v, i) {
        var day = {
          date: v,
          events: grouped[v]
        };
        results.push(day);
      });

    return results;
  },
  // Allow user to register if registration is open
  open: function() {
    if(!UI.getData()) return false;

    var data = UI.getData(); // Easier to access data var
    var current = moment(); // Current date/time
    var closeTime = 'closeTime' in data ? data.closeTime : data.endTime; // Just in case close time was not set

    return current > data.openTime && current < closeTime;
  },
  registrations: function() {
    if(!UI.getData()) return null;

    var eventId = new Meteor.Collection.ObjectID(UI.getData()._id._str);

    return EventRegistrations.find({event: eventId});
  },
  regUser: function() {
    return Meteor.users.findOne(this.user);
  },
  name: function() {
    return this.firstName + " " + this.lastName;
  },
  registered: function() {
    if(!UI.getData() || Meteor.user()) return null;

    return EventRegistrations.findOne({event: UI.getData()._id, user: Meteor.userId()});
  }
  // TODO: write roles function
  // TODO: write isAuthorized function
});

Template['event'].events({});
