var GrowingDancer = function(top, left, timeBetweenSteps) {
  // debugger;
  Dancer.call(this, top, left, timeBetweenSteps);
  this.growing = true;
  this.timeBetweenSteps = 500;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  // this.oldStep = ;
};

GrowingDancer.prototype = Object.create(Dancer.prototype);
GrowingDancer.prototype.constructor = GrowingDancer; 

GrowingDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this, this.timeBetweenSteps);
};

GrowingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  var dancer = this;
  console.log(dancer.$node.css('height'));
  // console.log(dancer.$node.css('height'));
  if (parseInt(dancer.$node.css('height')) >= 150) {
    dancer.growing = false;
  } else if (parseInt(dancer.$node.css('height')) <= 50) {
    dancer.growing = true;
  }
  if (dancer.growing) {
    dancer.$node.animate({
      height: '+=30px',
      width: '+=30px'
    }, this.timeBetweenSteps / 2, function() {
    }); 
  } else {
    dancer.$node.animate({
      height: '-=30px',
      width: '-=30px'
    }, this.timeBetweenSteps / 2, function() {
      
    });
    
  }
};
