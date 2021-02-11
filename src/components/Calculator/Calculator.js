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
      resultExpression: "resultado",
      currentIntput: "inputs"
    };
  }

  render() {
    return (
      <div id="calculator-container" className="container-fluid">
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