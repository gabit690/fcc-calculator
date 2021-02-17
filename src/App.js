import './App.css';

import Calculator from './components/Calculator/Calculator';
import Contact from './components/Contact/Contact';

import { Provider } from "react-redux";
import { store } from './CalculatorRedux.js'

const CalculatorProvider = (<Provider store={store}>
  <Calculator />
</Provider>);

function App() {
  return (
    <div className="App">
      {CalculatorProvider}
      <Contact />
    </div>
  );
}

export default App;