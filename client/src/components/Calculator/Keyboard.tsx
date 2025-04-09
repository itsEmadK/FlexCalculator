import { CalculatorState } from '@/lib/calculatorLogic';
import Button from './Button';

interface KeyboardProps {
  calculatorState: CalculatorState;
  onDigitClick: (digit: string) => void;
  onOperatorClick: (operator: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onBackspaceClick: () => void;
  onDecimalClick: () => void;
}

export default function Keyboard({
  calculatorState,
  onDigitClick,
  onOperatorClick,
  onEqualsClick,
  onClearClick,
  onBackspaceClick,
  onDecimalClick
}: KeyboardProps) {
  return (
    <div className="grid grid-cols-4 gap-1 p-2 bg-white">
      {/* First row: Clear, Back, ÷ */}
      <Button onClick={onClearClick} variant="function" span="double">
        Clear
      </Button>
      <Button onClick={onBackspaceClick} variant="function">
        ⌫
      </Button>
      <Button 
        onClick={() => onOperatorClick('÷')} 
        variant="operator"
        active={calculatorState.currentOperator === '÷'}
      >
        ÷
      </Button>
      
      {/* Second row: 7, 8, 9, × */}
      <Button onClick={() => onDigitClick('7')}>7</Button>
      <Button onClick={() => onDigitClick('8')}>8</Button>
      <Button onClick={() => onDigitClick('9')}>9</Button>
      <Button 
        onClick={() => onOperatorClick('×')} 
        variant="operator"
        active={calculatorState.currentOperator === '×'}
      >
        ×
      </Button>
      
      {/* Third row: 4, 5, 6, - */}
      <Button onClick={() => onDigitClick('4')}>4</Button>
      <Button onClick={() => onDigitClick('5')}>5</Button>
      <Button onClick={() => onDigitClick('6')}>6</Button>
      <Button 
        onClick={() => onOperatorClick('-')} 
        variant="operator"
        active={calculatorState.currentOperator === '-'}
      >
        -
      </Button>
      
      {/* Fourth row: 1, 2, 3, + */}
      <Button onClick={() => onDigitClick('1')}>1</Button>
      <Button onClick={() => onDigitClick('2')}>2</Button>
      <Button onClick={() => onDigitClick('3')}>3</Button>
      <Button 
        onClick={() => onOperatorClick('+')} 
        variant="operator"
        active={calculatorState.currentOperator === '+'}
      >
        +
      </Button>
      
      {/* Fifth row: 0, ., = */}
      <Button onClick={() => onDigitClick('0')} span="double">0</Button>
      <Button onClick={onDecimalClick}>.</Button>
      <Button onClick={onEqualsClick} variant="equals">=</Button>
    </div>
  );
}
