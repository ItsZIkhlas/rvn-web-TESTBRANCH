"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MapBoxMapProps {
  latitude: number;
  longitude: number;
  corners?: { lat: number; lon: number }[];
}

export default function MapBoxMap({
  latitude,
  longitude,
  corners = [],
}: MapBoxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || isNaN(latitude) || isNaN(longitude)) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [(longitude + 0.0001), (latitude + 0.005)],
      zoom: 14.5,
    });

    // Add a marker at the session location
    // new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    if (corners.length > 1) {
      const coordinates = corners.map((point) => [point.lon, point.lat]);
      coordinates.push(coordinates[0]);

      map.on("load", () => {
        if (!map.getSource("track-line")) {
          map.addSource("track-line", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates,
              },
              properties: {}, 
            },
          });

          map.addLayer({
            id: "track-line-layer",
            type: "line",
            source: "track-line",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#00FFFF", // Cyan
              "line-width": 4,
            },
          });
        }
      });
    }

    return () => map.remove();
  }, [latitude, longitude, corners]);

  return <div ref={mapContainerRef} className="w-full h-200 rounded-xl" />;
}
