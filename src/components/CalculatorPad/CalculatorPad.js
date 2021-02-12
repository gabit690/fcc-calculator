import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
// import './CalculatorPad.css';

import Button from "../Button/Button";

const CalculatorPad = (props) => {

  const buttonsInfo = [
    {
      id: "clear",
      value: "C"
    },
    {
      id: "power",
      value: "P"
    },
    {
      id: "seven",
      value: "7"
    },
    {
      id: "eight",
      value: "8"
    },
    {
      id: "nine",
      value: "9"
    },
    {
      id: "divide",
      value: "/"
    },
    {
      id: "four",
      value: "4"
    },
    {
      id: "five",
      value: "5"
    },
    {
      id: "six",
      value: "6"
    },
    {
      id: "multiply",
      value: "*"
    },
    {
      id: "one",
      value: "1"
    },
    {
      id: "two",
      value: "2"
    },
    {
      id: "three",
      value: "3"
    },
    {
      id: "subtract",
      value: "-"
    },
    {
      id: "zero",
      value: "0"
    },
    {
      id: "decimal",
      value: "."
    },
    {
      id: "equal",
      value: "="
    },
    {
      id: "add",
      value: "+"
    }
  ];

  const buttons = buttonsInfo.map((button, index) => {
    return (<Button id={button.id} key={index} value={button.value}/>);
  });

  console.log(buttons);

  return (
    <div id="pad-container" className="container-fluid">
        {buttons}
    </div>
  );
};

export default CalculatorPad;