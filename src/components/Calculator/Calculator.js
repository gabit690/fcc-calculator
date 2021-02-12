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
      resultExpression: "67 + 4567 = 01",
      currentIntput: "+"
    };
  }

  render() {
    return (
      <div id="calculator-container" className="container-fluid py-3">
        <p id="marca" className="text-center mb-2 text-secondary">FreeCodeCamp</p>
        <CalculatorScreen 
          result={this.state.resultExpression}
          input={this.state.currentIntput}
        />
        <CalculatorPad />
      </div>
    );
  }
}

export default Calculator;