describe("MarbleMachine", function(){
    it("attaches MarbleMachine to the Global object", function() {
        expect(window.MarbleMachine).toBeDefined();
    });

    it("accepts input of values 1 to 5", function() {
        expect(function(){
            new MarbleMachine('123');
        }).toThrow();
        expect(function(){
            new MarbleMachine('0');
        }).toThrow();
        expect(function(){
            new MarbleMachine(-3);
        }).toThrow();
        expect(function(){
            new MarbleMachine(3);
        }).not.toThrow();
    });
});
