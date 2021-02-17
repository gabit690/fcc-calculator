import { createStore } from "redux";

// INITIAL STATE

const initialState = {
  on: true,
  resultExpression: "",
  currentInput: "0"
};

// CONST ACTIONS 

const SWITCH_POWER = 'SWITCH_POWER';
const CLEAR_SCREEN = 'CLEAR_SCREEN';
const CHANGE_SCREEN_VALUES = 'CHANGE_SCREEN_VALUES';

// ACTIONS CREATORS

function switchPower(previousState) {
  return {
    type: SWITCH_POWER,
    newState: !previousState
  }
}

function clearScreen() {
  return {
    type: CLEAR_SCREEN
  };
}

function changeScreenValues(expression, input) {
  return {
    type: CHANGE_SCREEN_VALUES,
    newScreenValues: {
      expression,
      input
    }
  }
}

// REDUCERS

function calculatorReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_POWER:
      if (action.newState) {
        return {
          on: action.newState,
          resultExpression: "",
          currentInput: "0"
        };
      } else {
        return {
          on: action.newState,
          resultExpression: "",
          currentInput: ""
        };
      }
    case CLEAR_SCREEN:
      return {
        ...state,
        resultExpression: "",
        currentInput: "0"
      };
    case CHANGE_SCREEN_VALUES:
      return {
        ...state,
        resultExpression: action.newScreenValues.expression,
        currentInput: action.newScreenValues.input
      };
    default:
      return state;
  }
}

// STORE

const store = createStore(calculatorReducer);

// MAPS FUNCIONALITY

function mapStateToProps(state) {
  return {
    on: state.on,
    resultExpression: state.resultExpression,
    currentInput: state.currentInput
  };
}

const mapDispatchToProps = {
  switchPower,
  clearScreen,
  changeScreenValues
};

export { store, mapStateToProps, mapDispatchToProps };