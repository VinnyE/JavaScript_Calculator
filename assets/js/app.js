var displayResult = document.getElementById('display-result');

var data = {
  total: []

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
        data.total = [];
      return true;
    } else if (e.target.textContent === '+') {
        data.total.push(current);
        data.total.push('+');
        screenNumberDisplay.textContent = '+';
      return true;
    } else if (e.target.textContent === '-') {
        data.total.push(current);
        data.total.push('-');
        screenNumberDisplay.textContent = '-';
      return true;
    } else if (e.target.textContent === 'x') {
        data.total.push(current);
        data.total.push('*');
        screenNumberDisplay.textContent = 'x';
      return true;
    } else if (e.target.textContent === '÷') {
        data.total.push(current);
        data.total.push('/');
        screenNumberDisplay.textContent = '÷';
      return true;
    } else {
        return false;
    }
  },

  buttonListener: function() {
    var screenNumberDisplay = view.screenNumberDisplay;
    var self = this;

    view.buttonContainer.addEventListener('click', function(e) {
      var current = screenNumberDisplay.textContent;

      // Check if pressed button is an operator
      if(self.checkForOperators(e, current, screenNumberDisplay)) {
        return;
      }

      if (screenNumberDisplay.textContent.length > 9) {
        screenNumberDisplay.textContent = 'Limit Exceeded!';
      } else {
          if (screenNumberDisplay.textContent.startsWith('0') || screenNumberDisplay.textContent.startsWith('+') || screenNumberDisplay.textContent.startsWith('-') || screenNumberDisplay.textContent.startsWith('x') ||
          screenNumberDisplay.textContent.startsWith('÷') ) {
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
