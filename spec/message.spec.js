const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

  //Test 4
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect( function() { new Message();}).toThrow(new Error('Name required.')); //error is thrown since no argumnet is passed into the Message class constructor
  });
  
  //Test 5
  it("constructor sets name", function() {
    let message = new Message('Test message with two commands'); // assigning alias, passing in 'Test message with two commands' to the constructor (name)
    expect(message.name).toBe('Test message with two commands'); // expect the message.name to be the message we passed in
  });

  //test 6
  it("contains a commands array passed into the constructor as the 2nd argument", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; //assigning alias for command passing in an array
    let message = new Message('Test message with two commands', commands); // assigning alias for message
    expect(message.commands).toBe(commands) //Message class constructor is passed in the message alias, name is assigned 'Test message with two commands', and message.commands is passed the array
  });

});
