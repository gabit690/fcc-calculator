import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './Calculator.css';

import CalculatorScreen from '../CalculatorScreen/CalculatorScreen';
import CalculatorPad from '../CalculatorPad/CalculatorPad';

Number.prototype.getPrecision = function() {
  var s = this + "",
      d = s.indexOf('.') + 1;

  return !d ? 0 : s.length - d;
};

class Calculator extends Component {

  constructor() {
    super();
    this.state = {
      on: true,
      resultExpression: "",
      currentIntput: "0"
    };
    this.handlePressedKey = this.handlePressedKey.bind(this);
  }

  handlePressedKey(event) {
    
    const buttonKey = event.target.innerText;

    switch (buttonKey) {
      case "C":
        this.cleanScreen();
        break;
      case "P":
        this.switchPower();
        break;
      case "=":
        this.makeOperation("=");
        break;
      default:
        this.enterKey(buttonKey);
        break;
    }

  }

  switchPower() {
    if (this.state.on) {
      this.setState({on: false, resultExpression: "", currentIntput: ""});
    } else {
      this.setState({on: true, currentIntput: "0"});
    }
  }

  cleanScreen() {
    this.setState({resultExpression: "", currentIntput: "0"});
  }

  enterKey(key) {

      switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          this.inputNumber(key);
          break;
        case ".":
        case "/":
        case "X":
        case "-":
        case "+":
          this.inputOperator(key);
          break;
      }


  }

  inputNumber(number) {

    if (this.state.currentIntput.length <= 15) {
      if (/=|^\-?0$/.test(this.state.resultExpression) || 
          this.state.resultExpression == "" || 
          /zero/.test(this.state.currentIntput)) {
        this.setState({
          resultExpression: number, 
          currentIntput: number
        });
      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] $/.test(this.state.resultExpression)) {
        this.setState({
          resultExpression: this.state.resultExpression + number, 
          currentIntput: number
        });
      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?0$/.test(this.state.resultExpression)) {
        this.setState({
          resultExpression: this.state.resultExpression.replace(/(\-)?.$/, number), 
          currentIntput: number
        });
      } else if (/^\-|\.|^[1-9]+/.test(this.state.currentIntput)) {
        this.setState({
          resultExpression: this.state.resultExpression + number, 
          currentIntput: this.state.currentIntput + number
        });
      }
    }



  }

  inputOperator(operator) {

    switch (operator) {
      case ".":
        this.enterDecimal();
        break;
      default:
        this.enterArithmeticOperator(operator);
        break;
    }

  }

  enterDecimal() {

    if (this.state.currentIntput.length <= 14) {
      if (/=/.test(this.state.resultExpression) || 
          this.state.resultExpression == "" || 
          /zero/.test(this.state.currentIntput)) {
        this.setState({
          resultExpression: "0.", 
          currentIntput: "0."
        });
      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] $/.test(this.state.resultExpression)) {
        this.setState({
          resultExpression: this.state.resultExpression + "0.", 
          currentIntput: "0."
        });
      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-$/.test(this.state.resultExpression)) {
        this.setState({
          resultExpression: this.state.resultExpression + "0.", 
          currentIntput: this.state.currentIntput + "0."
        });
      } else if (!/\./.test(this.state.currentIntput)) {
        this.setState({
          resultExpression: this.state.resultExpression + ".", 
          currentIntput: this.state.currentIntput + "."
        });
      }
    }


  }

  makeOperation(pressedOperator) {
    if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?\d+(\.?\d+)?$/.test(this.state.resultExpression)) {

      const operand1 = Number(this.state.resultExpression.match(/^(\-)?\d+(\.\d+)?/)[0]);
      const expressionOperator = this.state.resultExpression.match(/ [\/x\-\+] /)[0].trim();;
      const operand2 = Number(this.state.resultExpression.match(/(\-)?\d+(\.\d+)?$/)[0]);
      let newResultExpression = "";
      let newCurrentInput = "";
      
      if (/=/.test(pressedOperator)) {

        let resultOperation = "";

        switch (expressionOperator) {
          case "/":
            resultOperation = (operand2 == 0) ? 
                                "Division by zero"
                                : 
                                ((operand1 / operand2).getPrecision() > 4) ? 
                                  (operand1 / operand2).toFixed(4).toString() 
                                  : 
                                  (operand1 / operand2).toString();
            break;
          case "x":
            resultOperation = ((operand1 * operand2).getPrecision() > 4) ? 
                                (operand1 * operand2).toFixed(4).toString() 
                                : 
                                (operand1 * operand2).toString();
            break;
          case "-":
            resultOperation = ((operand1 - operand2).getPrecision() > 4) ? 
                                (operand1 - operand2).toFixed(4).toString() 
                                : 
                                (operand1 - operand2).toString();
            break;
          case "+":
            resultOperation = ((operand1 + operand2).getPrecision() > 4) ? 
                                (operand1 + operand2).toFixed(4).toString() 
                                : 
                                (operand1 + operand2).toString();
            break;
        }

        newResultExpression = this.state.resultExpression + " = " + resultOperation;
        newCurrentInput = resultOperation;

      } else {

        newCurrentInput = pressedOperator;

        switch (expressionOperator) {
          case "/":
            newResultExpression = (operand2 == 0) ? "" : (operand1 / operand2).toString() + " " + pressedOperator.toLowerCase() + " ";
            break;
          case "x":
            newResultExpression = (operand1 * operand2).toString() + " " + pressedOperator.toLowerCase() + " ";
            break;
          case "-":
            newResultExpression = (operand1 - operand2).toString() + " " + pressedOperator.toLowerCase() + " ";
            break;
          case "+":
            newResultExpression = (operand1 + operand2).toString() + " " + pressedOperator.toLowerCase() + " ";
            break;
        }
      }

      if (newResultExpression != "") {
        this.setState({
          resultExpression: newResultExpression,
          currentIntput: (Number(newCurrentInput).getPrecision() > 4) ? Number(newCurrentInput).toFixed(4).toString() : newCurrentInput
        });
      } else {
        this.setState({
          currentIntput: "division by zero"
        });
      }

    }
  }

  enterArithmeticOperator(operator) {

    if (/\-/.test(operator) && (/zero/.test(this.state.currentIntput) || this.state.resultExpression == "")) {
      this.setState({
        resultExpression: "-0", 
        currentIntput: "-0"
      });
    } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] $/.test(this.state.resultExpression) && /\-/.test(operator)) {
      this.setState({
        resultExpression: this.state.resultExpression + "-", 
        currentIntput: "-"
      });
    } else if (/=/.test(this.state.resultExpression)) {
      this.setState({
        resultExpression: this.state.currentIntput + " " + operator.toLowerCase() + " ", 
        currentIntput: operator
      });
    } else if (/^\-?\d+(\.?\d+)?$/.test(this.state.resultExpression)) {
      this.setState({
        resultExpression: this.state.resultExpression + " " + operator.toLowerCase() + " ", 
        currentIntput: operator
      });
    } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?$/.test(this.state.resultExpression)) {
      this.setState({
        resultExpression: this.state.resultExpression.replace(/. \-?$/, operator.toLowerCase() + " "), 
        currentIntput: operator
      });
    } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?\d+(\.?\d+)?$/.test(this.state.resultExpression)) {
      this.makeOperation(operator);
    }
  }

  render() {
    return (
      <div id="calculator-container" className="container-fluid pt-3 pb-4">
        <p id="marca" className="text-center mb-2 text-secondary fs-4">FreeCodeCamp</p>
        <CalculatorScreen
          turnOn={this.state.on}
          result={this.state.resultExpression}
          input={this.state.currentIntput}
        />
        <CalculatorPad
          turnOn={this.state.on}
          action={this.handlePressedKey}
        />
      </div>
    );
  }
}

export default Calculator;