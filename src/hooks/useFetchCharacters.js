import { useState, useEffect } from "react";

const useFetchCharacters = (currentPage, searchTerm, filters = {}) => {
  // Default filters to an empty object
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(false);
      setError(null);

      try {
        // Ensure filters is an object
        if (filters && typeof filters === "object") {
          // Construct the filter query string
          const filterQuery = Object.entries(filters)
            .filter(([key, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");

          // Construct the complete API URL
          const url = `https://swapi.dev/api/people/?page=${currentPage}&search=${encodeURIComponent(
            searchTerm
          )}${filterQuery ? `&${filterQuery}` : ""}`;

          console.log("Fetching URL:", url); // For debugging

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          setData(result.results);
          setTotalPages(Math.ceil(result.count / 10)); // Assuming 10 results per page
        } else {
          throw new Error("Filters must be an object");
        }
      } catch (err) {
        console.error("Fetch error:", err); // Log error for debugging
        setError("Failed to fetch characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, searchTerm]);

  return { data, loading, error, totalPages };
};

export default useFetchCharacters;
