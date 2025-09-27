import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TimeConverter = () => {
  const [activeTab, setActiveTab] = useState('units');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('hours');
  const [toUnit, setToUnit] = useState('minutes');
  const [convertedValue, setConvertedValue] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState('Asia/Kolkata');
  const [comparisonZones, setComparisonZones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);

  // Time unit conversion factors (relative to seconds)
  const timeUnits = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2629746, // Average month (365.25/12 * 86400)
    years: 31556952, // Average year (365.25 * 86400)
    decades: 315569520,
    centuries: 3155695200
  };

  // Major time zones with cities
  const timeZones = {
    'America/New_York': { name: 'New York', country: 'USA', flag: '🇺🇸', offset: -5 },
    'America/Los_Angeles': { name: 'Los Angeles', country: 'USA', flag: '🇺🇸', offset: -8 },
    'America/Chicago': { name: 'Chicago', country: 'USA', flag: '🇺🇸', offset: -6 },
    'America/Denver': { name: 'Denver', country: 'USA', flag: '🇺🇸', offset: -7 },
    'Europe/London': { name: 'London', country: 'UK', flag: '🇬🇧', offset: 0 },
    'Europe/Paris': { name: 'Paris', country: 'France', flag: '🇫🇷', offset: 1 },
    'Europe/Berlin': { name: 'Berlin', country: 'Germany', flag: '🇩🇪', offset: 1 },
    'Europe/Rome': { name: 'Rome', country: 'Italy', flag: '🇮🇹', offset: 1 },
    'Europe/Madrid': { name: 'Madrid', country: 'Spain', flag: '🇪🇸', offset: 1 },
    'Asia/Tokyo': { name: 'Tokyo', country: 'Japan', flag: '🇯🇵', offset: 9 },
    'Asia/Shanghai': { name: 'Shanghai', country: 'China', flag: '🇨🇳', offset: 8 },
    'Asia/Hong_Kong': { name: 'Hong Kong', country: 'China', flag: '🇭🇰', offset: 8 },
    'Asia/Singapore': { name: 'Singapore', country: 'Singapore', flag: '🇸🇬', offset: 8 },
    'Asia/Kolkata': { name: 'Kolkata', country: 'India', flag: '🇮🇳', offset: 5.5 },
    'Asia/Mumbai': { name: 'Mumbai', country: 'India', flag: '🇮🇳', offset: 5.5 },
    'Asia/Delhi': { name: 'Delhi', country: 'India', flag: '🇮🇳', offset: 5.5 },
    'Asia/Dubai': { name: 'Dubai', country: 'UAE', flag: '🇦🇪', offset: 4 },
    'Australia/Sydney': { name: 'Sydney', country: 'Australia', flag: '🇦🇺', offset: 10 },
    'Australia/Melbourne': { name: 'Melbourne', country: 'Australia', flag: '🇦🇺', offset: 10 },
    'Pacific/Auckland': { name: 'Auckland', country: 'New Zealand', flag: '🇳🇿', offset: 12 },
    'Africa/Cairo': { name: 'Cairo', country: 'Egypt', flag: '🇪🇬', offset: 2 },
    'Africa/Johannesburg': { name: 'Johannesburg', country: 'South Africa', flag: '🇿🇦', offset: 2 },
    'America/Sao_Paulo': { name: 'São Paulo', country: 'Brazil', flag: '🇧🇷', offset: -3 },
    'America/Mexico_City': { name: 'Mexico City', country: 'Mexico', flag: '🇲🇽', offset: -6 },
    'America/Toronto': { name: 'Toronto', country: 'Canada', flag: '🇨🇦', offset: -5 },
    'America/Vancouver': { name: 'Vancouver', country: 'Canada', flag: '🇨🇦', offset: -8 }
  };

  useEffect(() => {
    convertTimeUnits();
  }, [inputValue, fromUnit, toUnit]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const convertTimeUnits = () => {
    if (!inputValue) return;

    const value = parseFloat(inputValue);
    const fromFactor = timeUnits[fromUnit];
    const toFactor = timeUnits[toUnit];

    // Convert to seconds first, then to target unit
    const inSeconds = value * fromFactor;
    const result = inSeconds / toFactor;

    setConvertedValue(result.toFixed(6));
  };

  const getTimeInZone = (timeZone) => {
    try {
      return new Date().toLocaleString('en-US', {
        timeZone,
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      return 'Invalid timezone';
    }
  };

  const getTimeDifference = (zone1, zone2) => {
    try {
      const time1 = new Date().toLocaleString('en-US', { timeZone: zone1 });
      const time2 = new Date().toLocaleString('en-US', { timeZone: zone2 });

      const date1 = new Date(time1);
      const date2 = new Date(time2);

      const diffMs = date2 - date1;
      const diffHours = diffMs / (1000 * 60 * 60);

      return diffHours > 0 ? `+${diffHours}` : diffHours.toString();
    } catch (error) {
      return 'N/A';
    }
  };

  const formatTimeDifference = (hours) => {
    const absHours = Math.abs(hours);
    const sign = hours >= 0 ? '+' : '-';

    if (absHours === 0) return 'Same time';
    if (absHours < 1) return `${sign}${(absHours * 60).toFixed(0)} minutes`;
    if (absHours === 1) return `${sign}1 hour`;
    return `${sign}${absHours.toFixed(1)} hours`;
  };

  const popularConversions = [
    { from: 'hours', to: 'minutes', label: 'Hours to Minutes' },
    { from: 'days', to: 'hours', label: 'Days to Hours' },
    { from: 'weeks', to: 'days', label: 'Weeks to Days' },
    { from: 'months', to: 'weeks', label: 'Months to Weeks' },
    { from: 'years', to: 'months', label: 'Years to Months' },
    { from: 'hours', to: 'seconds', label: 'Hours to Seconds' }
  ];

  const tabs = [
    { id: 'units', label: 'Time Units', icon: '⏰' },
    { id: 'zones', label: 'Time Zones', icon: '🌍' },
    { id: 'comparison', label: 'Compare Zones', icon: '📊' }
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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Advanced Time Converter</h2>
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
          {activeTab === 'units' && (
            <div className="space-y-6">
              {/* Unit Conversion */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      {Object.keys(timeUnits).map(unit => (
                        <option key={unit} value={unit}>
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      const temp = fromUnit;
                      setFromUnit(toUnit);
                      setToUnit(temp);
                    }}
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
                      {Object.keys(timeUnits).map(unit => (
                        <option key={unit} value={unit}>
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Popular Conversions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Popular Conversions
                </h3>
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

              {/* Conversion Result */}
              {convertedValue && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
                    Conversion Result
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {inputValue} {fromUnit} = {convertedValue} {toUnit}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'zones' && (
            <div className="space-y-6">
              {/* Current Time Zone */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  Current Time in Selected Zone
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                      Select Time Zone
                    </label>
                    <select
                      value={selectedTimeZone}
                      onChange={(e) => setSelectedTimeZone(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {Object.entries(timeZones).map(([zone, info]) => (
                        <option key={zone} value={zone}>
                          {info.flag} {info.name} ({info.country}) - UTC{info.offset >= 0 ? '+' : ''}{info.offset}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {getTimeInZone(selectedTimeZone)}
                    </div>
                  </div>
                </div>
                <div className="text-center text-blue-700 dark:text-blue-300">
                  <p>🌍 {timeZones[selectedTimeZone]?.name}, {timeZones[selectedTimeZone]?.country}</p>
                  <p>🕐 UTC{timeZones[selectedTimeZone]?.offset >= 0 ? '+' : ''}{timeZones[selectedTimeZone]?.offset}</p>
                </div>
              </div>

              {/* Major Cities Time */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                  Major Cities Current Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(timeZones).slice(0, 12).map(([zone, info]) => (
                    <div key={zone} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">{info.flag}</span>
                        <span className="font-medium text-purple-700 dark:text-purple-300">{info.name}</span>
                      </div>
                      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {getTimeInZone(zone).split(', ')[1]}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        UTC{info.offset >= 0 ? '+' : ''}{info.offset}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {/* Time Zone Comparison */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">
                  Time Zone Comparison
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                    Compare with zones:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(timeZones).slice(0, 10).map(zone => (
                      <button
                        key={zone}
                        onClick={() => {
                          setComparisonZones(prev =>
                            prev.includes(zone)
                              ? prev.filter(z => z !== zone)
                              : [...prev, zone]
                          );
                        }}
                        className={`px-3 py-1 rounded text-sm ${
                          comparisonZones.includes(zone)
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {timeZones[zone].name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {comparisonZones.map((zone, index) => {
                    const baseZone = 'Asia/Kolkata'; // Using IST as base
                    const difference = getTimeDifference(baseZone, zone);
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{timeZones[zone]?.flag}</span>
                          <div>
                            <div className="font-medium text-indigo-700 dark:text-indigo-300">
                              {timeZones[zone]?.name}
                            </div>
                            <div className="text-sm text-indigo-600 dark:text-indigo-400">
                              {timeZones[zone]?.country}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                            {getTimeInZone(zone).split(', ')[1]}
                          </div>
                          <div className="text-sm text-indigo-600 dark:text-indigo-400">
                            {formatTimeDifference(parseFloat(difference))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            Understanding Time Conversion
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Time Units</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Seconds:</strong> Base unit of time</li>
                <li>• <strong>Minutes:</strong> 60 seconds</li>
                <li>• <strong>Hours:</strong> 60 minutes = 3,600 seconds</li>
                <li>• <strong>Days:</strong> 24 hours = 86,400 seconds</li>
                <li>• <strong>Weeks:</strong> 7 days = 604,800 seconds</li>
                <li>• <strong>Months:</strong> ~30.44 days (average)</li>
                <li>• <strong>Years:</strong> 365.25 days (average)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Time Zones</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>UTC:</strong> Coordinated Universal Time (base)</li>
                <li>• <strong>GMT:</strong> Greenwich Mean Time (same as UTC)</li>
                <li>• <strong>IST:</strong> Indian Standard Time (UTC+5:30)</li>
                <li>• <strong>EST:</strong> Eastern Standard Time (UTC-5)</li>
                <li>• <strong>PST:</strong> Pacific Standard Time (UTC-8)</li>
                <li>• <strong>CST:</strong> Central Standard Time (UTC-6)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeConverter;
