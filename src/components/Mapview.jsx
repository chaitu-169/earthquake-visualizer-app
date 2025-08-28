import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// helper component to fly to a quake when selected
function FlyToQuake({ quake }) {
  const map = useMap();

  useEffect(() => {
    if (quake) {
      const [lng, lat] = quake.geometry.coordinates;
      map.flyTo([lat, lng], 6, { duration: 2 });
    }
  }, [quake, map]);

  return null;
}

export default function MapView({ earthquakes, selectedEq }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {earthquakes.map((quake) => {
        const [lng, lat] = quake.geometry.coordinates;
        const mag = quake.properties.mag;
        const isSelected = selectedEq?.id === quake.id;

        return (
          <CircleMarker
            key={quake.id}
            center={[lat, lng]}
            radius={mag * 2}
            pathOptions={{
              color: mag >= 5 ? "red" : mag >= 3 ? "orange" : "green",
              weight: isSelected ? 4 : 2, // 🔥 highlight selected marker
            }}
          >
            <Popup autoPan={true} autoClose={false} open={isSelected}>
              <strong>{quake.properties.place}</strong>
              <br />
              Magnitude: {mag}
              <br />
              {new Date(quake.properties.time).toLocaleString()}
            </Popup>
          </CircleMarker>
        );
      })}

      <FlyToQuake quake={selectedEq} />
    </MapContainer>
  );
}
