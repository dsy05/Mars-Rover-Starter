class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      }

      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'MODE_CHANGE') { //test 9 first checks for 'MODE_CHANGE', and pushes {completed: true} to the results array, 
            this.mode = message.commands[i].value; //the default mode is updated to the passed in mode value with 'MODE_CHANGE'
            response.results.push({completed: true});
         } else if (message.commands[i].commandType === 'STATUS_CHECK') { //test 9 next checks for 'STATUS_CHECK', and pushes values below to the results array, results array has 2 length of two now
            //test 10 just 'STATUS_CHECK' is passed, so just the below response is pushed to results array
            response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         } else if (message.commands[i].commandType === 'MOVE') { // checks if there is a 'MOVE' command
            if (this.mode !== 'LOW_POWER') { // tests 12 and 13 checks if the mode is set to 'LOW_POWER', gets updated with the 'MODE_CHANGE' command
               this.position = message.commands[i].value; //when the mode is not set to 'LOW_POWER', the updated position value is assigned and...
               response.results.push({completed: true}) // test 13 result is pushed true 
            } else {
               response.results.push({completed: false}) // test 12 when the mode is 'LOW_POWER', result ts pushed false
            }
         } else {
            response.results.push({completed: true})
         }
      }
      return response;
   }
}

module.exports = Rover;