export type CalculatorMode = 'simple' | 'scientific';

export interface CalculatorState {
  firstOperand: number | null;
  secondOperand: number | null;
  currentOperator: string | null;
  displayValue: string;
  waitingForSecondOperand: boolean;
  expressionString: string;
  mode: CalculatorMode;
  history: Array<{
    expression: string;
    result: string;
  }>;
  memory: number;
}

// Helper function to perform the calculation based on operator
export function calculate(firstOperand: number, secondOperand: number, operator: string): number {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '×':
      return firstOperand * secondOperand;
    case '÷':
      if (secondOperand === 0) {
        throw new Error("Cannot divide by zero");
      }
      return firstOperand / secondOperand;
    case '^':
      return Math.pow(firstOperand, secondOperand);
    case 'mod':
      return firstOperand % secondOperand;
    default:
      return secondOperand;
  }
}

// Scientific functions
export function handleScientific(state: CalculatorState, operation: string): CalculatorState {
  if (state.displayValue === 'Cannot divide by zero' || state.displayValue === 'Invalid input') {
    return handleClear(state);
  }
  
  const currentValue = parseFloat(state.displayValue);
  let result: number;
  let expressionStr = '';
  
  try {
    switch (operation) {
      case 'sin':
        result = Math.sin(currentValue);
        expressionStr = `sin(${currentValue})`;
        break;
      case 'cos':
        result = Math.cos(currentValue);
        expressionStr = `cos(${currentValue})`;
        break;
      case 'tan':
        result = Math.tan(currentValue);
        expressionStr = `tan(${currentValue})`;
        break;
      case 'sqrt':
        if (currentValue < 0) throw new Error('Invalid input');
        result = Math.sqrt(currentValue);
        expressionStr = `√(${currentValue})`;
        break;
      case 'log':
        if (currentValue <= 0) throw new Error('Invalid input');
        result = Math.log10(currentValue);
        expressionStr = `log(${currentValue})`;
        break;
      case 'ln':
        if (currentValue <= 0) throw new Error('Invalid input');
        result = Math.log(currentValue);
        expressionStr = `ln(${currentValue})`;
        break;
      case 'square':
        result = currentValue * currentValue;
        expressionStr = `(${currentValue})²`;
        break;
      case 'cube':
        result = currentValue * currentValue * currentValue;
        expressionStr = `(${currentValue})³`;
        break;
      case '1/x':
        if (currentValue === 0) throw new Error('Cannot divide by zero');
        result = 1 / currentValue;
        expressionStr = `1/(${currentValue})`;
        break;
      case '+/-':
        result = -currentValue;
        expressionStr = `-(${currentValue})`;
        break;
      case 'exp':
        result = Math.exp(currentValue);
        expressionStr = `e^(${currentValue})`;
        break;
      case 'pi':
        result = Math.PI;
        expressionStr = 'π';
        break;
      case 'e':
        result = Math.E;
        expressionStr = 'e';
        break;
      default:
        return state;
    }
    
    // Add to history
    const newHistory = [...state.history];
    if (operation !== 'pi' && operation !== 'e') {
      newHistory.push({
        expression: expressionStr,
        result: result.toString()
      });
    }
    
    return {
      ...state,
      displayValue: result.toString(),
      expressionString: expressionStr,
      firstOperand: result,
      waitingForSecondOperand: true,
      history: newHistory
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ...state,
        displayValue: error.message,
        expressionString: error.message,
        firstOperand: null,
        currentOperator: null,
        waitingForSecondOperand: true
      };
    }
    return state;
  }
}

// Handle when a digit is pressed
export function handleDigit(state: CalculatorState, digit: string): CalculatorState {
  const { displayValue, waitingForSecondOperand } = state;

  if (waitingForSecondOperand) {
    return {
      ...state,
      displayValue: digit,
      waitingForSecondOperand: false
    };
  } else {
    return {
      ...state,
      displayValue: displayValue === '0' ? digit : displayValue + digit
    };
  }
}

