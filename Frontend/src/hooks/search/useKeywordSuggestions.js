import { useState, useEffect } from "react";
import { searchKeywords } from "../../services/searchService";

export const useKeywordSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    const fetchSuggestions = async () => {
      try {
        // Debounce slightly for suggestions (shorter than main search)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const data = await searchKeywords(query);
        clearTimeout(timeoutId);

        setSuggestions(Array.isArray(data) ? data.slice(0, 10) : []);
      } catch (err) {
        console.error("Suggestions error:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce suggestions to avoid too many API calls
    const debounceTimer = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { suggestions, loading };
};
