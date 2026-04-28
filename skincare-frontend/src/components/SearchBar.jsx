import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchBarRef = useRef(null);

  // Debounce search term
  useEffect(() => {
    const controller = new AbortController();

    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 1) {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:5000/api/products/search?q=${searchTerm}`, {
            signal: controller.signal
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error("Error fetching search suggestions:", error);
            setSuggestions([]);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (product) => {
    const targetId = product.id || product._id;
    navigate(`/product/${targetId}`);
    setSearchTerm(''); // Clear search term after navigation
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow click events on suggestions to register
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  return (
    <div className="relative mr-4 group" ref={searchBarRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="bg-white/50 border border-gray-400 rounded-full pl-4 pr-10 py-1 text-sm focus:outline-none focus:border-gray-600 w-40 transition-all focus:w-64"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {showSuggestions && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((product) => (
                <li
                  key={product._id || product.id}
                  className="px-4 py-2 hover:bg-[#fff5e1] cursor-pointer text-gray-800 text-sm border-b last:border-0"
                  onMouseDown={() => handleSuggestionClick(product)}
                >
                  <p className="font-medium">{product.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{product.category}</p>
                </li>
              ))}
            </ul>
          ) : searchTerm.length > 1 && !isLoading && (
            <div className="px-4 py-3 text-sm text-gray-500 italic text-center">
              No products found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;