import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search calculators and converters..."
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
          style={{
            backgroundColor: 'white',
            color: '#111827',
            borderColor: '#d1d5db'
          }}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors shadow-sm"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white'
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
