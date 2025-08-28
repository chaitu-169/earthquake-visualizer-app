export async function fetchEarthquakes() {
  // Endpoint: retrieves all earthquakes in the past 24 hours in GeoJSON format
  const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  
  // Perform the API request
  const res = await fetch(url);

  // If the response status is not OK (e.g., network/server error), throw an error
  if (!res.ok) {
    throw new Error("Failed to fetch earthquake data");
  }
  return res.json();
}
