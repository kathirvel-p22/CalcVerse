import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [convertedValue, setConvertedValue] = useState('');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonUnits, setComparisonUnits] = useState(['fahrenheit', 'kelvin', 'rankine']);

  // Temperature conversion formulas
  const temperatureUnits = {
    celsius: {
      name: 'Celsius',
      symbol: '°C',
      toCelsius: (value) => value,
      fromCelsius: (value) => value,
      description: 'Standard metric temperature scale',
      freezing: 0,
      boiling: 100
    },
    fahrenheit: {
      name: 'Fahrenheit',
      symbol: '°F',
      toCelsius: (value) => (value - 32) * 5/9,
      fromCelsius: (value) => (value * 9/5) + 32,
      description: 'Commonly used in the United States',
      freezing: 32,
      boiling: 212
    },
    kelvin: {
      name: 'Kelvin',
      symbol: 'K',
      toCelsius: (value) => value - 273.15,
      fromCelsius: (value) => value + 273.15,
      description: 'Absolute temperature scale used in science',
      freezing: 273.15,
      boiling: 373.15
    },
    rankine: {
      name: 'Rankine',
      symbol: '°R',
      toCelsius: (value) => (value - 491.67) * 5/9,
      fromCelsius: (value) => (value * 9/5) + 491.67,
      description: 'Absolute temperature scale (Fahrenheit-based)',
      freezing: 491.67,
      boiling: 671.67
    },
    reaumur: {
      name: 'Réaumur',
      symbol: '°Ré',
      toCelsius: (value) => value * 5/4,
      fromCelsius: (value) => value * 4/5,
      description: 'Historical French temperature scale',
      freezing: 0,
      boiling: 80
    },
    delisle: {
      name: 'Delisle',
      symbol: '°De',
      toCelsius: (value) => 100 - (value * 2/3),
      fromCelsius: (value) => (100 - value) * 3/2,
      description: 'Historical temperature scale',
      freezing: 150,
      boiling: 0
    },
    newton: {
      name: 'Newton',
      symbol: '°N',
      toCelsius: (value) => value * 100/33,
      fromCelsius: (value) => value * 33/100,
      description: 'Historical temperature scale',
      freezing: 0,
      boiling: 33
    },
    romer: {
      name: 'Rømer',
      symbol: '°Rø',
      toCelsius: (value) => (value - 7.5) * 40/21,
      fromCelsius: (value) => (value * 21/40) + 7.5,
      description: 'Historical Danish temperature scale',
      freezing: 7.5,
      boiling: 60
    }
  };

  // Notable temperatures
  const notableTemperatures = [
    { name: 'Absolute Zero', celsius: -273.15, description: 'Coldest possible temperature' },
    { name: 'Liquid Nitrogen', celsius: -196, description: 'Boiling point of liquid nitrogen' },
    { name: 'Dry Ice', celsius: -78.5, description: 'Sublimation point of dry ice' },
    { name: 'Freezing Water', celsius: 0, description: 'Freezing point of water' },
    { name: 'Body Temperature', celsius: 37, description: 'Average human body temperature' },
    { name: 'Boiling Water', celsius: 100, description: 'Boiling point of water at sea level' },
    { name: 'Surface of Sun', celsius: 5778, description: 'Average temperature of sun\'s surface' },
    { name: 'Lightning', celsius: 27700, description: 'Temperature of lightning bolt' },
    { name: 'Nuclear Explosion', celsius: 10000000, description: 'Temperature at center of nuclear explosion' }
  ];

  // Weather temperature ranges
  const weatherRanges = {
    arctic: { min: -60, max: 10, description: 'Arctic regions' },
    temperate: { min: -10, max: 30, description: 'Temperate climates' },
    tropical: { min: 20, max: 40, description: 'Tropical regions' },
    desert: { min: 10, max: 50, description: 'Desert regions' },
    polar: { min: -80, max: 0, description: 'Polar regions' }
  };

  useEffect(() => {
    convertTemperature();
  }, [inputValue, fromUnit, toUnit]);

  const convertTemperature = () => {
    if (!inputValue) return;

    const value = parseFloat(inputValue);

    // Convert to Celsius first
    const celsiusValue = temperatureUnits[fromUnit].toCelsius(value);

    // Convert from Celsius to target unit
    const result = temperatureUnits[toUnit].fromCelsius(celsiusValue);

    setConvertedValue(result.toFixed(6));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getComparisonValues = () => {
    if (!inputValue) return [];

    const value = parseFloat(inputValue);
    const celsiusValue = temperatureUnits[fromUnit].toCelsius(value);

    return comparisonUnits.map(unit => ({
      unit,
      value: temperatureUnits[unit].fromCelsius(celsiusValue).toFixed(2),
      info: temperatureUnits[unit]
    }));
  };

  const getTemperatureCategory = (celsius) => {
    if (celsius <= -40) return { category: 'Extreme Cold', color: 'blue', risk: 'High' };
    if (celsius <= 0) return { category: 'Very Cold', color: 'blue', risk: 'Medium' };
    if (celsius <= 15) return { category: 'Cold', color: 'blue', risk: 'Low' };
    if (celsius <= 25) return { category: 'Comfortable', color: 'green', risk: 'None' };
    if (celsius <= 35) return { category: 'Warm', color: 'yellow', risk: 'Low' };
    if (celsius <= 45) return { category: 'Hot', color: 'orange', risk: 'Medium' };
    return { category: 'Extreme Heat', color: 'red', risk: 'High' };
  };

  const popularConversions = [
    { from: 'celsius', to: 'fahrenheit', label: '°C to °F' },
    { from: 'fahrenheit', to: 'celsius', label: '°F to °C' },
    { from: 'celsius', to: 'kelvin', label: '°C to K' },
    { from: 'kelvin', to: 'celsius', label: 'K to °C' },
    { from: 'fahrenheit', to: 'kelvin', label: '°F to K' },
    { from: 'kelvin', to: 'fahrenheit', label: 'K to °F' }
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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Advanced Temperature Converter</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Temperature Conversion
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="0"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {Object.entries(temperatureUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.symbol} - {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={swapUnits}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    ⇄
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={convertedValue}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {Object.entries(temperatureUnits).map(([key, unit]) => (
                        <option key={key} value={key}>
                          {unit.symbol} - {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Popular Conversions */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Popular Conversions
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {popularConversions.map((conv, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setFromUnit(conv.from);
                        setToUnit(conv.to);
                      }}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors text-sm"
                    >
                      {conv.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Section */}
            {convertedValue && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
                  Conversion Result
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {inputValue} {temperatureUnits[fromUnit].symbol}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {temperatureUnits[fromUnit].name}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {convertedValue} {temperatureUnits[toUnit].symbol}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {temperatureUnits[toUnit].name}
                    </div>
                  </div>
                </div>

                {/* Temperature Category */}
                <div className="mt-4 text-center">
                  {(() => {
                    const celsiusValue = temperatureUnits[fromUnit].toCelsius(parseFloat(inputValue));
                    const category = getTemperatureCategory(celsiusValue);
                    return (
                      <div className={`inline-block px-4 py-2 rounded-lg bg-${category.color}-100 dark:bg-${category.color}-900/20`}>
                        <div className={`text-${category.color}-800 dark:text-${category.color}-200 font-medium`}>
                          {category.category}
                        </div>
                        <div className={`text-sm text-${category.color}-600 dark:text-${category.color}-400`}>
                          Risk Level: {category.risk}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Notable Temperatures */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                Notable Temperatures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notableTemperatures.slice(0, 9).map((temp, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                      {temp.name}
                    </div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {temp.celsius}°C
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">
                      {temp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Unit Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Unit Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {temperatureUnits[fromUnit].name} ({temperatureUnits[fromUnit].symbol})
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {temperatureUnits[fromUnit].description}
                  </p>
                  <div className="text-sm">
                    <div>Freezing: {temperatureUnits[fromUnit].freezing}{temperatureUnits[fromUnit].symbol}</div>
                    <div>Boiling: {temperatureUnits[fromUnit].boiling}{temperatureUnits[fromUnit].symbol}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {temperatureUnits[toUnit].name} ({temperatureUnits[toUnit].symbol})
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {temperatureUnits[toUnit].description}
                  </p>
                  <div className="text-sm">
                    <div>Freezing: {temperatureUnits[toUnit].freezing}{temperatureUnits[toUnit].symbol}</div>
                    <div>Boiling: {temperatureUnits[toUnit].boiling}{temperatureUnits[toUnit].symbol}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Ranges */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Climate Temperature Ranges
              </h3>
              <div className="space-y-3">
                {Object.entries(weatherRanges).map(([climate, range]) => (
                  <div key={climate} className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <div className="font-medium text-blue-700 dark:text-blue-300 capitalize">
                      {climate}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      {range.min}°C to {range.max}°C
                    </div>
                    <div className="text-xs text-blue-500 dark:text-blue-500">
                      {range.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Mode */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Temperature Comparison
            </h3>
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              {comparisonMode ? 'Hide' : 'Show'} Comparison
            </button>
          </div>

          {comparisonMode && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Compare with scales:
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(temperatureUnits).slice(0, 6).map(unit => (
                    <button
                      key={unit}
                      onClick={() => {
                        setComparisonUnits(prev =>
                          prev.includes(unit)
                            ? prev.filter(u => u !== unit)
                            : [...prev, unit]
                        );
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        comparisonUnits.includes(unit)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {temperatureUnits[unit].symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getComparisonValues().map((comparison, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">
                        {comparison.info.symbol}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {comparison.info.name}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      {comparison.value}{comparison.info.symbol}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {comparison.info.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            Understanding Temperature Scales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Common Scales</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Celsius (°C):</strong> Standard metric scale, 0° = freezing, 100° = boiling</li>
                <li>• <strong>Fahrenheit (°F):</strong> Used in US, 32° = freezing, 212° = boiling</li>
                <li>• <strong>Kelvin (K):</strong> Absolute scale, 0K = absolute zero, used in science</li>
                <li>• <strong>Rankine (°R):</strong> Absolute scale based on Fahrenheit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Historical Scales</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Réaumur (°Ré):</strong> French scale, 0° = freezing, 80° = boiling</li>
                <li>• <strong>Delisle (°De):</strong> Swedish scale, higher numbers = colder</li>
                <li>• <strong>Newton (°N):</strong> English scale, 0° = freezing, 33° = boiling</li>
                <li>• <strong>Rømer (°Rø):</strong> Danish scale, 7.5° = freezing, 60° = boiling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
