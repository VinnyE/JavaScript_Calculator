var displayResult = document.getElementById('display-result');

var calculator = {
  add: function(a, b) {
    var result = a + b;
    displayResult.textContent = result;
  },

  subtract: function(a, b) {
    var result = a - b;
    displayResult.textContent = result;
  },

  multiply: function(a, b) {
    var result = a * b;
    displayResult.textContent = result;
  },

  divide: function(a, b) {
    var result = a / b;
    displayResult.textContent = result;
  },

  clear: function() {
    displayResult.textContent = 0;
  }

};

var num = [1, '+', 3, '-', 2, '*', 1];
