import { useState } from 'react';
import { Link } from 'react-router-dom';

const ScientificCalc = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

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

  const clearAll = () => {
    clear();
    setMemory(0);
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

  const scientificOperation = (operation) => {
    const inputValue = parseFloat(display);
    let result;

    switch (operation) {
      case 'sin':
        result = Math.sin(inputValue * Math.PI / 180); // Convert to radians
        break;
      case 'cos':
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case 'asin':
        result = Math.asin(inputValue) * 180 / Math.PI; // Convert to degrees
        break;
      case 'acos':
        result = Math.acos(inputValue) * 180 / Math.PI;
        break;
      case 'atan':
        result = Math.atan(inputValue) * 180 / Math.PI;
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case 'sqrt':
        result = Math.sqrt(inputValue);
        break;
      case 'square':
        result = inputValue * inputValue;
        break;
      case 'cube':
        result = inputValue * inputValue * inputValue;
        break;
      case '1/x':
        result = 1 / inputValue;
        break;
      case 'exp':
        result = Math.exp(inputValue);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case 'factorial':
        result = factorial(inputValue);
        break;
      case 'percent':
        result = inputValue / 100;
        break;
      default:
        result = inputValue;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const memoryOperation = (operation) => {
    const currentValue = parseFloat(display);

    switch (operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        break;
      case 'MS':
        setMemory(currentValue);
        break;
      case 'M+':
        setMemory(memory + currentValue);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        break;
    }
  };

  const buttonClass = "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-3 rounded transition-colors text-sm";
  const scientificButtonClass = "bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-100 font-semibold py-2 px-3 rounded transition-colors text-sm";

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          ← Back to Home
        </Link>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Scientific Calculator</h2>
      </div>

      <div className="mb-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-right text-2xl font-mono text-gray-800 dark:text-white min-h-[3rem] flex items-center justify-end">
          {display}
        </div>
        <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
          Memory: {memory}
        </div>
      </div>

      {/* Memory Functions */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <button onClick={() => memoryOperation('MC')} className={buttonClass}>MC</button>
        <button onClick={() => memoryOperation('MR')} className={buttonClass}>MR</button>
        <button onClick={() => memoryOperation('MS')} className={buttonClass}>MS</button>
        <button onClick={() => memoryOperation('M+')} className={buttonClass}>M+</button>
        <button onClick={() => memoryOperation('M-')} className={buttonClass}>M-</button>
      </div>

      {/* Scientific Functions Row 1 */}
      <div className="grid grid-cols-6 gap-2 mb-2">
        <button onClick={() => scientificOperation('sin')} className={scientificButtonClass}>sin</button>
        <button onClick={() => scientificOperation('cos')} className={scientificButtonClass}>cos</button>
        <button onClick={() => scientificOperation('tan')} className={scientificButtonClass}>tan</button>
        <button onClick={() => scientificOperation('log')} className={scientificButtonClass}>log</button>
        <button onClick={() => scientificOperation('ln')} className={scientificButtonClass}>ln</button>
        <button onClick={() => scientificOperation('sqrt')} className={scientificButtonClass}>√</button>
      </div>

      {/* Scientific Functions Row 2 */}
      <div className="grid grid-cols-6 gap-2 mb-2">
        <button onClick={() => scientificOperation('asin')} className={scientificButtonClass}>asin</button>
        <button onClick={() => scientificOperation('acos')} className={scientificButtonClass}>acos</button>
        <button onClick={() => scientificOperation('atan')} className={scientificButtonClass}>atan</button>
        <button onClick={() => scientificOperation('square')} className={scientificButtonClass}>x²</button>
        <button onClick={() => scientificOperation('cube')} className={scientificButtonClass}>x³</button>
        <button onClick={() => scientificOperation('1/x')} className={scientificButtonClass}>1/x</button>
      </div>

      {/* Scientific Functions Row 3 */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        <button onClick={() => scientificOperation('exp')} className={scientificButtonClass}>exp</button>
        <button onClick={() => scientificOperation('pi')} className={scientificButtonClass}>π</button>
        <button onClick={() => scientificOperation('e')} className={scientificButtonClass}>e</button>
        <button onClick={() => scientificOperation('factorial')} className={scientificButtonClass}>n!</button>
        <button onClick={() => scientificOperation('percent')} className={scientificButtonClass}>%</button>
        <button onClick={clearAll} className={`${buttonClass} bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700`}>C</button>
      </div>

      {/* Basic Calculator */}
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

export default ScientificCalc;
