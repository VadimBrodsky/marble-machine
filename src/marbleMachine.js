/*
    Marble Machine

    This machine takes as input one single argument, an integer from 1 to 5, that determines the set of colours available for making a marble sequence. Outputs all of the possible marble sequences that this machine could possibly generate.

    Input:
    ======
    Your program must prompt the user for the number of colours, 1 to 5. The colours available to the machine for each input selection are as follows:

    1 = [blue]
    2 = [blue, green]
    3 = [blue, green, red]
    4 = [blue, green, red, yellow]
    5 = [blue, green, red, yellow, orange]

    Constraints:
    ============
    1. The machine is allowed to use any colour only once per sequence, or not at all.
    2. A marble can be made of only one colour.
    3. The machine must generate at least one marble per sequence.
    4. Your program should be written in JavaScript without the use of any JavaScript framework library (i.e. jQuery, Dojo, Backbone.js, Angular.js, Raphael, etc. cannot be used)
    5. The program should run in a browser by placing the source in a file system directory and opening the main html page in the browser.

    Output:
    =======
    Your program should generate the list of all possible marble sequences that could be generated for the given input selection from 1 to 5. Each sequence must be output one per line with no line wrapping. A marble is to be represented by a circle of that colour. Each marble must be reasonably separated from its neighbours.

 */

(function (global) {
    "use strict";

    // Constructor function
    var MarbleMachine = function(numberOfColours) {
        var input = numberOfColours || 1;

        if (this.validate(input)) {
            this.colours = +input;
            this.colourNames = this.getColourNames();

            // Get all sequences, sort to match example output
            // Can be broken out to offset performance penalty of object initialization
            this.sequences = privateMethods.allSequences(this.colourNames);
            this.sequences.sort(privateMethods.sortByArrayLength);
        }
    };

    // Map of input to marble colours
    var marbles = {
        '1': ['blue'],
        '2': ['blue', 'green'],
        '3': ['blue', 'green', 'red'],
        '4': ['blue', 'green', 'red', 'yellow'],
        '5': ['blue', 'green', 'red', 'yellow', 'orange']
    };

    var privateMethods = {
        // Main algorithm
        allSequences: function(inputMarbles) {
            if(inputMarbles.length < 2) {
                return inputMarbles;
            } else {
                return this.processPartial(inputMarbles);
            }
        },

        // Like splice but non-mutating
        removeElementFromArray: function(index, arr) {
            var head = arr.slice(0, index),
                tail = arr.slice(index + 1, arr.length);

            return head.concat(tail);
        },

        // Split the input sequence and add the rest to it
        processPartial: function(inputMarbles) {
            var self = this;
            var sequences = [];

            inputMarbles.forEach(function(marble, index) {
                // Add the initial marble to the sequence
                sequences.push([marble]);

                var otherSequence = self.removeElementFromArray(index, inputMarbles);

                // Call the main algorithm recursively
                var otherSequenceArray = self.allSequences(otherSequence);

                // Assemble the sequences
                otherSequenceArray.forEach(function(subSequence) {
                    sequences.push([marble].concat(subSequence));
                });
            });
            return sequences;
        },

        // Utility function, to sort arrays by their length
        // From short to long
        sortByArrayLength: function(a, b) {
            return a.length - b.length;
        }
    };


    // MarbleMachine methods
    MarbleMachine.prototype = {

        // Validates the input for the constructor function
        validate: function(input) {
            if (marbles[+input] === undefined) {
                throw 'Invalid input for MarbleMachine, input must be 1-5';
            } else {
                return true;
            }
        },

        // Return the array of colour names
        getColourNames: function(){
            return marbles[this.colours];
        },

        // Render marbles to HTML
        renderToDOM: function(id) {
            var container = document.getElementById(id);

            this.sequences.forEach(function(seq){
                var row = document.createElement('div');
                row.className = 'row';

                seq.forEach(function(colour) {
                    var marble = document.createElement('div');
                    marble.className = 'marble__' + colour;
                    row.appendChild(marble);
                });

                container.appendChild(row);
            });

        }

    };


    // attach the MarbleMachine to the global object
    global.MarbleMachine = MarbleMachine;
}(window));
