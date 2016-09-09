"use strict";

var mm = new MarbleMachine('3');

var all = mm.sequences;
console.log(all.length);
all.forEach(function(item) {
    console.log(item);
});

mm.renderToDOM('marbles');
