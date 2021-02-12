import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './CalculatorScreen.css';

const CalculatorScreen = (props) => {
  return (
    <div id="display-container" className="container-fluid border rounded">
      <div id="display">
        <p id="result" className="text-end my-0">{props.result}</p>
        <p id="input" className="text-end my-0">{props.input}</p>
      </div>
    </div>
  );
};

export default CalculatorScreen;