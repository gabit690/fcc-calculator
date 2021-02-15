import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './CalculatorScreen.css';

const CalculatorScreen = (props) => {
  return (
    <div 
      id="display-container" 
      className={"container-fluid border rounded" +
      (props.turnOn ? "" : " displayOff")}
    >
      <p 
        id="result" 
        className="text-end my-0 text-success"
      >
        {props.result}
      </p>
      <p 
        id="display" 
        className="text-end my-0"
      >
        {props.input}
      </p>
    </div>
  );
};

export default CalculatorScreen;