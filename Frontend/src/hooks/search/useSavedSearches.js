import { useState, useEffect, useCallback } from "react";
import * as searchService from "../../services/searchService";

export const useSavedSearches = (userId) => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch saved searches for authenticated user
  const fetchSavedSearches = useCallback(async () => {
    if (!userId) {
      setSavedSearches([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await searchService.getSearchHistory();
      setSavedSearches(response.searchHistory || []);
    } catch (err) {
      console.error("Error fetching saved searches:", err);
      setError(err.message || "Failed to fetch saved searches");
      setSavedSearches([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Fetch searches on mount or when userId changes
  useEffect(() => {
    if (userId) {
      fetchSavedSearches();
    }
  }, [userId, fetchSavedSearches]);

  // Save a new search
  const saveSearch = useCallback(
    async (query) => {
      if (!userId || !query?.trim()) {
        return null;
      }

      try {
        const response = await searchService.saveSearchHistory(query);
        setSavedSearches(response.searchHistory || []);
        return response;
      } catch (err) {
        console.error("Error saving search:", err);
        setError(err.message || "Failed to save search");
        return null;
      }
    },
    [userId]
  );

  // Delete a search by ID
  const deleteSearch = useCallback(
    async (searchId) => {
      if (!userId || !searchId) {
        return null;
      }

      try {
        const response = await searchService.deleteSearchHistory(searchId);
        setSavedSearches(response.searchHistory || []);
        return response;
      } catch (err) {
        console.error("Error deleting search:", err);
        setError(err.message || "Failed to delete search");
        return null;
      }
    },
    [userId]
  );

  // Clear all searches by deleting each one
  const clearAllSearches = useCallback(async () => {
    if (!userId || savedSearches.length === 0) {
      return;
    }

    try {
      for (const search of savedSearches) {
        await searchService.deleteSearchHistory(search._id);
      }
      setSavedSearches([]);
    } catch (err) {
      console.error("Error clearing searches:", err);
      setError(err.message || "Failed to clear searches");
    }
  }, [userId, savedSearches]);

  return {
    savedSearches,
    loading,
    error,
    saveSearch,
    deleteSearch,
    clearAllSearches,
    refetch: fetchSavedSearches
  };
};
