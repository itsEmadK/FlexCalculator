import { CalculatorState } from '@/lib/calculatorLogic';
import Button from './Button';

interface ScientificKeyboardProps {
  calculatorState: CalculatorState;
  onScientificOperation: (operation: string) => void;
  onOperatorClick: (operator: string) => void;
  onDigitClick: (digit: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onBackspaceClick: () => void;
  onDecimalClick: () => void;
  onMemoryOperation: (operation: 'M+' | 'M-' | 'MR' | 'MC') => void;
}

export default function ScientificKeyboard({
  calculatorState,
  onScientificOperation,
  onOperatorClick,
  onDigitClick,
  onEqualsClick,
  onClearClick,
  onBackspaceClick,
  onDecimalClick,
  onMemoryOperation
}: ScientificKeyboardProps) {
  return (
    <div className="grid grid-cols-5 gap-1 p-2 bg-white">
      {/* Memory functions row */}
      <Button onClick={() => onMemoryOperation('MC')} variant="function">MC</Button>
      <Button onClick={() => onMemoryOperation('MR')} variant="function">MR</Button>
      <Button onClick={() => onMemoryOperation('M+')} variant="function">M+</Button>
      <Button onClick={() => onMemoryOperation('M-')} variant="function">M-</Button>
      <Button onClick={() => onScientificOperation('+/-')} variant="function">+/-</Button>
      
      {/* Scientific functions row 1 */}
      <Button onClick={() => onScientificOperation('sqrt')} variant="function">√</Button>
      <Button onClick={() => onScientificOperation('square')} variant="function">x²</Button>
      <Button onClick={() => onScientificOperation('cube')} variant="function">x³</Button>
      <Button onClick={() => onOperatorClick('^')} variant="operator" active={calculatorState.currentOperator === '^'}>
        x^y
      </Button>
      <Button onClick={() => onScientificOperation('1/x')} variant="function">1/x</Button>
      
      {/* Scientific functions row 2 */}
      <Button onClick={() => onScientificOperation('sin')} variant="function">sin</Button>
      <Button onClick={() => onScientificOperation('cos')} variant="function">cos</Button>
      <Button onClick={() => onScientificOperation('tan')} variant="function">tan</Button>
      <Button onClick={() => onScientificOperation('log')} variant="function">log</Button>
      <Button onClick={() => onScientificOperation('ln')} variant="function">ln</Button>
      
      {/* Scientific functions row 3 */}
      <Button onClick={() => onScientificOperation('pi')} variant="function">π</Button>
      <Button onClick={() => onScientificOperation('e')} variant="function">e</Button>
      <Button onClick={() => onOperatorClick('mod')} variant="operator" active={calculatorState.currentOperator === 'mod'}>
        mod
      </Button>
      <Button onClick={onClearClick} variant="function">C</Button>
      <Button onClick={onBackspaceClick} variant="function">⌫</Button>
      
      {/* Regular calculator rows */}
      <Button onClick={() => onDigitClick('7')}>7</Button>
      <Button onClick={() => onDigitClick('8')}>8</Button>
      <Button onClick={() => onDigitClick('9')}>9</Button>
      <Button 
        onClick={() => onOperatorClick('÷')} 
        variant="operator"
        active={calculatorState.currentOperator === '÷'}
      >
        ÷
      </Button>
      <Button onClick={() => onScientificOperation('exp')} variant="function">e^x</Button>
      
      <Button onClick={() => onDigitClick('4')}>4</Button>
      <Button onClick={() => onDigitClick('5')}>5</Button>
      <Button onClick={() => onDigitClick('6')}>6</Button>
      <Button 
        onClick={() => onOperatorClick('×')} 
        variant="operator"
        active={calculatorState.currentOperator === '×'}
      >
        ×
      </Button>
      <Button onClick={() => onOperatorClick('^')} variant="operator" active={calculatorState.currentOperator === '^'}>
        ^
      </Button>
      
      <Button onClick={() => onDigitClick('1')}>1</Button>
      <Button onClick={() => onDigitClick('2')}>2</Button>
      <Button onClick={() => onDigitClick('3')}>3</Button>
      <Button 
        onClick={() => onOperatorClick('-')} 
        variant="operator"
        active={calculatorState.currentOperator === '-'}
      >
        -
      </Button>
      <Button 
        onClick={() => onOperatorClick('+')} 
        variant="operator"
        active={calculatorState.currentOperator === '+'}
      >
        +
      </Button>
      
      <Button onClick={() => onDigitClick('0')} span="double">0</Button>
      <Button onClick={onDecimalClick}>.</Button>
      <Button onClick={onEqualsClick} variant="equals" span="double">=</Button>
    </div>
  );
}