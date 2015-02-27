Template.registerHelper('debug', function (optionalValue) {
  if (typeof console !== "undefined" || typeof console.log !== "undefined") {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }

    return '';
  }

  // For IE8
  alert(this);

  if (optionalValue) {
    alert(optionalValue);
  }

  return '';
});

Template.registerHelper('constant', function (what) {
  return Meteor.App[what.toUpperCase()];
});

// http://stackoverflow.com/a/22088138
Template.registerHelper('formatDate', function(date, format) {
  if(arguments.length <= 1)
    return moment(date).format('MMMM Do YYYY');
  else
    return moment(date).format(format);
});

Template.registerHelper('displayDay', function(daysAway) {
  if(arguments.length == 0)
    return moment().format('dddd');
  else
    return moment().add(daysAway, 'd').format('dddd');
});
