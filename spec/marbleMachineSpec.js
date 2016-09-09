describe("MarbleMachine", function(){
    it("should attach MarbleMachine to the Global object", function() {
        expect(window.MarbleMachine).toBeDefined();
    });

    it("should accepts input of values 1 to 5", function() {
        expect(function(){
            new MarbleMachine(123);
        }).toThrow();
        expect(function(){
            new MarbleMachine(-3);
        }).toThrow();
        expect(function(){
            new MarbleMachine(3);
        }).not.toThrow();
    });

    it("should accept string or integer input", function() {
        expect(function(){
            new MarbleMachine(4);
        }).not.toThrow();
        expect(function(){
            new MarbleMachine('4');
        }).not.toThrow();
    });

    it("should accept empty input", function() {
        expect(function(){
            new MarbleMachine();
        }).not.toThrow();
    });

    it("should assign 1 as default input", function() {
        expect(new MarbleMachine().colours).toBe(1);
    });

    it("should return [blue] for input of 1", function() {
        expect(new MarbleMachine(1).sequences).toEqual(['blue']);
    })
});
