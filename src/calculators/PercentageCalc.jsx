nimport { useState } from 'react';
import { Link } from 'react-router-dom';

const PercentageCalc = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [result, setResult] = useState(null);

  // Basic Percentage States
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [percentage, setPercentage] = useState('');

  // Change Calculation States
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [changeType, setChangeType] = useState('increase');

  // Tax/Discount States
  const [originalPrice, setOriginalPrice] = useState('');
  const [taxDiscountRate, setTaxDiscountRate] = useState('');
  const [taxDiscountType, setTaxDiscountType] = useState('discount');

  // Grade Calculation States
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [gradeScale, setGradeScale] = useState('percentage');

  // Tip Calculation States
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [numberOfPeople, setNumberOfPeople] = useState('1');

  // Profit Margin States
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [desiredMargin, setDesiredMargin] = useState('');

  const calculateBasicPercentage = () => {
    if (!value1 || !percentage) return;

    const val1 = parseFloat(value1);
    const perc = parseFloat(percentage);

    const result = (val1 * perc) / 100;
    const ofResult = perc;
    const isResult = (val1 / result) * 100;

    setResult({
      type: 'basic',
      calculations: [
        { label: `${perc}% of ${val1}`, value: result.toFixed(2) },
        { label: `${val1} is what % of ${result}`, value: `${isResult.toFixed(2)}%` },
        { label: `What is ${perc}% of ${val1}`, value: result.toFixed(2) }
      ]
    });
  };

  const calculatePercentageChange = () => {
    if (!originalValue || !newValue) return;

    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);

    const difference = newVal - original;
    const percentageChange = (difference / original) * 100;
    const multiplier = newVal / original;

    setResult({
      type: 'change',
      calculations: [
        { label: 'Difference', value: difference.toFixed(2) },
        { label: 'Percentage Change', value: `${percentageChange.toFixed(2)}%` },
        { label: 'Multiplier', value: `${multiplier.toFixed(4)}x` },
        { label: 'Change Type', value: percentageChange >= 0 ? 'Increase' : 'Decrease' }
      ]
    });
  };

  const calculateTaxDiscount = () => {
    if (!originalPrice || !taxDiscountRate) return;

    const price = parseFloat(originalPrice);
    const rate = parseFloat(taxDiscountRate);

    const amount = (price * rate) / 100;
    const finalPrice = taxDiscountType === 'discount' ? price - amount : price + amount;

    setResult({
      type: 'taxDiscount',
      calculations: [
        { label: `${taxDiscountType === 'discount' ? 'Discount' : 'Tax'} Amount`, value: `₹${amount.toFixed(2)}` },
        { label: 'Final Price', value: `₹${finalPrice.toFixed(2)}` },
        { label: `${taxDiscountType === 'discount' ? 'Savings' : 'Total Cost'}`, value: `₹${finalPrice.toFixed(2)}` }
      ]
    });
  };

  const calculateGrade = () => {
    if (!obtainedMarks || !totalMarks) return;

    const obtained = parseFloat(obtainedMarks);
    const total = parseFloat(totalMarks);

    const percentage = (obtained / total) * 100;
    let grade = '';
    let gradePoint = 0;

    if (gradeScale === 'percentage') {
      if (percentage >= 90) grade = 'A+';
      else if (percentage >= 80) grade = 'A';
      else if (percentage >= 70) grade = 'B+';
      else if (percentage >= 60) grade = 'B';
      else if (percentage >= 50) grade = 'C';
      else if (percentage >= 40) grade = 'D';
      else grade = 'F';
    } else {
      // GPA Scale
      if (percentage >= 90) gradePoint = 4.0;
      else if (percentage >= 85) gradePoint = 3.7;
      else if (percentage >= 80) gradePoint = 3.3;
      else if (percentage >= 75) gradePoint = 3.0;
      else if (percentage >= 70) gradePoint = 2.7;
      else if (percentage >= 65) gradePoint = 2.3;
      else if (percentage >= 60) gradePoint = 2.0;
      else if (percentage >= 55) gradePoint = 1.7;
      else if (percentage >= 50) gradePoint = 1.3;
      else if (percentage >= 40) gradePoint = 1.0;
      else gradePoint = 0.0;
    }

    setResult({
      type: 'grade',
      calculations: [
        { label: 'Percentage Score', value: `${percentage.toFixed(2)}%` },
        { label: 'Grade', value: gradeScale === 'percentage' ? grade : `${gradePoint} GPA` },
        { label: 'Marks Obtained', value: `${obtained}/${total}` },
        { label: 'Performance', value: percentage >= 60 ? 'Pass' : 'Fail' }
      ]
    });
  };

  const calculateTip = () => {
    if (!billAmount) return;

    const bill = parseFloat(billAmount);
    const tipPerc = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople);

    const tipAmount = (bill * tipPerc) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;

    setResult({
      type: 'tip',
      calculations: [
        { label: 'Tip Amount', value: `₹${tipAmount.toFixed(2)}` },
        { label: 'Total Bill', value: `₹${totalAmount.toFixed(2)}` },
        { label: 'Per Person', value: `₹${perPerson.toFixed(2)}` },
        { label: 'Tip Percentage', value: `${tipPerc}%` }
      ]
    });
  };

  const calculateProfitMargin = () => {
    if (!costPrice || !sellingPrice) return;

    const cost = parseFloat(costPrice);
    const selling = parseFloat(sellingPrice);

    const profit = selling - cost;
    const profitMargin = (profit / selling) * 100;
    const markup = (profit / cost) * 100;

    setResult({
      type: 'profit',
      calculations: [
        { label: 'Profit Amount', value: `₹${profit.toFixed(2)}` },
        { label: 'Profit Margin', value: `${profitMargin.toFixed(2)}%` },
        { label: 'Markup Percentage', value: `${markup.toFixed(2)}%` },
        { label: 'Cost Price', value: `₹${cost.toFixed(2)}` },
        { label: 'Selling Price', value: `₹${selling.toFixed(2)}` }
      ]
    });
  };

  const reset = () => {
    setValue1('');
    setValue2('');
    setPercentage('');
    setOriginalValue('');
    setNewValue('');
    setOriginalPrice('');
    setTaxDiscountRate('');
    setObtainedMarks('');
    setTotalMarks('');
    setBillAmount('');
    setTipPercentage('15');
    setNumberOfPeople('1');
    setCostPrice('');
    setSellingPrice('');
    setDesiredMargin('');
    setResult(null);
  };

  const tabs = [
    { id: 'basic', label: 'Basic %', icon: '%' },
    { id: 'change', label: '% Change', icon: '📈' },
    { id: 'tax', label: 'Tax/Discount', icon: '💰' },
    { id: 'grade', label: 'Grade Calc', icon: '📚' },
    { id: 'tip', label: 'Tip Calc', icon: '🧾' },
    { id: 'profit', label: 'Profit Margin', icon: '💼' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            ← Back to Home
          </Link>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Advanced Percentage Calculator</h2>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Value
                </label>
                <input
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Percentage (%)
                </label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="20"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateBasicPercentage}
                  disabled={!value1 || !percentage}
                  className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate
                </button>
              </div>
            </div>
          )}

          {activeTab === 'change' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Value
                </label>
                <input
                  type="number"
                  value={originalValue}
                  onChange={(e) => setOriginalValue(e.target.value)}
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Value
                </label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="120"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculatePercentageChange}
                  disabled={!originalValue || !newValue}
                  className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate Change
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rate (%)
                </label>
                <input
                  type="number"
                  value={taxDiscountRate}
                  onChange={(e) => setTaxDiscountRate(e.target.value)}
                  placeholder="18"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={taxDiscountType}
                  onChange={(e) => setTaxDiscountType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="discount">Discount</option>
                  <option value="tax">Tax</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateTaxDiscount}
                  disabled={!originalPrice || !taxDiscountRate}
                  className="w-full px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate
                </button>
              </div>
            </div>
          )}

          {activeTab === 'grade' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marks Obtained
                </label>
                <input
                  type="number"
                  value={obtainedMarks}
                  onChange={(e) => setObtainedMarks(e.target.value)}
                  placeholder="85"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Marks
                </label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grade Scale
                </label>
                <select
                  value={gradeScale}
                  onChange={(e) => setGradeScale(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="percentage">Percentage</option>
                  <option value="gpa">GPA</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateGrade}
                  disabled={!obtainedMarks || !totalMarks}
                  className="w-full px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate Grade
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tip' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bill Amount (₹)
                </label>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tip Percentage (%)
                </label>
                <select
                  value={tipPercentage}
                  onChange={(e) => setTipPercentage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="18">18%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of People
                </label>
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  placeholder="1"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateTip}
                  disabled={!billAmount}
                  className="w-full px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate Tip
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profit' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cost Price (₹)
                </label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="800"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateProfitMargin}
                  disabled={!costPrice || !sellingPrice}
                  className="w-full px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate Margin
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Calculation Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.calculations.map((calc, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {calc.label}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {calc.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            Understanding Percentages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Basic Percentage Formula</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">
                Percentage = (Part / Whole) × 100
              </p>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Common Applications</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>What is X% of Y:</strong> (X/100) × Y</li>
                <li>• <strong>X is what % of Y:</strong> (X/Y) × 100</li>
                <li>• <strong>Percentage Change:</strong> ((New - Old)/Old) × 100</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Real-World Uses</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Finance:</strong> Interest rates, discounts, profit margins</li>
                <li>• <strong>Education:</strong> Grade calculations, GPA conversion</li>
                <li>• <strong>Business:</strong> Tax calculations, markup pricing</li>
                <li>• <strong>Daily Life:</strong> Tips, sales tax, percentage changes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset All Calculations
          </button>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalc;
