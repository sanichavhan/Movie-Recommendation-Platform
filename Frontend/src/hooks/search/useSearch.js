import { useState } from "react";
import { searchMulti } from "../../services/searchService";

export const useSearch = () => {

  const [results, setResults] = useState([]);

  const search = async (query) => {

    const data = await searchMulti(query);
    setResults(data);

  };

  return { results, search };
};