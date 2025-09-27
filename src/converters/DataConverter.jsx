import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataConverter = () => {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('GB');
  const [convertedValue, setConvertedValue] = useState('');
  const [activeTab, setActiveTab] = useState('storage'); // storage or transfer
  const [baseSystem, setBaseSystem] = useState('binary'); // binary (1024) or decimal (1000)
  const [comparisonMode, setComparisonMode] = useState(false);

  // Data units with conversion factors - static definitions
  const dataUnits = {
    bytes: { name: 'Bytes', symbol: 'B', factor: 1 },
    kilobytes: { name: 'Kilobytes', symbol: 'KB', factor: baseSystem === 'binary' ? 1024 : 1000 },
    megabytes: { name: 'Megabytes', symbol: 'MB', factor: Math.pow(baseSystem === 'binary' ? 1024 : 1000, 2) },
    gigabytes: { name: 'Gigabytes', symbol: 'GB', factor: Math.pow(baseSystem === 'binary' ? 1024 : 1000, 3) },
    terabytes: { name: 'Terabytes', symbol: 'TB', factor: Math.pow(baseSystem === 'binary' ? 1024 : 1000, 4) },
    petabytes: { name: 'Petabytes', symbol: 'PB', factor: Math.pow(baseSystem === 'binary' ? 1024 : 1000, 5) },
    exabytes: { name: 'Exabytes', symbol: 'EB', factor: Math.pow(baseSystem === 'binary' ? 1024 : 1000, 6) },
    zettabytes: { name: 'Zettabytes', symbol: 'ZB', factor: Math.pow(baseSystem === 'binary' ? 1024 : 1000, 7) },
    yottabytes: { name: 'Yottabytes', symbol: 'YB', factor: Math.pow(baseSystem === 'binary' ? 1024 : 1000, 8) }
  };

  // Transfer rate units
  const transferUnits = {
    bps: { name: 'Bits per second', symbol: 'bps', factor: 1 },
    kbps: { name: 'Kilobits per second', symbol: 'Kbps', factor: 1000 },
    mbps: { name: 'Megabits per second', symbol: 'Mbps', factor: 1000000 },
    gbps: { name: 'Gigabits per second', symbol: 'Gbps', factor: 1000000000 },
    tbps: { name: 'Terabits per second', symbol: 'Tbps', factor: 1000000000000 },
    kibps: { name: 'Kibibits per second', symbol: 'Kibps', factor: 1024 },
    mibps: { name: 'Mebibits per second', symbol: 'Mibps', factor: 1048576 },
    gibps: { name: 'Gibibits per second', symbol: 'Gibps', factor: 1073741824 },
    tibps: { name: 'Tebibits per second', symbol: 'Tibps', factor: 1099511627776 }
  };

  // Popular file sizes
  const fileSizes = [
    { name: 'Text Document', size: 0.00001, unit: 'MB', description: 'Simple .txt file' },
    { name: 'High-Res Photo', size: 5, unit: 'MB', description: 'JPEG image' },
    { name: 'MP3 Song', size: 5, unit: 'MB', description: 'Compressed audio' },
    { name: 'HD Video (1 min)', size: 100, unit: 'MB', description: '1080p video' },
    { name: 'Full HD Movie', size: 4, unit: 'GB', description: '2-hour movie' },
    { name: '4K Movie', size: 10, unit: 'GB', description: 'Ultra HD video' },
    { name: 'Software Installer', size: 500, unit: 'MB', description: 'Typical program' },
    { name: 'Operating System', size: 20, unit: 'GB', description: 'Windows/macOS' },
    { name: 'Game Installation', size: 50, unit: 'GB', description: 'AAA game' },
    { name: '4K Blu-ray', size: 50, unit: 'GB', description: 'Ultra HD disc' }
  ];

  // Internet speeds
  const internetSpeeds = [
    { name: 'Dial-up', speed: 56, unit: 'Kbps', description: 'Old modem connection' },
    { name: 'DSL', speed: 1, unit: 'Mbps', description: 'Basic broadband' },
    { name: 'Cable', speed: 25, unit: 'Mbps', description: 'Standard cable' },
    { name: 'Fiber', speed: 100, unit: 'Mbps', description: 'Fast broadband' },
    { name: 'Gigabit', speed: 1000, unit: 'Mbps', description: 'Ultra-fast internet' },
    { name: '5G', speed: 1000, unit: 'Mbps', description: 'Mobile 5G' },
    { name: '10G Fiber', speed: 10000, unit: 'Mbps', description: 'Future-proof' }
  ];

  useEffect(() => {
    convertData();
  }, [inputValue, fromUnit, toUnit, baseSystem, activeTab]);

  const convertData = () => {
    if (!inputValue) return;

    const value = parseFloat(inputValue);
    let result;

    if (activeTab === 'storage') {
      // Storage conversion
      const fromFactor = dataUnits[fromUnit].factor;
      const toFactor = dataUnits[toUnit].factor;

      // Convert to bytes first, then to target unit
      const inBytes = value * fromFactor;
      result = inBytes / toFactor;
    } else {
      // Transfer rate conversion
      const fromFactor = transferUnits[fromUnit].factor;
      const toFactor = transferUnits[toUnit].factor;

      // Convert to bps first, then to target unit
      const inBps = value * fromFactor;
      result = inBps / toFactor;
    }

    setConvertedValue(result.toFixed(6));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getComparisonValues = () => {
    if (!inputValue) return [];

    const value = parseFloat(inputValue);
    const units = activeTab === 'storage' ? dataUnits : transferUnits;

    return Object.entries(units).slice(0, 6).map(([key, unit]) => {
      let result;
      if (activeTab === 'storage') {
        const fromFactor = dataUnits[fromUnit].factor;
        const toFactor = unit.factor;
        const inBytes = value * fromFactor;
        result = inBytes / toFactor;
      } else {
        const fromFactor = transferUnits[fromUnit].factor;
        const toFactor = unit.factor;
        const inBps = value * fromFactor;
        result = inBps / toFactor;
      }

      return {
        unit: key,
        value: result.toFixed(3),
        info: unit
      };
    });
  };

  const formatFileSize = (size, unit) => {
    const unitFactors = {
      'B': 1,
      'KB': baseSystem === 'binary' ? 1024 : 1000,
      'MB': Math.pow(baseSystem === 'binary' ? 1024 : 1000, 2),
      'GB': Math.pow(baseSystem === 'binary' ? 1024 : 1000, 3),
      'TB': Math.pow(baseSystem === 'binary' ? 1024 : 1000, 4)
    };

    const bytes = size * unitFactors[unit];
    return bytes;
  };

  const popularConversions = [
    { from: 'MB', to: 'GB', label: 'MB to GB' },
    { from: 'GB', to: 'TB', label: 'GB to TB' },
    { from: 'KB', to: 'MB', label: 'KB to MB' },
    { from: 'bytes', to: 'KB', label: 'Bytes to KB' },
    { from: 'Mbps', to: 'Gbps', label: 'Mbps to Gbps' },
    { from: 'Kbps', to: 'Mbps', label: 'Kbps to Mbps' }
  ];



  const tabs = [
    { id: 'storage', label: 'Storage Units', icon: '💾' },
    { id: 'transfer', label: 'Transfer Rates', icon: '📡' },
    { id: 'comparison', label: 'Compare Units', icon: '📊' }
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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Advanced Data Converter</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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

              {/* Conversion Type Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Conversion Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="storage"
                      checked={activeTab === 'storage'}
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="mr-2"
                    />
                    Storage Units
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="transfer"
                      checked={activeTab === 'transfer'}
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="mr-2"
                    />
                    Transfer Rates
                  </label>
                </div>
              </div>

              {/* Base System Selection */}
              {activeTab === 'storage' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Base System
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="binary"
                        checked={baseSystem === 'binary'}
                        onChange={(e) => setBaseSystem(e.target.value)}
                        className="mr-2"
                      />
                      Binary (1024)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="decimal"
                        checked={baseSystem === 'decimal'}
                        onChange={(e) => setBaseSystem(e.target.value)}
                        className="mr-2"
                      />
                      Decimal (1000)
                    </label>
                  </div>
                </div>
              )}

              {/* Input Section */}
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
                      {Object.entries(activeTab === 'storage' ? dataUnits : transferUnits).map(([key, unit]) => (
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
                      {Object.entries(activeTab === 'storage' ? dataUnits : transferUnits).map(([key, unit]) => (
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
                      {inputValue} {activeTab === 'storage' ? dataUnits[fromUnit].symbol : transferUnits[fromUnit].symbol}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {activeTab === 'storage' ? dataUnits[fromUnit].name : transferUnits[fromUnit].name}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {convertedValue} {activeTab === 'storage' ? dataUnits[toUnit].symbol : transferUnits[toUnit].symbol}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {activeTab === 'storage' ? dataUnits[toUnit].name : transferUnits[toUnit].name}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-green-700 dark:text-green-300">
                  <p>Conversion Factor: {baseSystem === 'binary' ? '1024' : '1000'}</p>
                  <p>System: {baseSystem === 'binary' ? 'Binary (JEDEC/IEC)' : 'Decimal (SI)'}</p>
                </div>
              </div>
            )}

            {/* File Sizes */}
            {activeTab === 'storage' && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                  Common File Sizes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fileSizes.map((file, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                        {file.name}
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        {file.size} {file.unit}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        {file.description}
                      </div>
                      <div className="text-xs text-purple-500 dark:text-purple-500 mt-1">
                        ≈ {formatFileSize(file.size, file.unit).toLocaleString()} bytes
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Internet Speeds */}
            {activeTab === 'transfer' && (
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-4">
                  Internet Connection Speeds
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {internetSpeeds.map((speed, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="font-medium text-orange-700 dark:text-orange-300 mb-1">
                        {speed.name}
                      </div>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                        {speed.speed} {speed.unit}
                      </div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">
                        {speed.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


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
                    {activeTab === 'storage' ? dataUnits[fromUnit].name : transferUnits[fromUnit].name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Symbol: {activeTab === 'storage' ? dataUnits[fromUnit].symbol : transferUnits[fromUnit].symbol}
                  </p>
                  {activeTab === 'storage' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Factor: {dataUnits[fromUnit].factor.toLocaleString()} bytes
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {activeTab === 'storage' ? dataUnits[toUnit].name : transferUnits[toUnit].name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Symbol: {activeTab === 'storage' ? dataUnits[toUnit].symbol : transferUnits[toUnit].symbol}
                  </p>
                  {activeTab === 'storage' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Factor: {dataUnits[toUnit].factor.toLocaleString()} bytes
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Binary vs Decimal */}
            {activeTab === 'storage' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  Binary vs Decimal
                </h3>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                      Binary System (JEDEC/IEC)
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      Uses 1024 as base (2¹⁰)
                    </div>
                    <div className="text-xs text-blue-500 dark:text-blue-500">
                      Used by operating systems and hard drives
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                      Decimal System (SI)
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      Uses 1000 as base (10³)
                    </div>
                    <div className="text-xs text-blue-500 dark:text-blue-500">
                      Used by manufacturers for marketing
                    </div>
                  </div>
                </div>
              </div>
            )}
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
            Understanding Data Units
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Storage Units</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Byte (B):</strong> 8 bits, basic unit of digital information</li>
                <li>• <strong>Kilobyte (KB):</strong> 1,000 or 1,024 bytes</li>
                <li>• <strong>Megabyte (MB):</strong> 1,000² or 1,024² bytes</li>
                <li>• <strong>Gigabyte (GB):</strong> 1,000³ or 1,024³ bytes</li>
                <li>• <strong>Terabyte (TB):</strong> 1,000⁴ or 1,024⁴ bytes</li>
                <li>• <strong>Petabyte (PB):</strong> 1,000⁵ or 1,024⁵ bytes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Transfer Rates</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>bps:</strong> Bits per second</li>
                <li>• <strong>Kbps:</strong> Kilobits per second (1,000 bps)</li>
                <li>• <strong>Mbps:</strong> Megabits per second (1,000 Kbps)</li>
                <li>• <strong>Gbps:</strong> Gigabits per second (1,000 Mbps)</li>
                <li>• <strong>Tbps:</strong> Terabits per second (1,000 Gbps)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataConverter;
