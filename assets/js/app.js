"use strict";

// MarbleMachine
var mm = new MarbleMachine('5');
console.log('Number of sequences: ', mm.sequences.length);

mm.sequences.forEach(function(item) {
    console.log(item);
});

mm.renderToDOM('marbles');
