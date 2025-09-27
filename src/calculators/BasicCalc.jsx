import { useState } from 'react';
import { Link } from 'react-router-dom';

const BasicCalc = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const buttonClass = "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 px-4 rounded transition-colors";

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          ← Back to Home
        </Link>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Basic Calculator</h2>
      </div>

      <div className="mb-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-right text-2xl font-mono text-gray-800 dark:text-white">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className={`${buttonClass} col-span-2`}>Clear</button>
        <button onClick={() => performOperation('/')} className={buttonClass}>/</button>
        <button onClick={() => performOperation('*')} className={buttonClass}>*</button>

        <button onClick={() => inputNumber(7)} className={buttonClass}>7</button>
        <button onClick={() => inputNumber(8)} className={buttonClass}>8</button>
        <button onClick={() => inputNumber(9)} className={buttonClass}>9</button>
        <button onClick={() => performOperation('-')} className={buttonClass}>-</button>

        <button onClick={() => inputNumber(4)} className={buttonClass}>4</button>
        <button onClick={() => inputNumber(5)} className={buttonClass}>5</button>
        <button onClick={() => inputNumber(6)} className={buttonClass}>6</button>
        <button onClick={() => performOperation('+')} className={buttonClass}>+</button>

        <button onClick={() => inputNumber(1)} className={buttonClass}>1</button>
        <button onClick={() => inputNumber(2)} className={buttonClass}>2</button>
        <button onClick={() => inputNumber(3)} className={buttonClass}>3</button>
        <button onClick={() => performOperation('=')} className={`${buttonClass} row-span-2`}>=</button>

        <button onClick={() => inputNumber(0)} className={`${buttonClass} col-span-2`}>0</button>
        <button onClick={inputDecimal} className={buttonClass}>.</button>
      </div>
    </div>
  );
};

export default BasicCalc;
