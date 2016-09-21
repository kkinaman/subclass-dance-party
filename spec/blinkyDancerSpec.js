describe('blinkyDancer', function() {

  var blinkyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node blink', function() {
    sinon.spy(blinkyDancer.$node, 'toggle');
    blinkyDancer.step();
    expect(blinkyDancer.$node.toggle.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(blinkyDancer, 'step');
      expect(blinkyDancer.step.callCount).to.be.equal(0);
      // clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });


  });

  describe('line up', function() {
    it('should line up dancer to pre-defined y cordinate when lineup button is clicked', function() {
      blinkyDancer.lineUp();
      expect(blinkyDancer.getTop()).to.be.equal(blinkyDancer.lineUpPos);
    });
  });

  describe('pair up', function() {
    it('should have same y cordinates after pair button clicked', function() {
      var blinky1 = new BlinkyDancer(100, 10, timeBetweenSteps);
      var blinky2 = new BlinkyDancer(10, 40, timeBetweenSteps);
      $('.body').append('<div class="pairUpButton"></div>');
      $('.pairUpButton').trigger('click');
      expect(blinky1.getTop()).to.be.equal(blinky2.getTop());
    });
  });

});
