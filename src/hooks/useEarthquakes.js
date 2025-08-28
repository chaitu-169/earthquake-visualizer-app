// Custom React Hook: useEarthquakes

import { useEffect, useState } from "react";
import { fetchEarthquakes } from "../services/earthquakeService";

export function useEarthquakes() {
  const [data, setData] = useState([]);

  // State to track loading status (true while fetching data)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true); 
        const json = await fetchEarthquakes();

        // Store the GeoJSON features (list of earthquake events)
        setData(json.features); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []); // empty dependency array → runs only once (on mount)

  // Return the state values so consuming components can use them
  return { data, loading, error };
}
