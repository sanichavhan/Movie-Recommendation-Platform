import { useState, useRef, useEffect } from "react";

const SearchBar = ({ onSearch, suggestions = [] }) => {

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) && 
          inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Show suggestions if user is typing
    if (value.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setIsSearching(true);
      onSearch(query);
      setShowSuggestions(false);
      // Keep input focused
      inputRef.current?.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setIsSearching(true);
    onSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Filter suggestions based on query
  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      margin: "20px",
      position: "relative",
      display: "inline-block",
      width: "100%"
    }}>
      <div style={{
        display: "flex",
        gap: "10px",
        alignItems: "center"
      }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
          style={{
            flex: 1,
            padding: "10px 15px",
            fontSize: "16px",
            border: "2px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            transition: "all 0.3s ease",
            borderColor: query ? "#007bff" : "#ccc",
          }}
          disabled={isSearching}
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim() || isSearching}
          style={{
            padding: "10px 20px",
            backgroundColor: isSearching ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isSearching ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease"
          }}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          style={{
            position: "absolute",
            top: "45px",
            left: "20px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "5px",
            maxHeight: "250px",
            overflowY: "auto",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}
        >
          {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                borderBottom: index < filteredSuggestions.length - 1 ? "1px solid #f0f0f0" : "none",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              🔍 {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;