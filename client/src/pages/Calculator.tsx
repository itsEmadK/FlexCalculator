import { useState, useEffect } from 'react';
import Display from '@/components/Calculator/Display';
import Keyboard from '@/components/Calculator/Keyboard';
import { CalculatorState, handleDigit, handleOperator, handleEquals, handleClear, handleBackspace, handleDecimal } from '@/lib/calculatorLogic';

export default function Calculator() {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    firstOperand: null,
    secondOperand: null,
    currentOperator: null,
    displayValue: '0',
    waitingForSecondOperand: false,
    expressionString: ''
  });

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Number keys (0-9)
      if (/^\d$/.test(event.key)) {
        setCalculatorState(prev => handleDigit(prev, event.key));
      }
      // Operators
      else if (event.key === '+') {
        setCalculatorState(prev => handleOperator(prev, '+'));
      }
      else if (event.key === '-') {
        setCalculatorState(prev => handleOperator(prev, '-'));
      }
      else if (event.key === '*') {
        setCalculatorState(prev => handleOperator(prev, '×'));
      }
      else if (event.key === '/') {
        event.preventDefault(); // Prevent browser quick find
        setCalculatorState(prev => handleOperator(prev, '÷'));
      }
      // Equals/Enter
      else if (event.key === '=' || event.key === 'Enter') {
        setCalculatorState(prev => handleEquals(prev));
      }
      // Decimal point
      else if (event.key === '.') {
        setCalculatorState(prev => handleDecimal(prev));
      }
      // Backspace
      else if (event.key === 'Backspace') {
        setCalculatorState(prev => handleBackspace(prev));
      }
      // Clear/Escape
      else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        setCalculatorState(prev => handleClear(prev));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans flex items-center justify-center p-4">
      <div className="max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Calculator header */}
        <div className="bg-primary p-3">
          <h1 className="text-lg font-medium text-center text-white">Simple Calculator</h1>
        </div>

        {/* Calculator display */}
        <Display 
          displayValue={calculatorState.displayValue} 
          expressionString={calculatorState.expressionString} 
        />

        {/* Calculator keyboard */}
        <Keyboard 
          calculatorState={calculatorState}
          onDigitClick={(digit) => setCalculatorState(prev => handleDigit(prev, digit))}
          onOperatorClick={(operator) => setCalculatorState(prev => handleOperator(prev, operator))}
          onEqualsClick={() => setCalculatorState(prev => handleEquals(prev))}
          onClearClick={() => setCalculatorState(prev => handleClear(prev))}
          onBackspaceClick={() => setCalculatorState(prev => handleBackspace(prev))}
          onDecimalClick={() => setCalculatorState(prev => handleDecimal(prev))}
        />
      </div>
    </div>
  );
}
