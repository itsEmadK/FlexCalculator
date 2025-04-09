interface DisplayProps {
  displayValue: string;
  expressionString: string;
}

export default function Display({ displayValue, expressionString }: DisplayProps) {
  return (
    <div className="p-4 bg-gray-100 border-b border-gray-200">
      {/* Expression display - shows the current calculation */}
      <div className="h-6 text-right text-gray-600 text-sm mb-1 overflow-x-auto whitespace-nowrap">
        {expressionString || '0'}
      </div>
      
      {/* Result display - shows the current input or result */}
      <div className="h-12 text-right text-gray-900 text-3xl font-medium overflow-x-auto whitespace-nowrap">
        {displayValue}
      </div>
    </div>
  );
}
