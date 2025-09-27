import { useState } from 'react';
import { Link } from 'react-router-dom';

const EMICalc = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [loanType, setLoanType] = useState('home');
  const [emiResult, setEmiResult] = useState(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const loanTypes = {
    home: {
      name: 'Home Loan',
      typicalRate: 8.5,
      maxTenure: 30,
      taxBenefits: true,
      description: 'For purchasing or constructing a house'
    },
    education: {
      name: 'Education Loan',
      typicalRate: 10.5,
      maxTenure: 15,
      taxBenefits: true,
      description: 'For higher education expenses'
    },
    personal: {
      name: 'Personal Loan',
      typicalRate: 12.5,
      maxTenure: 5,
      taxBenefits: false,
      description: 'For personal expenses and emergencies'
    },
    car: {
      name: 'Car Loan',
      typicalRate: 9.5,
      maxTenure: 7,
      taxBenefits: false,
      description: 'For purchasing a vehicle'
    },
    business: {
      name: 'Business Loan',
      typicalRate: 14.0,
      maxTenure: 10,
      taxBenefits: true,
      description: 'For business expansion and working capital'
    }
  };

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !loanTenure) return;

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const tenure = parseFloat(loanTenure) * 12; // Total months

    // EMI calculation formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);

    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule (first 12 months + summary)
    const amortizationSchedule = [];
    let remainingBalance = principal;
    let totalPrincipalPaid = 0;
    let totalInterestPaid = 0;

    for (let month = 1; month <= Math.min(tenure, 12); month++) {
      const interestPayment = remainingBalance * rate;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;

      totalPrincipalPaid += principalPayment;
      totalInterestPaid += interestPayment;

      amortizationSchedule.push({
        month,
        emi: emi.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, remainingBalance).toFixed(2)
      });
    }

    // Calculate prepayment scenarios
    const prepaymentScenarios = {
      fivePercent: calculatePrepayment(principal, rate, tenure, principal * 0.05),
      tenPercent: calculatePrepayment(principal, rate, tenure, principal * 0.10),
      fifteenPercent: calculatePrepayment(principal, rate, tenure, principal * 0.15)
    };

    // Calculate affordability (assuming 50% of income for EMI)
    const maxLoanAmount = (emi * 12) / (parseFloat(interestRate) / 100) * 2;

    // Tax benefits calculation (simplified)
    let taxSavings = 0;
    if (loanTypes[loanType].taxBenefits) {
      if (loanType === 'home') {
        // Home loan tax benefits (principal: 1.5L, interest: 2L)
        const principalTax = Math.min(principal * 0.02, 150000); // 2% of principal or 1.5L max
        const interestTax = Math.min(totalInterest * 0.02, 200000); // 2% of interest or 2L max
        taxSavings = principalTax + interestTax;
      } else if (loanType === 'education') {
        // Education loan interest tax deduction (up to 50,000)
        taxSavings = Math.min(totalInterest * 0.02, 50000);
      }
    }

    setEmiResult({
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanType: loanTypes[loanType],
      amortizationSchedule,
      prepaymentScenarios,
      maxAffordableLoan: maxLoanAmount.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      monthlyRate: (rate * 100).toFixed(4),
      tenureMonths: tenure
    });
  };

  const calculatePrepayment = (principal, rate, tenure, prepaymentAmount) => {
    const newPrincipal = principal - prepaymentAmount;
    const newEmi = newPrincipal * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
    const newTotalAmount = newEmi * tenure;
    const savings = (parseFloat(emiResult?.totalAmount || 0) - newTotalAmount);

    return {
      newEmi: newEmi.toFixed(2),
      newTotal: newTotalAmount.toFixed(2),
      savings: savings.toFixed(2)
    };
  };

  const reset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTenure('');
    setLoanType('home');
    setEmiResult(null);
    setShowAmortization(false);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Advanced EMI Calculator</h2>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Type
            </label>
            <select
              value={loanType}
              onChange={(e) => {
                setLoanType(e.target.value);
                setInterestRate(loanTypes[e.target.value].typicalRate);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {Object.entries(loanTypes).map(([key, type]) => (
                <option key={key} value={key}>
                  {type.name} - {type.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="500000"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder={loanTypes[loanType].typicalRate}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Tenure (years)
            </label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="20"
              max={loanTypes[loanType].maxTenure}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateEMI}
            disabled={!loanAmount || !interestRate || !loanTenure}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Calculate EMI
          </button>
          <button
            onClick={reset}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results Section */}
      {emiResult && (
        <div className="space-y-6">
          {/* Main EMI Results */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              EMI Calculation Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{emiResult.emi}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Monthly EMI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{emiResult.totalAmount}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Total Amount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{emiResult.totalInterest}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Total Interest</div>
              </div>
            </div>
            <div className="text-center text-blue-700 dark:text-blue-300">
              <p>📊 Loan Type: {emiResult.loanType.name}</p>
              <p>💰 Principal: ₹{loanAmount}</p>
              <p>📅 Tenure: {loanTenure} years ({emiResult.tenureMonths} months)</p>
            </div>
          </div>

          {/* Tax Benefits */}
          {emiResult.loanType.taxBenefits && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
                Tax Benefits
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹{emiResult.taxSavings}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Estimated Tax Savings</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  * Tax benefits are subject to current tax laws and individual circumstances
                </p>
              </div>
            </div>
          )}

          {/* Prepayment Analysis */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
              Prepayment Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  ₹{emiResult.prepaymentScenarios.fivePercent.savings}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">5% Prepayment Savings</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  New EMI: ₹{emiResult.prepaymentScenarios.fivePercent.newEmi}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  ₹{emiResult.prepaymentScenarios.tenPercent.savings}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">10% Prepayment Savings</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  New EMI: ₹{emiResult.prepaymentScenarios.tenPercent.newEmi}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  ₹{emiResult.prepaymentScenarios.fifteenPercent.savings}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">15% Prepayment Savings</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  New EMI: ₹{emiResult.prepaymentScenarios.fifteenPercent.newEmi}
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
            </button>
          </div>

          {/* Amortization Schedule */}
          {showAmortization && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Amortization Schedule (First 12 Months)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="px-4 py-2 text-left">Month</th>
                      <th className="px-4 py-2 text-right">EMI</th>
                      <th className="px-4 py-2 text-right">Principal</th>
                      <th className="px-4 py-2 text-right">Interest</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emiResult.amortizationSchedule.map((row, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-600">
                        <td className="px-4 py-2">{row.month}</td>
                        <td className="px-4 py-2 text-right">₹{row.emi}</td>
                        <td className="px-4 py-2 text-right">₹{row.principal}</td>
                        <td className="px-4 py-2 text-right">₹{row.interest}</td>
                        <td className="px-4 py-2 text-right">₹{row.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Affordability Calculator */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">
              Affordability Check
            </h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                ₹{emiResult.maxAffordableLoan}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">Maximum Affordable Loan</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                * Based on 50% of monthly income assumption
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalc;
