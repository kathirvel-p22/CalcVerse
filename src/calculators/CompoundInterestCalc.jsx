import { useState } from 'react';
import { Link } from 'react-router-dom';

const CompoundInterestCalc = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');
  const [regularContribution, setRegularContribution] = useState('');
  const [contributionFrequency, setContributionFrequency] = useState('12');
  const [inflationRate, setInflationRate] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [result, setResult] = useState(null);

  const compoundingOptions = [
    { value: '365', label: 'Daily' },
    { value: '12', label: 'Monthly' },
    { value: '4', label: 'Quarterly' },
    { value: '2', label: 'Semi-Annually' },
    { value: '1', label: 'Annually' }
  ];

  const calculateCompoundInterest = () => {
    if (!principal || !rate || !time) return;

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseInt(compoundingFrequency);
    const PMT = regularContribution ? parseFloat(regularContribution) : 0;
    const contributionFreq = parseInt(contributionFrequency);

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundAmount = P * Math.pow(1 + r / n, n * t);
    const totalContributions = PMT * (contributionFreq * t);
    const futureValue = compoundAmount + totalContributions;
    const totalInterest = futureValue - P - totalContributions;

    // Calculate with regular contributions using future value of annuity formula
    let fvAnnuity = 0;
    if (PMT > 0) {
      const annuityRate = r / contributionFreq;
      const annuityPeriods = contributionFreq * t;
      fvAnnuity = PMT * (Math.pow(1 + annuityRate, annuityPeriods) - 1) / annuityRate;
    }

    const finalAmount = compoundAmount + fvAnnuity;
    const totalInvested = P + totalContributions;
    const totalEarnings = finalAmount - totalInvested;

    // Inflation adjustment
    let realReturn = finalAmount;
    if (inflationRate) {
      const inflation = parseFloat(inflationRate) / 100;
      realReturn = finalAmount / Math.pow(1 + inflation, t);
    }

    // Tax calculation
    let afterTaxAmount = finalAmount;
    if (taxRate) {
      const tax = parseFloat(taxRate) / 100;
      const taxableInterest = totalEarnings;
      afterTaxAmount = finalAmount - (taxableInterest * tax);
    }

    // Goal-based calculation (how much to invest to reach target)
    let requiredPrincipal = 0;
    let requiredContribution = 0;
    if (targetAmount) {
      const target = parseFloat(targetAmount);
      // For lump sum
      requiredPrincipal = target / Math.pow(1 + r / n, n * t);

      // For regular contributions
      if (contributionFreq > 0) {
        const annuityRate = r / contributionFreq;
        const annuityPeriods = contributionFreq * t;
        requiredContribution = target / ((Math.pow(1 + annuityRate, annuityPeriods) - 1) / annuityRate);
      }
    }

    // Generate year-by-year breakdown
    const yearlyBreakdown = [];
    let currentPrincipal = P;
    let cumulativeContributions = 0;

    for (let year = 1; year <= Math.min(t, 30); year++) {
      const yearStartPrincipal = currentPrincipal;
      const yearEndPrincipal = yearStartPrincipal * Math.pow(1 + r / n, n);
      const yearInterest = yearEndPrincipal - yearStartPrincipal;

      // Add regular contributions for the year
      const yearContributions = PMT * contributionFreq;
      cumulativeContributions += yearContributions;

      currentPrincipal = yearEndPrincipal + yearContributions;

      yearlyBreakdown.push({
        year,
        startingBalance: yearStartPrincipal.toFixed(2),
        contributions: yearContributions.toFixed(2),
        interest: yearInterest.toFixed(2),
        endingBalance: currentPrincipal.toFixed(2),
        cumulativeContributions: cumulativeContributions.toFixed(2)
      });
    }

    // Investment scenarios comparison
    const scenarios = [
      {
        name: 'Conservative (6%)',
        rate: 0.06,
        amount: P * Math.pow(1 + 0.06 / n, n * t) + (fvAnnuity * (0.06 / r) * r / 0.06)
      },
      {
        name: 'Moderate (8%)',
        rate: 0.08,
        amount: P * Math.pow(1 + 0.08 / n, n * t) + (fvAnnuity * (0.08 / r) * r / 0.08)
      },
      {
        name: 'Aggressive (12%)',
        rate: 0.12,
        amount: P * Math.pow(1 + 0.12 / n, n * t) + (fvAnnuity * (0.12 / r) * r / 0.12)
      }
    ];

    setResult({
      finalAmount: finalAmount.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      totalEarnings: totalEarnings.toFixed(2),
      compoundAmount: compoundAmount.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      realReturn: realReturn.toFixed(2),
      afterTaxAmount: afterTaxAmount.toFixed(2),
      requiredPrincipal: requiredPrincipal.toFixed(2),
      requiredContribution: requiredContribution.toFixed(2),
      yearlyBreakdown,
      scenarios,
      effectiveRate: (Math.pow(1 + r / n, n) - 1) * 100
    });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundingFrequency('12');
    setRegularContribution('');
    setContributionFrequency('12');
    setInflationRate('');
    setTaxRate('');
    setTargetAmount('');
    setResult(null);
  };

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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Advanced Compound Interest Calculator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Investment Details</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Initial Investment (₹)
                  </label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="100000"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="8.5"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {compoundingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Regular Contribution (₹)
                  </label>
                  <input
                    type="number"
                    value={regularContribution}
                    onChange={(e) => setRegularContribution(e.target.value)}
                    placeholder="5000"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contribution Frequency
                  </label>
                  <select
                    value={contributionFrequency}
                    onChange={(e) => setContributionFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {compoundingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    placeholder="3.0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    placeholder="20"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="1000000"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateCompoundInterest}
                  disabled={!principal || !rate || !time}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate Growth
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Main Results */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
                    Investment Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{result.finalAmount}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">Future Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{result.totalEarnings}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">Total Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{result.totalInvested}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">Total Invested</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {result.effectiveRate.toFixed(2)}%
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">Effective Rate</div>
                    </div>
                  </div>
                </div>

                {/* Goal Achievement */}
                {targetAmount && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
                      Goal Achievement
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                          ₹{result.requiredPrincipal}
                        </div>
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">Lump Sum Needed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                          ₹{result.requiredContribution}
                        </div>
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">Monthly Contribution</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Real Returns */}
                {(inflationRate || taxRate) && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">
                      Real Returns
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {inflationRate && (
                        <div className="text-center">
                          <div className="text-xl font-bold text-red-600 dark:text-red-400">
                            ₹{result.realReturn}
                          </div>
                          <div className="text-sm text-red-600 dark:text-red-400">Inflation Adjusted</div>
                        </div>
                      )}
                      {taxRate && (
                        <div className="text-center">
                          <div className="text-xl font-bold text-red-600 dark:text-red-400">
                            ₹{result.afterTaxAmount}
                          </div>
                          <div className="text-sm text-red-600 dark:text-red-400">After Tax</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Investment Scenarios */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">
                    Scenario Comparison
                  </h3>
                  <div className="space-y-3">
                    {result.scenarios.map((scenario, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded">
                        <span className="font-medium text-indigo-700 dark:text-indigo-300">{scenario.name}</span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          ₹{scenario.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Yearly Breakdown Table */}
        {result && result.yearlyBreakdown.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Year-by-Year Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600">
                    <th className="px-4 py-2 text-left">Year</th>
                    <th className="px-4 py-2 text-right">Starting Balance</th>
                    <th className="px-4 py-2 text-right">Contributions</th>
                    <th className="px-4 py-2 text-right">Interest Earned</th>
                    <th className="px-4 py-2 text-right">Ending Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-600">
                      <td className="px-4 py-2">{row.year}</td>
                      <td className="px-4 py-2 text-right">₹{row.startingBalance}</td>
                      <td className="px-4 py-2 text-right">₹{row.contributions}</td>
                      <td className="px-4 py-2 text-right">₹{row.interest}</td>
                      <td className="px-4 py-2 text-right font-medium">₹{row.endingBalance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            Understanding Compound Interest
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">The Power of Compounding</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Compound interest is the interest you earn on both your original investment and the interest you've already earned.
                This creates a snowball effect where your money grows exponentially over time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Factors</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Time:</strong> The longer you invest, the more compound interest works for you</li>
                <li>• <strong>Rate:</strong> Higher interest rates accelerate growth</li>
                <li>• <strong>Frequency:</strong> More frequent compounding increases returns</li>
                <li>• <strong>Contributions:</strong> Regular additions boost your investment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalc;
