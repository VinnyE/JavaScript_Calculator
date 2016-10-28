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

var buttonListener = document.getElementsByClassName('button-container')[0];
var screenShow = document.getElementById('screen');

buttonListener.addEventListener('click', function(e) {
  var target = e.target.textContent;
  screenShow.textContent += target;
});


function displayNumbers(e) {
  var target = e.target;
  console.log(target);
}
