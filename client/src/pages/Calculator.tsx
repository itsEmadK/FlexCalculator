import { useState, useEffect } from 'react';
import Display from '@/components/Calculator/Display';
import Keyboard from '@/components/Calculator/Keyboard';
import ScientificKeyboard from '@/components/Calculator/ScientificKeyboard';
import ModeToggle from '@/components/Calculator/ModeToggle';
import { 
  CalculatorState, 
  CalculatorMode,
  handleDigit, 
  handleOperator, 
  handleEquals, 
  handleClear, 
  handleBackspace, 
  handleDecimal,
  handleScientific,
  handleMemory
} from '@/lib/calculatorLogic';

export default function Calculator() {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    firstOperand: null,
    secondOperand: null,
    currentOperator: null,
    displayValue: '0',
    waitingForSecondOperand: false,
    expressionString: '',
    mode: 'simple',
    history: [],
    memory: 0
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
      // Scientific mode specific
      else if (calculatorState.mode === 'scientific') {
        // Implement additional keyboard shortcuts for scientific functions if needed
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [calculatorState.mode]);

  // Handle changing calculator mode
  const handleModeChange = (mode: CalculatorMode) => {
    setCalculatorState(prev => ({
      ...prev,
      mode,
      // Optionally reset the calculator when switching modes
      // displayValue: '0',
      // expressionString: '',
      // firstOperand: null,
      // secondOperand: null,
      // currentOperator: null,
      // waitingForSecondOperand: false
    }));
  };

  // Handle scientific operations
  const handleScientificOperation = (operation: string) => {
    setCalculatorState(prev => handleScientific(prev, operation));
  };

  // Handle memory operations
  const handleMemoryOperation = (operation: 'M+' | 'M-' | 'MR' | 'MC') => {
    setCalculatorState(prev => handleMemory(prev, operation));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans flex items-center justify-center p-4">
      <div className={`${calculatorState.mode === 'scientific' ? 'max-w-md' : 'max-w-xs'} w-full bg-white rounded-lg shadow-md overflow-hidden`}>
        {/* Calculator header */}
        <div className="bg-primary p-3">
          <h1 className="text-lg font-medium text-center text-white">
            {calculatorState.mode === 'simple' ? 'Simple Calculator' : 'Scientific Calculator'}
          </h1>
        </div>
        
        {/* Mode toggle */}
        <ModeToggle currentMode={calculatorState.mode} onModeChange={handleModeChange} />

        {/* Calculator display with history and memory indicator */}
        <Display 
          displayValue={calculatorState.displayValue} 
          expressionString={calculatorState.expressionString}
          history={calculatorState.history}
          memory={calculatorState.memory}
        />

        {/* Calculator keyboard - show different keyboard based on mode */}
        {calculatorState.mode === 'simple' ? (
          <Keyboard 
            calculatorState={calculatorState}
            onDigitClick={(digit) => setCalculatorState(prev => handleDigit(prev, digit))}
            onOperatorClick={(operator) => setCalculatorState(prev => handleOperator(prev, operator))}
            onEqualsClick={() => setCalculatorState(prev => handleEquals(prev))}
            onClearClick={() => setCalculatorState(prev => handleClear(prev))}
            onBackspaceClick={() => setCalculatorState(prev => handleBackspace(prev))}
            onDecimalClick={() => setCalculatorState(prev => handleDecimal(prev))}
          />
        ) : (
          <ScientificKeyboard 
            calculatorState={calculatorState}
            onDigitClick={(digit) => setCalculatorState(prev => handleDigit(prev, digit))}
            onOperatorClick={(operator) => setCalculatorState(prev => handleOperator(prev, operator))}
            onEqualsClick={() => setCalculatorState(prev => handleEquals(prev))}
            onClearClick={() => setCalculatorState(prev => handleClear(prev))}
            onBackspaceClick={() => setCalculatorState(prev => handleBackspace(prev))}
            onDecimalClick={() => setCalculatorState(prev => handleDecimal(prev))}
            onScientificOperation={handleScientificOperation}
            onMemoryOperation={handleMemoryOperation}
          />
        )}
      </div>
    </div>
  );
}
