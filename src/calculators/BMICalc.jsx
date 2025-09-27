import { useState } from 'react';
import { Link } from 'react-router-dom';

const BMICalc = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let bmi;
    let heightInMeters;
    let weightInKg;

    if (unit === 'metric') {
      heightInMeters = height / 100; // Convert cm to meters
      weightInKg = weight;
    } else {
      // Imperial: height in inches, weight in pounds
      heightInMeters = (height * 2.54) / 100; // Convert inches to meters
      weightInKg = weight * 0.453592; // Convert pounds to kg
    }

    bmi = weightInKg / (heightInMeters * heightInMeters);

    // Determine BMI category
    let category, color, risk, recommendations;
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'blue';
      risk = 'Low';
      recommendations = [
        'Increase caloric intake with nutrient-rich foods',
        'Focus on strength training to build muscle mass',
        'Consult a healthcare provider for personalized advice',
        'Consider working with a registered dietitian'
      ];
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'green';
      risk = 'Low';
      recommendations = [
        'Maintain current healthy lifestyle',
        'Continue balanced diet and regular exercise',
        'Focus on overall wellness and preventive care',
        'Regular health check-ups recommended'
      ];
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'yellow';
      risk = 'Moderate';
      recommendations = [
        'Gradual weight loss through diet and exercise',
        'Aim for 0.5-1 kg weight loss per week',
        'Increase physical activity to 150 minutes per week',
        'Focus on whole foods and portion control'
      ];
    } else {
      category = 'Obese';
      color = 'red';
      risk = 'High';
      recommendations = [
        'Consult healthcare provider for comprehensive plan',
        'Consider medical supervision for weight loss',
        'Focus on sustainable lifestyle changes',
        'May require medical intervention for health conditions'
      ];
    }

    // Calculate ideal weight range
    const idealWeightMin = 18.5 * (heightInMeters * heightInMeters);
    const idealWeightMax = 24.9 * (heightInMeters * heightInMeters);

    // Calculate body fat percentage (rough estimate)
    let bodyFatPercentage;
    if (gender === 'male') {
      bodyFatPercentage = (1.20 * bmi) + (0.23 * (age || 30)) - 16.2;
    } else {
      bodyFatPercentage = (1.20 * bmi) + (0.23 * (age || 30)) - 5.4;
    }

    // Calculate daily calorie needs (BMR using Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * (age || 30) + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * (age || 30) - 161;
    }

    // Activity levels
    const activityLevels = {
      sedentary: bmr * 1.2,
      light: bmr * 1.375,
      moderate: bmr * 1.55,
      active: bmr * 1.725,
      veryActive: bmr * 1.9
    };

    // BMI chart data for visualization
    const bmiRanges = [
      { range: 'Underweight', min: 0, max: 18.5, color: '#3B82F6' },
      { range: 'Normal', min: 18.5, max: 25, color: '#10B981' },
      { range: 'Overweight', min: 25, max: 30, color: '#F59E0B' },
      { range: 'Obese', min: 30, max: 40, color: '#EF4444' }
    ];

    setBmiResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      risk,
      recommendations,
      idealWeightMin: idealWeightMin.toFixed(1),
      idealWeightMax: idealWeightMax.toFixed(1),
      bodyFatPercentage: Math.max(0, bodyFatPercentage).toFixed(1),
      bmr: Math.round(bmr),
      activityLevels,
      bmiRanges,
      height: heightInMeters * 100,
      weight: weightInKg
    });
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setBmiResult(null);
  };

  const getBMIPosition = (bmi) => {
    const position = Math.min((bmi / 40) * 100, 100);
    return position;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Advanced BMI Calculator</h2>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height {unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? '170' : '68'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? '70' : '150'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age (optional)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Unit System
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="metric"
                checked={unit === 'metric'}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Metric (cm/kg)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="imperial"
                checked={unit === 'imperial'}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Imperial (inches/lbs)
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateBMI}
            disabled={!height || !weight}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Calculate BMI
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
      {bmiResult && (
        <div className="space-y-6">
          {/* BMI Result */}
          <div className={`bg-${bmiResult.color}-50 dark:bg-${bmiResult.color}-900/20 rounded-lg p-6`}>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Your BMI Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-4xl font-bold text-${bmiResult.color}-600 dark:text-${bmiResult.color}-400`}>
                  {bmiResult.bmi}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">BMI Score</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold text-${bmiResult.color}-600 dark:text-${bmiResult.color}-400`}>
                  {bmiResult.category}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Category</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold text-${bmiResult.color}-600 dark:text-${bmiResult.color}-400`}>
                  {bmiResult.risk}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Health Risk</div>
              </div>
            </div>
          </div>

          {/* BMI Chart */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              BMI Classification Chart
            </h3>
            <div className="relative mb-4">
              <div className="flex h-8 rounded-full overflow-hidden">
                {bmiResult.bmiRanges.map((range, index) => (
                  <div
                    key={range.range}
                    className="flex-1 relative"
                    style={{ backgroundColor: range.color }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                      {range.range}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="absolute top-0 h-8 w-1 bg-black transform -translate-x-1/2"
                style={{ left: `${getBMIPosition(parseFloat(bmiResult.bmi))}%` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                  Your BMI
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>0</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          {/* Ideal Weight Range */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
              Ideal Weight Range
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {bmiResult.idealWeightMin} {unit === 'metric' ? 'kg' : 'lbs'}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Minimum</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {bmiResult.idealWeightMax} {unit === 'metric' ? 'kg' : 'lbs'}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Maximum</div>
              </div>
            </div>
          </div>

          {/* Body Composition */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
              Body Composition Estimate
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {bmiResult.bodyFatPercentage}%
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Estimated Body Fat</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                * This is a rough estimate based on BMI and age
              </p>
            </div>
          </div>

          {/* Daily Calorie Needs */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-4">
              Daily Calorie Needs (Estimated)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {bmiResult.activityLevels.sedentary}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Sedentary</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {bmiResult.activityLevels.moderate}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Moderate</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {bmiResult.activityLevels.active}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Active</div>
              </div>
            </div>
          </div>

          {/* Health Recommendations */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              Health Recommendations
            </h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              {bmiResult.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalc;
