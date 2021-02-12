import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
// import './Button.css';

const Button = (props) => {

  const {id, value} = props;

  return (
    <div className="container-fluid">
      <button id={id}>{value}</button>
    </div>
  );
};

export default Button;