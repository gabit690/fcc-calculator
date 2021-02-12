import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
// import './CalculatorScreen.css';

const CalculatorScreen = (props) => {
  return (
    <div id="display-container" className="container-fluid">
      <div id="display">
        <p id="result" className="text-end">{props.result}</p>
        <p id="input" className="text-end">{props.input}</p>
      </div>
    </div>
  );
};

export default CalculatorScreen;