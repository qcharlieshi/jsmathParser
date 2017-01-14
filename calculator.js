// Based on http://en.wikipedia.org/wiki/Recursive_descent_parser
// var calc = new Calculator("1+2*(3+4)");
// calc.run() //=> 15


function Calculator(expression) {
  this.expressionToParse = expression.replace(/\s+/g, '').split('');
};
//this.expressionToParse = array of tokens

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
  let result;
	debugger
  while ((typeof this.peek() === 'number') || (this.peek() === '.')) {
		console.log('in');
    result += this.get();
  }

  return result;
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
  let result = this.number(); //result is nothing if the first term of expressionToParse is not a number

  while (this.peek() === '(' || this.peek() === '-')   {
    if (this.get() === '(') {
        this.expression();
    }

    if (this.get() === '-') {
      result -= (result * 2) //this.get();
      return result;
			//this.factor();
    }
  }

  return result;
};

/*
  term = factor {(*|/) factor}
 */
Calculator.prototype.term = function () {
	let result = this.factor();

	while(this.peek() === '*' || this.peek() === '/') {
		if(this.get() === '*') {
			result *= this.factor();
		} else {
			result /= this.factor();
		}
	}

	return result;
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


//var calc = new Calculator("1+2*(3+4)");
var calc = new Calculator("111");
console.log(calc.run()) //=> 15
console.log(calc.number());