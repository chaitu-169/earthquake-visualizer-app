export default function EarthquakeList({ earthquakes, onSelect }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Earthquakes</h2>

      {earthquakes.length === 0 ? (
        <p className="font-medium text-gray-500">No earthquakes recorded for this Continent.</p>
      ) : (
        <ul className="space-y-3">
          {earthquakes.map((quake) => (
            <li
              key={quake.id}
              onClick={() => onSelect(quake)}
              className="p-3 bg-white shadow rounded-lg hover:shadow-md transition cursor-pointer hover:bg-blue-50"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">
                  {quake.properties.place}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-bold ${
                    quake.properties.mag >= 5
                      ? "bg-red-100 text-red-600"
                      : quake.properties.mag >= 3
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  M {quake.properties.mag.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(quake.properties.time).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
