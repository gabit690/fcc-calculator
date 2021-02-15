import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './CalculatorPad.css';

import Button from "../Button/Button";

const CalculatorPad = (props) => {

  const buttonsInfo = [
    {
      id: "clear",
      value: "C",
      type: "btn-clear"
    },
    {
      id: "power",
      value: "P",
      type: "btn-power"
    },
    {
      id: "seven",
      value: "7",
      type: "btn-number"
    },
    {
      id: "eight",
      value: "8",
      type: "btn-number"
    },
    {
      id: "nine",
      value: "9",
      type: "btn-number"
    },
    {
      id: "divide",
      value: "/",
      type: "btn-operator"
    },
    {
      id: "four",
      value: "4",
      type: "btn-number"
    },
    {
      id: "five",
      value: "5",
      type: "btn-number"
    },
    {
      id: "six",
      value: "6",
      type: "btn-number"
    },
    {
      id: "multiply",
      value: "X",
      type: "btn-operator"
    },
    {
      id: "one",
      value: "1",
      type: "btn-number"
    },
    {
      id: "two",
      value: "2",
      type: "btn-number"
    },
    {
      id: "three",
      value: "3",
      type: "btn-number"
    },
    {
      id: "subtract",
      value: "-",
      type: "btn-operator"
    },
    {
      id: "zero",
      value: "0",
      type: "btn-number"
    },
    {
      id: "decimal",
      value: ".",
      type: "btn-operator"
    },
    {
      id: "equals",
      value: "=",
      type: "btn-operator"
    },
    {
      id: "add",
      value: "+",
      type: "btn-operator"
    }
  ];

  const buttons = buttonsInfo.map((button, index) => {
    return (
      <Button 
        id={button.id} 
        key={index} 
        value={button.value} 
        type={button.type}
        action={props.action}
        active={(button.id !== "power") ? props.turnOn : true}
      />
    );
  });

  return (
    <div className="container-fluid mt-3">
      <div id="pad-container" className="">
        {buttons}
      </div>
    </div>
  );
};

export default CalculatorPad;