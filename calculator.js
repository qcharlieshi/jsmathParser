// Based on http://en.wikipedia.org/wiki/Recursive_descent_parser
// var calc = new Calculator("1+2*(3+4)");
// calc.run() //=> 15


function Calculator(expression) {
  this.expressionToParse = expression.replace(/\s+/g, '').split('');
};

Calculator.prototype.run = function () {
  return this.expression();
};

Calculator.prototype.peek = function () {
  return this.expressionToParse[0] || '';
};

Calculator.prototype.get = function () {
  return this.expressionToParse.shift();
};

/*
  Grammar Rule:
  number = [0-9] {[0-9.]+}
  Hint: remember this means we need to get the first number
    followed by any number of numbers (or the period .)
 */
Calculator.prototype.number = function () {

};

/*
 Grammar Rule:
  factor = number
          | "(" expression ")"
          | - factor
  Hints:
    - If we see a number, produce a number 
    - If we see a (  then consume it and an expression
    - If we see a "-", return the negative of the factor
 */
Calculator.prototype.factor = function () {

};

/*
  term = factor {(*|/) factor}
 */
Calculator.prototype.term = function () {

};


/* Grammar Rules
    expression = term {(+|-) term}
*/
Calculator.prototype.expression = function () {
  var result = this.term();
  while (this.peek() == '+' || this.peek() == '-') {
    if (this.get() == '+') {
      result += this.term();
    } else {
      result -= this.term();
    }
  }
  return result;
};
