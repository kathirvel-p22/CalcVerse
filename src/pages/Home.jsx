import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const calculators = [
    { id: 'basic', title: 'Basic Calculator', description: 'Simple arithmetic operations', icon: '🧮' },
    { id: 'scientific', title: 'Scientific Calculator', description: 'Advanced mathematical functions', icon: '🔬' },
    { id: 'age', title: 'Age Calculator', description: 'Calculate age from birth date', icon: '🎂' },
    { id: 'bmi', title: 'BMI Calculator', description: 'Body Mass Index calculation', icon: '⚖️' },
    { id: 'emi', title: 'EMI Calculator', description: 'Loan EMI calculation', icon: '💰' },
    { id: 'compound', title: 'Compound Interest', description: 'Investment growth calculator', icon: '📈' },
    { id: 'percentage', title: 'Percentage Calculator', description: 'Percentage calculations', icon: '%' },
  ];

  const converters = [
    { id: 'currency', title: 'Currency Converter', description: 'Convert between currencies', icon: '💱' },
    { id: 'time', title: 'Time Converter', description: 'Convert time zones', icon: '🕐' },
    { id: 'temperature', title: 'Temperature Converter', description: 'Celsius, Fahrenheit, Kelvin', icon: '🌡️' },
    { id: 'data', title: 'Data Converter', description: 'Bytes, KB, MB, GB conversions', icon: '💾' },
    { id: 'length', title: 'Length/Weight Converter', description: 'Various unit conversions', icon: '📏' },
  ];

  const themes = [
    { id: 'themes', title: 'Theme Gallery', description: 'Choose from beautiful themes', icon: '🎨' },
  ];

  const filteredCalculators = calculators.filter(calc =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConverters = converters.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (id) => {
    if (id === 'basic') {
      navigate('/calculator/basic');
    } else if (id === 'scientific') {
      navigate('/calculator/scientific');
    } else if (id === 'age') {
      navigate('/calculator/age');
    } else if (id === 'bmi') {
      navigate('/calculator/bmi');
    } else if (id === 'emi') {
      navigate('/calculator/emi');
    } else if (id === 'compound') {
      navigate('/calculator/compound');
    } else if (id === 'percentage') {
      navigate('/calculator/percentage');
    } else if (id === 'currency') {
      navigate('/converter/currency');
    } else if (id === 'time') {
      navigate('/converter/time');
    } else if (id === 'temperature') {
      navigate('/converter/temperature');
    } else if (id === 'data') {
      navigate('/converter/data');
    } else if (id === 'length') {
      navigate('/converter/length');
    } else if (id === 'themes') {
      navigate('/themes');
    } else {
      console.log('Clicked:', id);
      // TODO: Add navigation for other calculators/converters
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Section - Top of Website - Full Viewport */}
      <div className="welcome-section text-center min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white rounded-full opacity-5"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-7xl font-black mb-8 drop-shadow-2xl tracking-tight">
            Welcome to CalcVerse
          </h1>
          <p className="text-2xl mb-16 max-w-4xl mx-auto opacity-95 leading-relaxed font-medium">
            Your comprehensive calculator and converter toolkit with beautiful themes and professional tools
          </p>

          {/* Enhanced Search Bar */}
          <div className="welcome-search-bar max-w-lg mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search calculators and converters..."
                className="w-full text-xl py-5 px-8 rounded-full border-3 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-60 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-3 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-12 text-white mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">18+</div>
              <div className="text-xl opacity-90 font-medium">Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-xl opacity-90 font-medium">Themes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-xl opacity-90 font-medium">Possibilities</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-lg opacity-90 mb-8">
              Explore our collection of calculators and converters below
            </p>
            <div className="animate-bounce">
              <svg className="w-8 h-8 mx-auto text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map(calc => (
            <Card
              key={calc.id}
              title={calc.title}
              description={calc.description}
              icon={calc.icon}
              onClick={() => handleCardClick(calc.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Converters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConverters.map(conv => (
            <Card
              key={conv.id}
              title={conv.title}
              description={conv.description}
              icon={conv.icon}
              onClick={() => handleCardClick(conv.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Themes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map(theme => (
            <Card
              key={theme.id}
              title={theme.title}
              description={theme.description}
              icon={theme.icon}
              onClick={() => handleCardClick(theme.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
