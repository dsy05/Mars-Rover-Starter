const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382); //setting the parameter for Rover since it is only taking one argumnet the second two are set up defult values
    expect(rover.position).toBe(98382); // since its passed the parameter 98382, rover.position should equal it
    expect(rover.mode).toBe('NORMAL'); // default value 
    expect(rover.generatorWatts).toBe(110); // default value
  });

  // 8 tests here!
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; //alias
    let message = new Message('Test message with two commands', commands); // alias, commands array passed into commands
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message); // message alias passed into rover.recieveMessage
    expect(response.message).toBe(message.name); // response.message and message.name should be the passed 'Test message with two commands'
  });

  // 9 tests here!
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2); //'MODE_CHANGE' and 'STATUS_CHECK' are the two commands passed in so the length of results array should only be 2
  });

  // 10 tests here!
  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);    // Passes 87382098 as the rover's position. so the default value is changed to the passed in value
    let response = rover.receiveMessage(message); //just 'STATUS_CHECK' command is passed in from message
    expect(response.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 87382098}}]); // curent status is passed to results array
  });

  // 11 tests here!
  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(87382098);    // Passes 87382098 as the rover's position.
    let response = rover.receiveMessage(message); //'MODE_CHANGE' is the command, 'LOW_POWER' is to update the mode value
    expect(response.results).toEqual([{completed: true}]); // shoudl just return completed: true
  });

  // 12 tests here!
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 98382)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message); //checking to see if the 'MOVE' command can be executed 
    expect(response.results).toEqual([{completed: true}, {completed: false}]); //due to 'LOW_POWER', 'MOVE_COMMAND' return false
  });

  // 13 tests here!
  it("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', 98382)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(98382); //position value is assigned to Rover class, 
    expect(response.results).toEqual([{completed: true}]); //results array is true since no other values passed in and move command was able to be executed, 
  });
});
