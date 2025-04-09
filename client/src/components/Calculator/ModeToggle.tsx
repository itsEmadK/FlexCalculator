import { CalculatorMode } from '@/lib/calculatorLogic';

interface ModeToggleProps {
  currentMode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

export default function ModeToggle({ currentMode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex justify-center p-2 bg-gray-50 border-b border-gray-200">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
            currentMode === 'simple'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => onModeChange('simple')}
        >
          Simple
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
            currentMode === 'scientific'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => onModeChange('scientific')}
        >
          Scientific
        </button>
      </div>
    </div>
  );
}