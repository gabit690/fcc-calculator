import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './Button.css';

const Button = (props) => {

  let {id, value, type} = props;

  return (
    <div className="container-fluid d-flex p-0">
      <button 
        id={id} 
        className={"w-100 fs-2 " + type}
        onClick={props.action}
        disabled={!props.active}
      >
        {value}
      </button>
    </div>
  );
  
};

export default Button;