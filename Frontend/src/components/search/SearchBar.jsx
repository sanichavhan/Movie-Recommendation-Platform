import { useState } from "react";

const SearchBar = ({ onSearch }) => {

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{margin:"20px"}}>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

    </div>
  );
};

export default SearchBar;