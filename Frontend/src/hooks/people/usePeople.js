import { useEffect, useState } from "react";
import { fetchPopularPeople } from "../../services/peopleService";

export const usePeople = (type = 'popular') => {

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await fetchPopularPeople();
        clearTimeout(timeoutId);
        
        setPeople(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("People error:", err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError("Request timed out loading people. Please try again.");
        } else {
          setError(err.message || "Failed to fetch people");
        }
        
        setPeople([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [type]);

  return { people, loading, error };
};