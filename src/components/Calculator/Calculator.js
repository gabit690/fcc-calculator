import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './Calculator.css';

import CalculatorScreen from '../CalculatorScreen/CalculatorScreen';
import CalculatorPad from '../CalculatorPad/CalculatorPad';

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
        console.log("CLEAR");
        this.cleanScreen();
        break;
      case "P":
        console.log("POWER");
        this.switchPower();
        break;
      case "=":
        console.log("EQUAL");
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
      case "=":
        break;
    }

  }

  inputNumber(number) {

    if (/=/.test(this.state.resultExpression) || 
        this.state.resultExpression == "" || 
        this.state.currentIntput == "-0") {
      this.setState({
        resultExpression: number, 
        currentIntput: number
      });
    } else if (/\d+[\/x\-\+]$/.test(this.state.resultExpression)) {
      this.setState({
        resultExpression: this.state.resultExpression + number, 
        currentIntput: number
      });
    } else if (/\d+[\/x\-\+]+0$|^0$/.test(this.state.resultExpression)) {
      this.setState({
        resultExpression: this.state.resultExpression.replace(/.$/, number), 
        currentIntput: number
      });
    } else if (/[^0]|\./.test(this.state.currentIntput)) {
      this.setState({
        resultExpression: this.state.resultExpression + number, 
        currentIntput: this.state.currentIntput + number
      });
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

    if (/=/.test(this.state.resultExpression) || 
        this.state.resultExpression == "") {
      this.setState({
        resultExpression: "0.", 
        currentIntput: "0."
      });
    } else if (/\d+[\/x\-\+]$/.test(this.state.resultExpression)) {
      this.setState({
        resultExpression: this.state.resultExpression + "0.", 
        currentIntput: "0."
      });
    } else if (/\d+[\/x\-\+]\-$/.test(this.state.resultExpression)) {
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

  enterArithmeticOperator(operator) {
    
    if (/\-/.test(operator) && this.state.resultExpression == "") {
      this.setState({
        resultExpression: "-0", 
        currentIntput: "-0"
      });
    } else if (/=/.test(this.state.resultExpression) || 
                this.state.resultExpression == "") {
      this.setState({
        resultExpression: this.state.currentIntput + operator.toLowerCase(), 
        currentIntput: operator
      });
    } else if (!/[\/x\-\+]/.test(this.state.resultExpression) ||
                (/\d+[\/x\+]$/.test(this.state.resultExpression)) 
                && 
                /\-/.test(operator)) {
      this.setState({
        resultExpression: this.state.resultExpression + operator.toLowerCase(), 
        currentIntput: operator
      });
    } else if (/\d+[\/x\-\+]$/.test(this.state.resultExpression)) {
      this.setState({
        resultExpression: this.state.resultExpression.replace(/.$/, operator.toLowerCase()), 
        currentIntput: operator
      });
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