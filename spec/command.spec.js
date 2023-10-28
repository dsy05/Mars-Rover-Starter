const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  //Test 1
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.')); //error is thrown since no argumnet is passed into the Command class
  });

  //Test 2
  it("constructor sets command type", function() {
    let roverCommandType = new Command('MODE_CHANGE'); //passing in one argument into the Command class, since only 1 it's passed to command type
    expect(roverCommandType.commandType).toBe('MODE_CHANGE'); //since commandtype was passes 'MODE_CHANGE' it should equal 'MODE_CHANGE'
  });

  //Test 3
  it("constructor sets a value passed in as the 2nd argument", function() {
    let roverMode = new Command('MODE_CHANGE', 'LOW_POWER'); //passing in two argumnets, 'MODE_CHANGE' goes to commandType and 'LOW_POWER' passed to value
    expect(roverMode.value).toBe('LOW_POWER'); //since value was passes 'LOW_POWER' it should equal 'LOW_POWER'
  });
  
});