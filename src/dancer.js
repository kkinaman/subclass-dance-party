// Creates and returns a new dancer object that can step

var Dancer = function(top, left, timeBetweenSteps) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  // debugger;
  this.timeBetweenSteps = timeBetweenSteps;

  // debugger;
  this.step(timeBetweenSteps);
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);
  this.lineUpPos = 800;
};


Dancer.prototype.step = function() {
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
  var dancer = this;
  var time = arguments[0];
  setTimeout(function() {
    dancer.step.call(dancer);
  }, time);

};

Dancer.prototype.setPosition = function(top, left) {
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function() {
  var left = $('body').width() * Math.random();
  this.setPosition(this.lineUpPos, left);
};

Dancer.prototype.getTop = function () {
  return parseInt(this.$node.css('top'));
};

Dancer.prototype.getLeft = function () {
  return parseInt(this.$node.css('left'));
};

Dancer.prototype.distance = function(otherDancer) {
  var x1 = this.getLeft();
  var y1 = this.getTop();

  var x2 = otherDancer.getLeft();
  var y2 = otherDancer.getTop();

  return Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2));
};

