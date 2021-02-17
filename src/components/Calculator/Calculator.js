import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './Calculator.css';

import CalculatorScreen from '../CalculatorScreen/CalculatorScreen';
import CalculatorPad from '../CalculatorPad/CalculatorPad';

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from "../../CalculatorRedux.js";


Number.prototype.getPrecision = function() {
  var s = this + "",
      d = s.indexOf('.') + 1;

  return !d ? 0 : s.length - d;
};

class Calculator extends Component {

  constructor(props) {
    super(props);
    this.handlePressedKey = this.handlePressedKey.bind(this);
  }

  handlePressedKey(event) {
    
    const buttonKey = event.target.innerText;

    switch (buttonKey) {
      case "C":
        this.props.clearScreen();
        break;
      case "P":
        this.props.switchPower(this.props.on);
        break;
      case "=":
        this.makeOperation("=");
        break;
      default:
        this.enterKey(buttonKey);
        break;
    }

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

    if (this.props.currentInput.length <= 15) {
      if (/=|^\-?0$/.test(this.props.resultExpression) || 
          this.props.resultExpression == "" || 
          /zero/.test(this.props.currentInput)) {

        this.props.changeScreenValues(number, number);

      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] $/.test(this.props.resultExpression)) {

        this.props.changeScreenValues(this.props.resultExpression + number, number);

      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?0$/.test(this.props.resultExpression)) {

        this.props.changeScreenValues(this.props.resultExpression.replace(/(\-)?.$/, number), number);

      } else if (/^\-|\.|^[1-9]+/.test(this.props.currentInput)) {

        this.props.changeScreenValues(this.props.resultExpression + number, this.props.currentInput + number);

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

    if (this.props.currentInput.length <= 14) {
      if (/=/.test(this.props.resultExpression) || 
          this.props.resultExpression == "" || 
          /zero/.test(this.props.currentInput)) {

        this.props.changeScreenValues("0.", "0.");

      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] $/.test(this.props.resultExpression)) {

        this.props.changeScreenValues(this.props.resultExpression + "0.", "0.");

      } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-$/.test(this.props.resultExpression)) {

        this.props.changeScreenValues(this.props.resultExpression + "0.", this.props.currentInput + "0.");

      } else if (!/\.|^\-$/.test(this.props.currentInput)) {

        this.props.changeScreenValues(this.props.resultExpression + ".", this.props.currentInput + ".");

      }
    }

  }

  makeOperation(pressedOperator) {
    
    if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?\d+(\.?\d+)?$/.test(this.props.resultExpression) &&
    !/zero/.test(this.props.currentInput)) {

      const operand1 = Number(this.props.resultExpression.match(/^(\-)?\d+(\.\d+)?/)[0]);
      const expressionOperator = this.props.resultExpression.match(/ [\/x\-\+] /)[0].trim();
      const operand2 = Number(this.props.resultExpression.match(/(\-)?\d+(\.\d+)?$/)[0]);
      let newResultExpression = "";
      let newCurrentInput = "";
      
      if (/=/.test(pressedOperator)) {

        let resultOperation = "";

        switch (expressionOperator) {
          case "/":
            resultOperation = (operand2 == 0) ? 
                                "DIV by zero"
                                : 
                                ((operand1 / operand2).getPrecision() > 4) ? 
                                  ((operand1 / operand2).toFixed(4)).toString() 
                                  : 
                                  (operand1 / operand2).toString();
            break;
          case "x":
            resultOperation = ((operand1 * operand2).getPrecision() > 4) ? 
                                ((operand1 * operand2).toFixed(4)).toString() 
                                : 
                                (operand1 * operand2).toString();
            break;
          case "-":
            resultOperation = ((operand1 - operand2).getPrecision() > 4) ? 
                                ((operand1 - operand2).toFixed(4)).toString() 
                                : 
                                (operand1 - operand2).toString();
            break;
          case "+":
            resultOperation = ((operand1 + operand2).getPrecision() > 4) ? 
                                ((operand1 + operand2).toFixed(4)).toString() 
                                : 
                                (operand1 + operand2).toString();
            break;
        }

        newResultExpression = (/zero/.test(resultOperation)) ? 
                                this.props.resultExpression : 
                                (this.props.resultExpression + " = " + resultOperation);
        newCurrentInput = resultOperation;

      } else {
        newCurrentInput = pressedOperator;

        switch (expressionOperator) {
          case "/":
            newResultExpression = (operand2 == 0) ? 
                                  ""
                                  : 
                                  ((operand1 / operand2).getPrecision() > 4) ? 
                                    ((operand1 / operand2).toFixed(4)).toString() 
                                    : 
                                    (operand1 / operand2).toString();
            break;
          case "x":
            newResultExpression = ((operand1 * operand2).getPrecision() > 4) ? 
                                    ((operand1 * operand2).toFixed(4)).toString() 
                                    : 
                                    (operand1 * operand2).toString();
            break;
          case "-":
            newResultExpression = ((operand1 - operand2).getPrecision() > 4) ? 
                                    ((operand1 - operand2).toFixed(4)).toString() 
                                    : 
                                    (operand1 - operand2).toString();
            break;
          case "+":
            newResultExpression = ((operand1 + operand2).getPrecision() > 4) ? 
                                    ((operand1 + operand2).toFixed(4)).toString() 
                                    : 
                                    (operand1 + operand2).toString();
            break;
        }

      }
      
      if (newResultExpression != "") {

        if (!/=/.test(newResultExpression)) {
          newResultExpression += (" " + pressedOperator.toLowerCase() + " ");
        }

        this.props.changeScreenValues(newResultExpression, (Number(newCurrentInput).getPrecision() > 4) ? Number(newCurrentInput).toFixed(4).toString() : newCurrentInput);

      } else {

        this.props.changeScreenValues(this.props.resultExpression, "DIV by zero");

      }

    }
  }

  enterArithmeticOperator(operator) {

    if (/\-/.test(operator) && (/zero/.test(this.props.currentInput) || this.props.resultExpression == "")) {

      if (this.props.resultExpression == "" || /zero/.test(this.props.currentInput)) {
        this.props.changeScreenValues("-", "-");
      } else {
        this.props.changeScreenValues("-0", "-0");
      }

    } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] $/.test(this.props.resultExpression) && /\-/.test(operator)) {

      this.props.changeScreenValues(this.props.resultExpression + "-", "-");

    } else if (/=/.test(this.props.resultExpression)) {

      this.props.changeScreenValues(this.props.currentInput + " " + operator.toLowerCase() + " ", operator);

    } else if (/^\-?\d+(\.?\d+)?$/.test(this.props.resultExpression)) {

      this.props.changeScreenValues(this.props.resultExpression + " " + operator.toLowerCase() + " ", operator);

    } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?$/.test(this.props.resultExpression)) {

      this.props.changeScreenValues(this.props.resultExpression.replace(/. \-?$/, operator.toLowerCase() + " "), operator);

    } else if (/^\-?\d+(\.?\d+)? [\/x\-\+] \-?\d+(\.?\d+)?$/.test(this.props.resultExpression)) {
      this.makeOperation(operator);
    }
  }

  render() {
    return (
      <div id="calculator-container" className="container-fluid pt-3 pb-4">
        <p id="marca" className="text-center mb-2 text-secondary fs-4">FreeCodeCamp</p>
        <CalculatorScreen
          turnOn={this.props.on}
          result={this.props.resultExpression}
          input={this.props.currentInput}
        />
        <CalculatorPad
          turnOn={this.props.on}
          action={this.handlePressedKey}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Calculator);