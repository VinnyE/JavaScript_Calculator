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
    var targetValue = e.target.textContent;

    if (targetValue === 'x') {
      targetValue = '*';
    } else if (targetValue === '÷') {
      targetValue = '/';
    }
    // Ignore input if operator was pressed twice.
    if (targetValue === data.valuesInMemory[data.valuesInMemory.length-1] &&
        current === data.valuesInMemory[data.valuesInMemory.length-1]) {
      return true;
    }

    // Check if first attempted input is an operator or not.
    function operatorPrecedesCalculation() {
      if (data.valuesInMemory.length === 0 && current === '0') {
        return true;
      }
    }

    switch (targetValue) {
      case 'CE':
        screenNumberDisplay.textContent = 0;
        return true;
      case 'AC':
        screenNumberDisplay.textContent = 0;
        data.valuesInMemory = [];
        return true;
      case '=':
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
        case '+':
        if (operatorPrecedesCalculation()) {
          return true;
        }
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('+');
        screenNumberDisplay.textContent = '+';
        return true;
        case '-':
          if (operatorPrecedesCalculation()) {
            return true;
        }
          data.valuesInMemory.push(current);
          data.valuesInMemory.push('-');
          screenNumberDisplay.textContent = '-';
          return true;
        case '*':
          if (operatorPrecedesCalculation()) {
            return true;
        }
          data.valuesInMemory.push(current);
          data.valuesInMemory.push('*');
          screenNumberDisplay.textContent = 'x';
          return true;
        case '/':
          if (operatorPrecedesCalculation()) {
            return true;
        }
          data.valuesInMemory.push(current);
          data.valuesInMemory.push('/');
          screenNumberDisplay.textContent = '÷';
          return true;
        default:
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
  // listen for input
  buttonListener: function() {
    // Reference to span element (screen).
    var screenNumberDisplay = view.screenNumberDisplay;
    var self = this;

    view.buttonContainer.addEventListener('click', function(e) {
      // Set text content of span element to current.
      var current = screenNumberDisplay.textContent;
      var targetValue = e.target.textContent;

      // Swap operators to actual JS recognized operators.
      if (current === 'x') {
        current = '*';
      } else if (current === '÷') {
        current = '/';
      }

      // 1. If the only current value is 0, and input is '.'
        // Allow decimal to be placed next to 0, rather than clear screen.
      // 2. If the only current value is '0.'
        // Assume user wants to begin a decimal calculation
        // Do not allow invalid syntax (ex. 0.., 0.+, 0.x, etc);
        // If input is a # (valid syntax), add it to the screen.
      if (data.valuesInMemory.length === 0 && current === '0') {
        if (targetValue === '.') {
          screenNumberDisplay.textContent = '0.';
          return;
        }
      } else if(current === '0.') {
          if (targetValue === '.') {
            return;
        } else if (targetValue === '+' ||
                  targetValue === '-' ||
                  targetValue === 'x' ||
                  targetValue === '÷') {
            return;
        } else {
            screenNumberDisplay.textContent += targetValue;
            return;
        }
      }

      // Check if pressed button is an operator.
      if (self.checkForOperators(e, current, screenNumberDisplay)) {
          return;
        }

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
        } else if (current[0] === '0' && current[1] === '.') {
            screenNumberDisplay.textContent += targetValue;
            screenNumberDisplay.classList.remove('calculated');
        } else {
            screenNumberDisplay.textContent = targetValue;
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
            screenNumberDisplay.textContent = targetValue;
         } else {
            screenNumberDisplay.textContent += targetValue;
         }
      }
    });
  }

};

// Event listener activation.
controls.buttonListener();
