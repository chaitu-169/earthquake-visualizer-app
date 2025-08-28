import Header from "./components/Header";
import MapView from "./components/Mapview";
import EarthquakeList from "./components/EarthquakeList";
import { useEarthquakes } from "./hooks/useEarthquakes";
import { useState } from "react";

// helper: lat/lng → continent
function getContinent(lat, lng) {
  if (lat >= -35 && lat <= 37 && lng >= -20 && lng <= 55) return "Africa";
  if (lat >= 35 && lat <= 70 && lng >= -10 && lng <= 40) return "Europe";
  if (lat >= 5 && lat <= 80 && lng >= 40 && lng <= 180) return "Asia";
  if (lat >= -60 && lat <= 15 && lng >= -90 && lng <= -30) return "South America";
  if (lat >= 15 && lat <= 72 && lng >= -170 && lng <= -50) return "North America";
  if (lat >= -50 && lat <= -10 && lng >= 110 && lng <= 180) return "Oceania";
  if (lat <= -60) return "Antarctica";
  return "Other";
}

export default function App() {
  const { data: earthquakes, loading, error } = useEarthquakes();

  // States
  const [minMag, setMinMag] = useState(0);
  const [continent, setContinent] = useState("All");
  const [selectedEq, setSelectedEq] = useState(null);

  // Filter earthquakes
  const filteredEq = earthquakes.filter((eq) => {
    const magOk = eq.properties.mag >= minMag;
    const [lng, lat] = eq.geometry.coordinates;
    const eqContinent = getContinent(lat, lng);
    const continentOk = continent === "All" || eqContinent === continent;
    return magOk && continentOk;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Filter bar */}
      <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-center bg-gray-100 border-b">
        {/* Min Magnitude */}
        <div>
          <label className="mr-2 font-medium text-lg">Min Magnitude:</label>
          <select
            value={minMag}
            onChange={(e) => setMinMag(Number(e.target.value))}
            className="border rounded p-3 text-base"
          >
            <option value={0}>All</option>
            <option value={2.5}>2.5+</option>
            <option value={4.0}>4.0+</option>
            <option value={5.0}>5.0+</option>
          </select>
        </div>

        {/* Continent Filter */}
        <div>
          <label className="mr-2 font-medium text-lg">Continent:</label>
          <select
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
            className="border rounded p-3 text-base"
          >
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="p-4 text-center">Loading earthquakes...</p>}
      {error && <p className="p-4 text-center text-red-500">{error}</p>}

      {/* Main content area */}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row flex-1">
          {/* Map */}
          <div className="flex-1">
            <MapView earthquakes={filteredEq} selectedEq={selectedEq} />
          </div>

          {/* List */}
          <div className="w-full md:w-1/3 p-4 bg-white border-t md:border-l overflow-y-auto max-h-[50vh] md:max-h-[calc(100vh-160px)] shadow-inner">
            <EarthquakeList
              earthquakes={filteredEq}
              onSelect={setSelectedEq}
            />
          </div>
        </div>
      )}
    </div>
  );
}
