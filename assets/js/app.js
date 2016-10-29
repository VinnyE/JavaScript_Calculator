// Values in memory just stores all of the user values they wish to calculate.
var data = {

  valuesInMemory: [],

};

// DOM queries.
var view = {

  buttonContainer: document.getElementsByClassName('button-container')[0],

  screenNumberDisplay: document.getElementById('screen-number-display')

};

var controls = {

  // Function that checks if pressed key is an operator
  // First three conditions ('CE', 'AC', '='), all have specialized functions.
  // Rest of the conditions:
    // Push current value that's on screen into array.
    // Push the operator into array.
    // Display the operator on screen.
  checkForOperators: function(e, current, screenNumberDisplay) {

    // Ignore input if operator was pressed twice.
    // console.log(current);
    if (e.target.textContent === data.valuesInMemory[data.valuesInMemory.length-1]) {
      return true;
    }

    // Check if first attempted input is an operator or not.
    function operatorPrecedesCalculation() {
      if (data.valuesInMemory.length === 0 && current === '0') {
        return true;
      }
    }

    if (e.target.textContent === 'CE') {
      screenNumberDisplay.textContent = 0;
      return true;
    } else if (e.target.textContent === 'AC') {
        screenNumberDisplay.textContent = 0;
        data.valuesInMemory = [];
      return true;
    } else if (e.target.textContent === '=') {
        data.valuesInMemory.push(current);
        // Convert the array holding all of the values to a string.
        var valuesInMemoryExpression = data.valuesInMemory.join('');
        // Evaluate the expression and display the result on screen.
        screenNumberDisplay.textContent = eval(valuesInMemoryExpression);
        // Reset values in memory.
        data.valuesInMemory = [];
        // Use this class to check if a value was calculated.
        // If calculated:
          // The next button press (number or operator) must wipe the screen.
          // Checked in the first condition in the buttonListener function.
        if (screenNumberDisplay.classList.contains('calculated')) {
          return true;
        } else {
          screenNumberDisplay.classList.add('calculated');
        }

      return true;
    } else if (e.target.textContent === '+') {
        if (operatorPrecedesCalculation()) {
          return true;
        }
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('+');
        screenNumberDisplay.textContent = '+';
        return true;
    } else if (e.target.textContent === '-') {
      if (operatorPrecedesCalculation()) {
        return true;
      }
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('-');
        screenNumberDisplay.textContent = '-';
        return true;
    } else if (e.target.textContent === 'x') {
      if (operatorPrecedesCalculation()) {
        return true;
      }
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('*');
        screenNumberDisplay.textContent = 'x';
        return true;
    } else if (e.target.textContent === '÷') {
      if (operatorPrecedesCalculation()) {
        return true;
      }
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('/');
        screenNumberDisplay.textContent = '÷';
        return true;
    } else {
        return false;
    }
},
  // Check the first character on calculator screen.
    // If it's ONLY 0 (meaning no decimal) OR (+,-,x,/) next input will set screen.
  checkFirstChar: function(screenNumberDisplay) {
    if ((screenNumberDisplay.textContent.startsWith('0') && screenNumberDisplay.textContent.length === 1) ||
        screenNumberDisplay.textContent.startsWith('+') ||
        screenNumberDisplay.textContent.startsWith('-') ||
        screenNumberDisplay.textContent.startsWith('x') ||
        screenNumberDisplay.textContent.startsWith('÷')) {
          return true;
    }

  },

  buttonListener: function() {
    var screenNumberDisplay = view.screenNumberDisplay;
    var self = this;

    view.buttonContainer.addEventListener('click', function(e) {
      var current = screenNumberDisplay.textContent;

      if (data.valuesInMemory.length === 0 && current === '0') {
        if (e.target.textContent === '.') {
          screenNumberDisplay.textContent = '0.';
          return;
        }
      }

      // Check if pressed button is an operator.
      if (self.checkForOperators(e, current, screenNumberDisplay)) {
          return;
        }

      // console.log(current);
      // This conditional will first check if value on screen was a result.
      // If it's a result, and next value is an operator:
        // follow normal conditionals for operators above
        // remove calculated class, as next value starts a new computation.
      // If it is a result, but NOT an operator:
        // Set the text on screen to the number
        // remove calculated class, as next value starts a new computation.
      if (screenNumberDisplay.classList.contains('calculated')) {
        if (self.checkForOperators(e, current, screenNumberDisplay)) {
          screenNumberDisplay.classList.remove('calculated');
        } else {
        screenNumberDisplay.textContent = e.target.textContent;
        screenNumberDisplay.classList.remove('calculated');
        }
        return;
     }

      // Setting a maximum character length.
      if (screenNumberDisplay.textContent.length > 9) {
        screenNumberDisplay.textContent = 'Limit Exceeded!';
      } else {
          // If leading character is an operator or 0, remove and set number.
          if (self.checkFirstChar(screenNumberDisplay)) {
            screenNumberDisplay.textContent = e.target.textContent;
         } else {
            screenNumberDisplay.textContent += e.target.textContent;
         }
      }
    });
  }

};

// Event listener activation.
controls.buttonListener();
