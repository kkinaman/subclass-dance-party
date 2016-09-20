$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
     // debugger;
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );

    if ($(this).hasClass('minionButton')) {
      dancer.$node.addClass('minion');
    }

    if ($(this).hasClass('blinkyButton')) {
      dancer.$node.addClass('blinky');
    }

    if ($(this).hasClass('growingButton')) {
      dancer.$node.addClass('growing');
    }

    window.dancers.push(dancer);

    $('body').append(dancer.$node);
  });

  $('.lineUpButton').on('click', function(event) {
    window.dancers.forEach(function(dancer) {
      dancer.lineUp();
    });
  });

  $('.pairUpButton').on('click', function(event) {
    
    //Make new array of dancers by mapping dancers array --> [[dancer, false], [dancer, false], ...]
    var dancers = window.dancers.map(function(dancer) {
      return [dancer, false];
    });
    //For each dancer
    for (var i = 0; i < dancers.length; i++) {
      var curDancer = dancers[i];
      //If not already paired
      if (!curDancer[1]) {
      /** Find closest pair **/
        // Store coords
        var top = curDancer[0].getTop(); 
        var left = curDancer[0].getLeft();
        // Store minDistance as infinity
        var minDistance = Infinity;
        // Make closestDancer variable
        var closestDancer = null;
        var closestIndex;
        // For each dancer
        for (var j = 0; j < dancers.length; j++) {
          var comparisonDancer = dancers[j];
          // If not itself
          if (i !== j && !comparisonDancer[1]) {
            // Calculate distance away from curDancer
            var thisDistance = curDancer[0].distance(comparisonDancer[0]);
            // If thisDistance is less than minDistance
            if (thisDistance < minDistance) {
              // Update minDistance
              minDistance = thisDistance;
              // Store as closestDancer
              closestDancer = comparisonDancer;
              // Store its index
              closestIndex = j;
            }
          }
        }
        if (closestDancer !== null) {
          // Set coords of closestDancer to somewhere near curDancer
          closestDancer[0].setPosition(top, left + 20);
          // Set paired to true for curDancer and closestDancer
          closestDancer[1] = true;
        }
        curDancer[1] = true;
      }
    }
  });

  $(document).on('mouseover', '.dancer', function() {
    $(this).effect('bounce');
  });

});

