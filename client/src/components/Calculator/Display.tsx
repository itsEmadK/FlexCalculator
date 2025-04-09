import { useState } from 'react';

interface DisplayProps {
  displayValue: string;
  expressionString: string;
  history?: Array<{
    expression: string;
    result: string;
  }>;
  memory?: number;
}

export default function Display({ displayValue, expressionString, history = [], memory = 0 }: DisplayProps) {
  const [showHistory, setShowHistory] = useState(false);
  
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      {/* Memory indicator */}
      <div className="flex justify-between items-center px-4 pt-2">
        <div className="text-xs text-gray-600">
          {memory !== 0 && <span className="bg-gray-200 px-2 py-1 rounded text-xs">M: {memory}</span>}
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="text-xs text-primary hover:text-primary-600 transition-colors"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>
      
      {/* History panel */}
      {showHistory && history.length > 0 && (
        <div className="max-h-32 overflow-y-auto p-2 bg-gray-50 border-t border-b border-gray-200">
          <ul className="text-sm">
            {[...history].reverse().map((item, index) => (
              <li key={index} className="mb-1 pb-1 border-b border-gray-100 last:border-0">
                <div className="text-gray-600">{item.expression}</div>
                <div className="text-right font-medium">{item.result}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Expression display - shows the current calculation */}
      <div className="px-4 pt-2 h-6 text-right text-gray-600 text-sm mb-1 overflow-x-auto whitespace-nowrap">
        {expressionString || '0'}
      </div>
      
      {/* Result display - shows the current input or result */}
      <div className="px-4 pb-4 h-12 text-right text-gray-900 text-3xl font-medium overflow-x-auto whitespace-nowrap">
        {displayValue}
      </div>
    </div>
  );
}
