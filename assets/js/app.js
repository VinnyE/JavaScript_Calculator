var displayResult = document.getElementById('display-result');

var data = {
  valuesInMemory: [],
  result: 0
};

var view = {
  buttonContainer: document.getElementsByClassName('button-container')[0],

  screenNumberDisplay: document.getElementById('screen-number-display')

};

var controls = {

  checkForOperators: function(e, current, screenNumberDisplay) {
    if (e.target.textContent === 'CE') {
      screenNumberDisplay.textContent = 0;
      return true;
    } else if (e.target.textContent === 'AC') {
        screenNumberDisplay.textContent = 0;
        data.valuesInMemory = [];
      return true;
    } else if (e.target.textContent === '=') {
        data.valuesInMemory.push(current);
        var valuesInMemoryExpression = data.valuesInMemory.join('');
        screenNumberDisplay.textContent = eval(valuesInMemoryExpression);
        data.valuesInMemory = [];
        view.screenNumberDisplay.classList.add('calculated');
      return true;
    } else if (e.target.textContent === '+') {
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('+');
        screenNumberDisplay.textContent = '+';
      return true;
    } else if (e.target.textContent === '-') {
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('-');
        screenNumberDisplay.textContent = '-';
      return true;
    } else if (e.target.textContent === 'x') {
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('*');
        screenNumberDisplay.textContent = 'x';
      return true;
    } else if (e.target.textContent === '÷') {
        data.valuesInMemory.push(current);
        data.valuesInMemory.push('/');
        screenNumberDisplay.textContent = '÷';
      return true;
    } else {
        return false;
    }
},

  checkFirstChar: function(screenNumberDisplay) {
    if (screenNumberDisplay.textContent.startsWith('0') ||
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

      if (screenNumberDisplay.classList.contains('calculated')) {
        if (self.checkForOperators(e, current, screenNumberDisplay)) {
          screenNumberDisplay.classList.remove('calculated');
        } else {
        screenNumberDisplay.textContent = e.target.textContent;
        screenNumberDisplay.classList.remove('calculated');
        }
        return;
     }

      // Check if pressed button is an operator
      if (self.checkForOperators(e, current, screenNumberDisplay)) {
        return;
      }

      if (screenNumberDisplay.textContent.length > 9) {
        screenNumberDisplay.textContent = 'Limit Exceeded!';
      } else {
          if (self.checkFirstChar(screenNumberDisplay)) {
            screenNumberDisplay.textContent = e.target.textContent;
            current = screenNumberDisplay.textContent;
         } else {
            screenNumberDisplay.textContent += e.target.textContent;
            current = screenNumberDisplay.textContent;
         }
      }
    });
  }

};
controls.buttonListener();
