import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LengthWeightConverter = () => {
  const [activeCategory, setActiveCategory] = useState('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [convertedValue, setConvertedValue] = useState('');
  const [comparisonMode, setComparisonMode] = useState(false);

  // Length units (base: meters)
  const lengthUnits = {
    // Metric
    millimeters: { name: 'Millimeters', symbol: 'mm', factor: 0.001 },
    centimeters: { name: 'Centimeters', symbol: 'cm', factor: 0.01 },
    meters: { name: 'Meters', symbol: 'm', factor: 1 },
    kilometers: { name: 'Kilometers', symbol: 'km', factor: 1000 },
    // Imperial/US
    inches: { name: 'Inches', symbol: 'in', factor: 0.0254 },
    feet: { name: 'Feet', symbol: 'ft', factor: 0.3048 },
    yards: { name: 'Yards', symbol: 'yd', factor: 0.9144 },
    miles: { name: 'Miles', symbol: 'mi', factor: 1609.344 },
    // Nautical
    nautical_miles: { name: 'Nautical Miles', symbol: 'nmi', factor: 1852 },
    // Historical
    light_years: { name: 'Light Years', symbol: 'ly', factor: 9460730472580800 },
    parsecs: { name: 'Parsecs', symbol: 'pc', factor: 30856775814913673 }
  };

  // Weight/Mass units (base: grams)
  const weightUnits = {
    // Metric
    milligrams: { name: 'Milligrams', symbol: 'mg', factor: 0.001 },
    grams: { name: 'Grams', symbol: 'g', factor: 1 },
    kilograms: { name: 'Kilograms', symbol: 'kg', factor: 1000 },
    metric_tons: { name: 'Metric Tons', symbol: 't', factor: 1000000 },
    // Imperial/US
    ounces: { name: 'Ounces', symbol: 'oz', factor: 28.3495 },
    pounds: { name: 'Pounds', symbol: 'lb', factor: 453.592 },
    stones: { name: 'Stones', symbol: 'st', factor: 6350.29 },
    short_tons: { name: 'Short Tons (US)', symbol: 'ton', factor: 907184.74 },
    long_tons: { name: 'Long Tons (UK)', symbol: 'ton', factor: 1016046.91 },
    // Precious metals
    carats: { name: 'Carats', symbol: 'ct', factor: 0.2 },
    troy_ounces: { name: 'Troy Ounces', symbol: 'oz t', factor: 31.1035 }
  };

  // Area units (base: square meters)
  const areaUnits = {
    // Metric
    square_millimeters: { name: 'Square Millimeters', symbol: 'mm²', factor: 0.000001 },
    square_centimeters: { name: 'Square Centimeters', symbol: 'cm²', factor: 0.0001 },
    square_meters: { name: 'Square Meters', symbol: 'm²', factor: 1 },
    square_kilometers: { name: 'Square Kilometers', symbol: 'km²', factor: 1000000 },
    hectares: { name: 'Hectares', symbol: 'ha', factor: 10000 },
    // Imperial/US
    square_inches: { name: 'Square Inches', symbol: 'in²', factor: 0.00064516 },
    square_feet: { name: 'Square Feet', symbol: 'ft²', factor: 0.092903 },
    square_yards: { name: 'Square Yards', symbol: 'yd²', factor: 0.836127 },
    acres: { name: 'Acres', symbol: 'ac', factor: 4046.86 },
    square_miles: { name: 'Square Miles', symbol: 'mi²', factor: 2589988.11 }
  };

  // Volume units (base: liters)
  const volumeUnits = {
    // Metric
    milliliters: { name: 'Milliliters', symbol: 'mL', factor: 0.001 },
    liters: { name: 'Liters', symbol: 'L', factor: 1 },
    cubic_meters: { name: 'Cubic Meters', symbol: 'm³', factor: 1000 },
    // Imperial/US
    fluid_ounces_us: { name: 'Fluid Ounces (US)', symbol: 'fl oz', factor: 0.0295735 },
    cups_us: { name: 'Cups (US)', symbol: 'cup', factor: 0.236588 },
    pints_us: { name: 'Pints (US)', symbol: 'pt', factor: 0.473176 },
    quarts_us: { name: 'Quarts (US)', symbol: 'qt', factor: 0.946353 },
    gallons_us: { name: 'Gallons (US)', symbol: 'gal', factor: 3.78541 },
    cubic_feet: { name: 'Cubic Feet', symbol: 'ft³', factor: 28.3168 },
    cubic_inches: { name: 'Cubic Inches', symbol: 'in³', factor: 0.0163871 },
    // UK
    fluid_ounces_uk: { name: 'Fluid Ounces (UK)', symbol: 'fl oz', factor: 0.0284131 },
    pints_uk: { name: 'Pints (UK)', symbol: 'pt', factor: 0.568261 },
    gallons_uk: { name: 'Gallons (UK)', symbol: 'gal', factor: 4.54609 }
  };

  // Get current units based on category
  const getCurrentUnits = () => {
    switch (activeCategory) {
      case 'length': return lengthUnits;
      case 'weight': return weightUnits;
      case 'area': return areaUnits;
      case 'volume': return volumeUnits;
      default: return lengthUnits;
    }
  };

  // Get base unit for each category
  const getBaseUnit = () => {
    switch (activeCategory) {
      case 'length': return 'meters';
      case 'weight': return 'grams';
      case 'area': return 'square_meters';
      case 'volume': return 'liters';
      default: return 'meters';
    }
  };

  // Get default units for each category
  const getDefaultUnits = () => {
    switch (activeCategory) {
      case 'length': return { from: 'meters', to: 'feet' };
      case 'weight': return { from: 'kilograms', to: 'pounds' };
      case 'area': return { from: 'square_meters', to: 'square_feet' };
      case 'volume': return { from: 'liters', to: 'gallons_us' };
      default: return { from: 'meters', to: 'feet' };
    }
  };

  useEffect(() => {
    // Reset units when category changes
    const defaults = getDefaultUnits();
    setFromUnit(defaults.from);
    setToUnit(defaults.to);
    convertUnits();
  }, [activeCategory]);

  useEffect(() => {
    convertUnits();
  }, [inputValue, fromUnit, toUnit]);

  const convertUnits = () => {
    if (!inputValue) return;

    const value = parseFloat(inputValue);
    const units = getCurrentUnits();
    const baseUnit = getBaseUnit();

    // Convert to base unit first
    const baseValue = value * units[fromUnit].factor;

    // Convert from base unit to target unit
    const result = baseValue / units[toUnit].factor;

    setConvertedValue(result.toFixed(6));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getComparisonValues = () => {
    if (!inputValue) return [];

    const value = parseFloat(inputValue);
    const units = getCurrentUnits();
    const baseUnit = getBaseUnit();

    return Object.entries(units).slice(0, 8).map(([key, unit]) => {
      const baseValue = value * units[fromUnit].factor;
      const result = baseValue / unit.factor;

      return {
        unit: key,
        value: result.toFixed(3),
        info: unit
      };
    });
  };

  const categories = [
    { id: 'length', label: 'Length', icon: '📏', description: 'Distance measurements' },
    { id: 'weight', label: 'Weight/Mass', icon: '⚖️', description: 'Mass measurements' },
    { id: 'area', label: 'Area', icon: '📐', description: 'Surface measurements' },
    { id: 'volume', label: 'Volume', icon: '🧊', description: 'Capacity measurements' }
  ];

  const popularConversions = {
    length: [
      { from: 'meters', to: 'feet', label: 'm to ft' },
      { from: 'kilometers', to: 'miles', label: 'km to mi' },
      { from: 'inches', to: 'centimeters', label: 'in to cm' },
      { from: 'feet', to: 'meters', label: 'ft to m' }
    ],
    weight: [
      { from: 'kilograms', to: 'pounds', label: 'kg to lb' },
      { from: 'grams', to: 'ounces', label: 'g to oz' },
      { from: 'pounds', to: 'kilograms', label: 'lb to kg' },
      { from: 'ounces', to: 'grams', label: 'oz to g' }
    ],
    area: [
      { from: 'square_meters', to: 'square_feet', label: 'm² to ft²' },
      { from: 'hectares', to: 'acres', label: 'ha to ac' },
      { from: 'square_kilometers', to: 'square_miles', label: 'km² to mi²' },
      { from: 'acres', to: 'hectares', label: 'ac to ha' }
    ],
    volume: [
      { from: 'liters', to: 'gallons_us', label: 'L to gal' },
      { from: 'cubic_meters', to: 'cubic_feet', label: 'm³ to ft³' },
      { from: 'milliliters', to: 'fluid_ounces_us', label: 'mL to fl oz' },
      { from: 'gallons_us', to: 'liters', label: 'gal to L' }
    ]
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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Advanced Unit Converter</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Select Category
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      activeCategory === category.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="font-medium text-gray-800 dark:text-white">{category.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{category.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion Input */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Unit Conversion
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
                      placeholder="1"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {Object.entries(getCurrentUnits()).map(([key, unit]) => (
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
                      {Object.entries(getCurrentUnits()).map(([key, unit]) => (
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {popularConversions[activeCategory].map((conv, index) => (
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
                      {inputValue} {getCurrentUnits()[fromUnit].symbol}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {getCurrentUnits()[fromUnit].name}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {convertedValue} {getCurrentUnits()[toUnit].symbol}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {getCurrentUnits()[toUnit].name}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-green-700 dark:text-green-300">
                  <p>Category: {categories.find(cat => cat.id === activeCategory)?.label}</p>
                  <p>Base Unit: {getCurrentUnits()[getBaseUnit()].name}</p>
                </div>
              </div>
            )}

            {/* Reference Values */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                Common Reference Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCategory === 'length' && (
                  <>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Human Height
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        1.7 m
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 5.6 feet
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Football Field
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        100 m
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 328 feet
                      </div>
                    </div>
                  </>
                )}
                {activeCategory === 'weight' && (
                  <>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Adult Human
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        70 kg
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 154 pounds
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Car
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        1500 kg
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 3307 pounds
                      </div>
                    </div>
                  </>
                )}
                {activeCategory === 'area' && (
                  <>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Basketball Court
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        420 m²
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 4520 ft²
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Football Field
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        7140 m²
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 76800 ft²
                      </div>
                    </div>
                  </>
                )}
                {activeCategory === 'volume' && (
                  <>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Water Bottle
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        0.5 L
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 16.9 fl oz
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        Bathtub
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        150 L
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        ≈ 39.6 gallons
                      </div>
                    </div>
                  </>
                )}
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
                    {getCurrentUnits()[fromUnit].name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Symbol: {getCurrentUnits()[fromUnit].symbol}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Factor: {getCurrentUnits()[fromUnit].factor} × {getCurrentUnits()[getBaseUnit()].name}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {getCurrentUnits()[toUnit].name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Symbol: {getCurrentUnits()[toUnit].symbol}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Factor: {getCurrentUnits()[toUnit].factor} × {getCurrentUnits()[getBaseUnit()].name}
                  </p>
                </div>
              </div>
            </div>

            {/* Unit Systems */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Unit Systems
              </h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                    Metric System (SI)
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Used worldwide for scientific purposes
                  </div>
                  <div className="text-xs text-blue-500 dark:text-blue-500">
                    Base units: meter, gram, liter
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                    Imperial System
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Traditional British system
                  </div>
                  <div className="text-xs text-blue-500 dark:text-blue-500">
                    Base units: foot, pound, gallon
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                    US Customary
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Modified version of imperial system
                  </div>
                  <div className="text-xs text-blue-500 dark:text-blue-500">
                    Used in United States
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Mode */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Unit Comparison
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      {comparison.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {comparison.info.symbol}
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
            Understanding Unit Conversion
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Conversion Formula</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">
                Target Value = Input Value × (From Factor ÷ To Factor)
              </p>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Concepts</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Base Unit:</strong> Reference unit for conversions</li>
                <li>• <strong>Conversion Factor:</strong> Multiplier to convert to base unit</li>
                <li>• <strong>Precision:</strong> Results shown with 6 decimal places</li>
                <li>• <strong>Consistency:</strong> All conversions use the same base unit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Common Applications</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Construction:</strong> Length and area measurements</li>
                <li>• <strong>Cooking:</strong> Weight and volume conversions</li>
                <li>• <strong>Travel:</strong> Distance and fuel consumption</li>
                <li>• <strong>Science:</strong> Precise unit conversions</li>
                <li>• <strong>Commerce:</strong> Weight and volume for trade</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LengthWeightConverter;
