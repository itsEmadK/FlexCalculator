export interface CalculatorState {
  firstOperand: number | null;
  secondOperand: number | null;
  currentOperator: string | null;
  displayValue: string;
  waitingForSecondOperand: boolean;
  expressionString: string;
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
    default:
      return secondOperand;
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
      return {
        ...state,
        displayValue: String(result),
        firstOperand: result,
        currentOperator: null,
        waitingForSecondOperand: true,
        expressionString: `${firstOperand} ${currentOperator} ${inputValue} =`
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
