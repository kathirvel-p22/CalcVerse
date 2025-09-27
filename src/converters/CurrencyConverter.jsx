import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import currencyRatesData from '../data/currencyRates.json';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [favorites, setFavorites] = useState(['USD', 'EUR', 'GBP', 'INR', 'JPY']);
  const [showFavorites, setShowFavorites] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonCurrencies, setComparisonCurrencies] = useState(['EUR', 'GBP', 'JPY', 'CAD']);

  // Comprehensive currency list with country information
  const currencies = {
    USD: { name: 'US Dollar', country: 'United States', symbol: '$', flag: '🇺🇸' },
    EUR: { name: 'Euro', country: 'European Union', symbol: '€', flag: '🇪🇺' },
    GBP: { name: 'British Pound', country: 'United Kingdom', symbol: '£', flag: '🇬🇧' },
    INR: { name: 'Indian Rupee', country: 'India', symbol: '₹', flag: '🇮🇳' },
    JPY: { name: 'Japanese Yen', country: 'Japan', symbol: '¥', flag: '🇯🇵' },
    CAD: { name: 'Canadian Dollar', country: 'Canada', symbol: 'C$', flag: '🇨🇦' },
    AUD: { name: 'Australian Dollar', country: 'Australia', symbol: 'A$', flag: '🇦🇺' },
    CHF: { name: 'Swiss Franc', country: 'Switzerland', symbol: 'Fr', flag: '🇨🇭' },
    CNY: { name: 'Chinese Yuan', country: 'China', symbol: '¥', flag: '🇨🇳' },
    BRL: { name: 'Brazilian Real', country: 'Brazil', symbol: 'R$', flag: '🇧🇷' },
    ZAR: { name: 'South African Rand', country: 'South Africa', symbol: 'R', flag: '🇿🇦' },
    MXN: { name: 'Mexican Peso', country: 'Mexico', symbol: '$', flag: '🇲🇽' },
    SGD: { name: 'Singapore Dollar', country: 'Singapore', symbol: 'S$', flag: '🇸🇬' },
    NZD: { name: 'New Zealand Dollar', country: 'New Zealand', symbol: 'NZ$', flag: '🇳🇿' },
    HKD: { name: 'Hong Kong Dollar', country: 'Hong Kong', symbol: 'HK$', flag: '🇭🇰' },
    KRW: { name: 'South Korean Won', country: 'South Korea', symbol: '₩', flag: '🇰🇷' },
    TRY: { name: 'Turkish Lira', country: 'Turkey', symbol: '₺', flag: '🇹🇷' },
    RUB: { name: 'Russian Ruble', country: 'Russia', symbol: '₽', flag: '🇷🇺' },
    SEK: { name: 'Swedish Krona', country: 'Sweden', symbol: 'kr', flag: '🇸🇪' },
    NOK: { name: 'Norwegian Krone', country: 'Norway', symbol: 'kr', flag: '🇳🇴' },
    DKK: { name: 'Danish Krone', country: 'Denmark', symbol: 'kr', flag: '🇩🇰' },
    PLN: { name: 'Polish Złoty', country: 'Poland', symbol: 'zł', flag: '🇵🇱' },
    CZK: { name: 'Czech Koruna', country: 'Czech Republic', symbol: 'Kč', flag: '🇨🇿' },
    HUF: { name: 'Hungarian Forint', country: 'Hungary', symbol: 'Ft', flag: '🇭🇺' },
    THB: { name: 'Thai Baht', country: 'Thailand', symbol: '฿', flag: '🇹🇭' },
    MYR: { name: 'Malaysian Ringgit', country: 'Malaysia', symbol: 'RM', flag: '🇲🇾' },
    PHP: { name: 'Philippine Peso', country: 'Philippines', symbol: '₱', flag: '🇵🇭' },
    IDR: { name: 'Indonesian Rupiah', country: 'Indonesia', symbol: 'Rp', flag: '🇮🇩' },
    VND: { name: 'Vietnamese Dong', country: 'Vietnam', symbol: '₫', flag: '🇻🇳' },
    EGP: { name: 'Egyptian Pound', country: 'Egypt', symbol: '£', flag: '🇪🇬' },
    SAR: { name: 'Saudi Riyal', country: 'Saudi Arabia', symbol: '﷼', flag: '🇸🇦' },
    AED: { name: 'UAE Dirham', country: 'United Arab Emirates', symbol: 'د.إ', flag: '🇦🇪' },
    ILS: { name: 'Israeli Shekel', country: 'Israel', symbol: '₪', flag: '🇮🇱' },
    KWD: { name: 'Kuwaiti Dinar', country: 'Kuwait', symbol: 'د.ك', flag: '🇰🇼' },
    BHD: { name: 'Bahraini Dinar', country: 'Bahrain', symbol: '.د.ب', flag: '🇧🇭' },
    OMR: { name: 'Omani Rial', country: 'Oman', symbol: '﷼', flag: '🇴🇲' },
    QAR: { name: 'Qatari Riyal', country: 'Qatar', symbol: '﷼', flag: '🇶🇦' },
    JOD: { name: 'Jordanian Dinar', country: 'Jordan', symbol: 'د.ا', flag: '🇯🇴' },
    LBP: { name: 'Lebanese Pound', country: 'Lebanon', symbol: 'ل.ل', flag: '🇱🇧' },
    PKR: { name: 'Pakistani Rupee', country: 'Pakistan', symbol: '₨', flag: '🇵🇰' },
    BDT: { name: 'Bangladeshi Taka', country: 'Bangladesh', symbol: '৳', flag: '🇧🇩' },
    LKR: { name: 'Sri Lankan Rupee', country: 'Sri Lanka', symbol: '₨', flag: '🇱🇰' },
    NPR: { name: 'Nepalese Rupee', country: 'Nepal', symbol: '₨', flag: '🇳🇵' },
    MMK: { name: 'Myanmar Kyat', country: 'Myanmar', symbol: 'K', flag: '🇲🇲' },
    KHR: { name: 'Cambodian Riel', country: 'Cambodia', symbol: '៛', flag: '🇰🇭' },
    LAK: { name: 'Laotian Kip', country: 'Laos', symbol: '₭', flag: '🇱🇦' },
    MNT: { name: 'Mongolian Tugrik', country: 'Mongolia', symbol: '₮', flag: '🇲🇳' },
    KPW: { name: 'North Korean Won', country: 'North Korea', symbol: '₩', flag: '🇰🇵' },
    TWD: { name: 'Taiwan Dollar', country: 'Taiwan', symbol: 'NT$', flag: '🇹🇼' },
    BND: { name: 'Brunei Dollar', country: 'Brunei', symbol: 'B$', flag: '🇧🇳' },
    FJD: { name: 'Fijian Dollar', country: 'Fiji', symbol: 'FJ$', flag: '🇫🇯' },
    PGK: { name: 'Papua New Guinean Kina', country: 'Papua New Guinea', symbol: 'K', flag: '🇵🇬' },
    SBD: { name: 'Solomon Islands Dollar', country: 'Solomon Islands', symbol: 'SI$', flag: '🇸🇧' },
    TOP: { name: 'Tongan Pa\'anga', country: 'Tonga', symbol: 'T$', flag: '🇹🇴' },
    VUV: { name: 'Vanuatu Vatu', country: 'Vanuatu', symbol: 'VT', flag: '🇻🇺' },
    WST: { name: 'Samoan Tala', country: 'Samoa', symbol: 'WS$', flag: '🇼🇸' },
    XAF: { name: 'Central African CFA Franc', country: 'Central African States', symbol: 'Fr', flag: '🇨🇫' },
    XOF: { name: 'West African CFA Franc', country: 'West African States', symbol: 'Fr', flag: '🇸🇳' },
    XPF: { name: 'CFP Franc', country: 'French Polynesia', symbol: 'Fr', flag: '🇵🇫' }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    if (!amount || !fromCurrency || !toCurrency) return;

    const rates = currencyRatesData.rates;
    const baseRate = rates[fromCurrency];
    const targetRate = rates[toCurrency];

    if (!baseRate || !targetRate) return;

    // Convert to USD first, then to target currency
    const amountInUSD = parseFloat(amount) / baseRate;
    const converted = amountInUSD * targetRate;
    const rate = targetRate / baseRate;

    setConvertedAmount(converted.toFixed(2));
    setExchangeRate(rate.toFixed(6));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleFavorite = (currency) => {
    setFavorites(prev =>
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    );
  };

  const getComparisonRates = () => {
    const rates = currencyRatesData.rates;
    const baseRate = rates[fromCurrency];
    const amountInUSD = parseFloat(amount) / baseRate;

    return comparisonCurrencies.map(currency => {
      const targetRate = rates[currency];
      const converted = amountInUSD * targetRate;
      return {
        currency,
        amount: converted.toFixed(2),
        rate: (targetRate / baseRate).toFixed(6),
        info: currencies[currency]
      };
    });
  };

  const popularPairs = [
    { from: 'USD', to: 'EUR', label: 'USD to EUR' },
    { from: 'USD', to: 'GBP', label: 'USD to GBP' },
    { from: 'USD', to: 'INR', label: 'USD to INR' },
    { from: 'EUR', to: 'GBP', label: 'EUR to GBP' },
    { from: 'GBP', to: 'INR', label: 'GBP to INR' },
    { from: 'USD', to: 'JPY', label: 'USD to JPY' }
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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Advanced Currency Converter</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Converter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Currency Conversion
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {Object.entries(currencies).map(([code, info]) => (
                        <option key={code} value={code}>
                          {info.flag} {code} - {info.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={swapCurrencies}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      ⇄
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {Object.entries(currencies).map(([code, info]) => (
                        <option key={code} value={code}>
                          {info.flag} {code} - {info.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Section */}
            {convertedAmount && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
                  Conversion Result
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {currencies[fromCurrency]?.symbol}{amount}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {currencies[fromCurrency]?.flag} {fromCurrency}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {currencies[toCurrency]?.symbol}{convertedAmount}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {currencies[toCurrency]?.flag} {toCurrency}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-green-700 dark:text-green-300">
                  <p>Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</p>
                  <p>Last Updated: {currencyRatesData.date}</p>
                </div>
              </div>
            )}

            {/* Popular Pairs */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Popular Currency Pairs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {popularPairs.map((pair, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFromCurrency(pair.from);
                      setToCurrency(pair.to);
                    }}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors text-sm"
                  >
                    {pair.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorites */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Favorite Currencies
              </h3>
              <div className="space-y-2">
                {favorites.map(currency => (
                  <div key={currency} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{currencies[currency]?.flag}</span>
                      <span className="font-medium">{currency}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        {currencies[currency]?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(currency)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      ★
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Currency Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Currency Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {currencies[fromCurrency]?.flag} {fromCurrency}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currencies[fromCurrency]?.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currencies[fromCurrency]?.country}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    {currencies[toCurrency]?.flag} {toCurrency}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currencies[toCurrency]?.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currencies[toCurrency]?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Mode */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Currency Comparison
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
                  Compare with currencies:
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(currencies).slice(0, 10).map(currency => (
                    <button
                      key={currency}
                      onClick={() => {
                        setComparisonCurrencies(prev =>
                          prev.includes(currency)
                            ? prev.filter(c => c !== currency)
                            : [...prev, currency]
                        );
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        comparisonCurrencies.includes(currency)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getComparisonRates().map((comparison, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{comparison.info?.flag}</span>
                      <span className="font-medium">{comparison.currency}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      {comparison.info?.symbol}{comparison.amount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Rate: {comparison.rate}
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
            Understanding Currency Conversion
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">How Exchange Rates Work</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">
                Exchange rates show how much one currency is worth in terms of another. All rates are typically quoted against the US Dollar (USD) as the base currency.
              </p>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Concepts</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Base Currency:</strong> The currency being converted from</li>
                <li>• <strong>Quote Currency:</strong> The currency being converted to</li>
                <li>• <strong>Exchange Rate:</strong> The value of one currency in terms of another</li>
                <li>• <strong>Cross Rate:</strong> Exchange rate between two non-USD currencies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Factors Affecting Rates</h4>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• <strong>Interest Rates:</strong> Higher rates attract foreign investment</li>
                <li>• <strong>Economic Growth:</strong> Strong economies have stronger currencies</li>
                <li>• <strong>Inflation:</strong> High inflation weakens currency value</li>
                <li>• <strong>Political Stability:</strong> Stable countries have stronger currencies</li>
                <li>• <strong>Trade Balance:</strong> Export strength affects currency value</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