// Handle when an operator is pressed
export function handleOperator(state: CalculatorState, operator: string): CalculatorState {
  const { firstOperand, displayValue, currentOperator, waitingForSecondOperand } = state;
  const inputValue = parseFloat(displayValue);

  // If we already have a firstOperand and an operator,
  // we need to calculate before setting the new operator
  if (firstOperand !== null && currentOperator && !waitingForSecondOperand) {
    try {
      const result = calculate(firstOperand, inputValue, currentOperator);
      return {
        ...state,
        displayValue: String(result),
        firstOperand: result,
        currentOperator: operator,
        waitingForSecondOperand: true,
        expressionString: `${result} ${operator}`
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          ...state,
          displayValue: error.message,
          firstOperand: null,
          currentOperator: null,
          waitingForSecondOperand: true,
          expressionString: error.message
        };
      }
      return state;
    }
  } else {
    // Otherwise, just set firstOperand to the current display value
    return {
      ...state,
      firstOperand: inputValue,
      currentOperator: operator,
      waitingForSecondOperand: true,
      expressionString: `${inputValue} ${operator}`
    };
  }
}

// Handle when equals is pressed
export function handleEquals(state: CalculatorState): CalculatorState {
  const { firstOperand, displayValue, currentOperator } = state;
  const inputValue = parseFloat(displayValue);

  if (currentOperator) {
    try {
      const result = calculate(firstOperand!, inputValue, currentOperator);
      
      // Add to history
      const newHistory = [...state.history];
      const expressionStr = `${firstOperand} ${currentOperator} ${inputValue} =`;
      newHistory.push({
        expression: expressionStr,
        result: result.toString()
      });
      
      return {
        ...state,
        displayValue: String(result),
        firstOperand: result,
        currentOperator: null,
        waitingForSecondOperand: true,
        expressionString: expressionStr,
        history: newHistory
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          ...state,
          displayValue: error.message,
          firstOperand: null,
          currentOperator: null,
          waitingForSecondOperand: true,
          expressionString: error.message
        };
      }
      return state;
    }
  }
  
  return state;
}

// Handle when clear is pressed
export function handleClear(state: CalculatorState): CalculatorState {
  return {
    ...state,
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    currentOperator: null,
    waitingForSecondOperand: false,
    expressionString: ''
  };
}

// Memory functions
export function handleMemory(state: CalculatorState, operation: 'M+' | 'M-' | 'MR' | 'MC'): CalculatorState {
  const currentValue = parseFloat(state.displayValue);
  
  switch (operation) {
    case 'M+':
      return {
        ...state,
        memory: state.memory + currentValue,
        waitingForSecondOperand: true
      };
    case 'M-':
      return {
        ...state,
        memory: state.memory - currentValue,
        waitingForSecondOperand: true
      };
    case 'MR':
      return {
        ...state,
        displayValue: state.memory.toString(),
        waitingForSecondOperand: true
      };
    case 'MC':
      return {
        ...state,
        memory: 0
      };
    default:
      return state;
  }
}

// Handle decimal point
export function handleDecimal(state: CalculatorState): CalculatorState {
  const { displayValue, waitingForSecondOperand } = state;

  if (waitingForSecondOperand) {
    return {
      ...state,
      displayValue: '0.',
      waitingForSecondOperand: false
    };
  }

  // If the display value doesn't contain a decimal point
  if (!displayValue.includes('.')) {
    return {
      ...state,
      displayValue: displayValue + '.'
    };
  }

  return state;
}

// Handle backspace
export function handleBackspace(state: CalculatorState): CalculatorState {
  const { displayValue, waitingForSecondOperand } = state;

  if (waitingForSecondOperand) {
    return state; // Do nothing if waiting for second operand
  }

  if (displayValue.length > 1) {
    return {
      ...state,
      displayValue: displayValue.slice(0, -1)
    };
  } else {
    return {
      ...state,
      displayValue: '0'
    };
  }
}
