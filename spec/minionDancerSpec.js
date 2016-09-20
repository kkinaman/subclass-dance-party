describe('minionDancer', function(done) {

  var minionDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    // clock = sinon.useFakeTimers();
    minionDancer = new MinionDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(minionDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node move', function() {
    // sinon.spy(minionDancer, 'step');
    var leftStart = minionDancer.$node.css('left');
    var leftEnd;
    minionDancer.step();
    //In progress: setTimeout not working in mocha
    setTimeout(function() {
      leftEnd = minionDancer.$node.css('left');
      console.log(leftStart);
      console.log(leftEnd);
      expect(leftStart === leftEnd).to.be.false;
    }, 2000);
    
  });

});