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
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    // If corner points exist, draw a cyan line
    if (corners.length > 1) {
      // Map corners to [lon, lat]
      const coordinates = corners.map((point) => [point.lon, point.lat]);

      // Close the polygon loop by adding the first point at the end
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
              properties: {}, // required to avoid type issues
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
