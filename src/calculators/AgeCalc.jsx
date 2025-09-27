import { useState } from 'react';
import { Link } from 'react-router-dom';

const AgeCalc = () => {
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [ageResult, setAgeResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth > current) {
      alert('Birth date cannot be in the future!');
      return;
    }

    // Calculate age in different units
    const ageInMilliseconds = current - birth;
    const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const ageInHours = Math.floor(ageInMinutes / 60);
    const ageInDays = Math.floor(ageInHours / 24);

    // Calculate years, months, days
    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate next birthday
    const nextBirthday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < current) {
      nextBirthday.setFullYear(current.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - current) / (1000 * 60 * 60 * 24));

    // Calculate age on different planets
    const earthYears = years + months / 12 + days / 365.25;
    const planetaryAges = {
      Mercury: earthYears / 0.241,
      Venus: earthYears / 0.615,
      Earth: earthYears,
      Mars: earthYears / 1.881,
      Jupiter: earthYears / 11.862,
      Saturn: earthYears / 29.457,
      Uranus: earthYears / 84.011,
      Neptune: earthYears / 164.8
    };

    // Calculate age milestones
    const totalWeeks = Math.floor(ageInDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = ageInHours;
    const totalMinutes = ageInMinutes;
    const totalSeconds = ageInSeconds;

    // Calculate heartbeats (average 70 beats per minute)
    const heartbeats = Math.floor(totalMinutes * 70);

    // Calculate breaths (average 12 breaths per minute)
    const breaths = Math.floor(totalMinutes * 12);

    setAgeResult({
      years,
      months,
      days,
      totalDays: ageInDays,
      totalHours: ageInHours,
      totalMinutes: ageInMinutes,
      totalSeconds: ageInSeconds,
      totalWeeks,
      totalMonths,
      nextBirthday: nextBirthday.toDateString(),
      daysUntilBirthday,
      planetaryAges,
      heartbeats,
      breaths,
      birthDate: birth.toDateString(),
      currentDate: current.toDateString()
    });
  };

  const reset = () => {
    setBirthDate('');
    setCurrentDate(new Date().toISOString().split('T')[0]);
    setAgeResult(null);
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
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Advanced Age Calculator</h2>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Date (Optional)
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={calculateAge}
            disabled={!birthDate}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Age
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
      {ageResult && (
        <div className="space-y-6">
          {/* Basic Age Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              Age Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {ageResult.years}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {ageResult.months}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {ageResult.days}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Days</div>
              </div>
            </div>
            <div className="mt-4 text-center text-blue-700 dark:text-blue-300">
              <p>🎂 Next birthday: {ageResult.nextBirthday}</p>
              <p>⏰ Days until birthday: {ageResult.daysUntilBirthday}</p>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
              Detailed Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {ageResult.totalDays.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Days Lived</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {ageResult.totalHours.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Hours Lived</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {ageResult.totalWeeks.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Weeks Lived</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {ageResult.totalMonths}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Months Lived</div>
              </div>
            </div>
          </div>

          {/* Planetary Ages */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
              Age on Other Planets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(ageResult.planetaryAges).map(([planet, age]) => (
                <div key={planet} className="text-center">
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {age.toFixed(1)}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">{planet} Years</div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Statistics */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">
              Health Statistics (Approximate)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {ageResult.heartbeats.toLocaleString()}
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">Heartbeats</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {ageResult.breaths.toLocaleString()}
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">Breaths Taken</div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
              Fun Facts
            </h3>
            <div className="space-y-2 text-yellow-700 dark:text-yellow-300">
              <p>🎈 You've been alive for {ageResult.totalSeconds.toLocaleString()} seconds!</p>
              <p>🌍 You could have traveled around the Earth {Math.floor(ageResult.totalDays / 365.25 * 4)} times at the equator!</p>
              <p>📅 You've experienced {Math.floor(ageResult.years / 4)} leap years!</p>
              <p>⏰ Your heart has beaten approximately {ageResult.heartbeats.toLocaleString()} times!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalc;
