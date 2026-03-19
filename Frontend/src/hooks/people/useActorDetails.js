import { useEffect, useState } from "react";
import { fetchPersonDetails } from "../../services/peopleService";

export const useActorDetails = (personId) => {

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!personId) {
      setLoading(false);
      return;
    }

    const loadPerson = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const data = await fetchPersonDetails(personId);
        clearTimeout(timeoutId);
        
        setPerson(data);
      } catch (err) {
        console.error("Actor details error:", err);
        
        // Handle timeout/abort errors
        if (err.name === 'AbortError') {
          setError("Request timed out loading actor details.");
        } else {
          setError(err.message || 'Failed to fetch actor details');
        }
        
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };

    loadPerson();

  }, [personId]);

  return { person, loading, error };
};
