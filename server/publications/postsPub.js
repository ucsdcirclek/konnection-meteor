Meteor.publish('posts', function (limit) {
  // http://stackoverflow.com/a/19165949
  var lim = limit || 2;
  return Posts.find({}, {limit: lim, sort: {createdAt: 1}});
});
