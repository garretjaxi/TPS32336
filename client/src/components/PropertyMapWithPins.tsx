/* =============================================================
   PropertyMapWithPins — Enhanced Map with Property & Landmark Pins
   Displays vacation rental properties and important theme park locations
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { MapView } from "./Map";

const KISSIMMEE_CENTER = { lat: 28.2917, lng: -81.4139 };

// Important landmarks with fixed coordinates
const LANDMARKS = [
  {
    name: "Magic Kingdom",
    position: { lat: 28.4159, lng: -81.5585 },
    icon: "🏰",
  },
  {
    name: "Universal Studios",
    position: { lat: 28.4744, lng: -81.4670 },
    icon: "🎬",
  },
  {
    name: "SeaWorld Orlando",
    position: { lat: 28.4173, lng: -81.4580 },
    icon: "🌊",
  },
  {
    name: "Orlando International Airport",
    position: { lat: 28.4312, lng: -81.3081 },
    icon: "✈️",
  },
];

interface PropertyMapProps {
  className?: string;
  initialZoom?: number;
}

export function PropertyMapWithPins({
  className,
  initialZoom = 12,
}: PropertyMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  // Fetch listings from database
  const { data: listings = [] } = trpc.listings.getActiveHomes.useQuery();

  // Initialize geocoder when map is ready
  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    if (window.google) {
      const newGeocoder = new window.google.maps.Geocoder();
      setGeocoder(newGeocoder);
    }
  };

  // Add markers to map
  useEffect(() => {
    if (!mapRef.current || !geocoder) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];

    // Add landmark pins first (important locations)
    LANDMARKS.forEach((landmark) => {
      const markerElement = document.createElement("div");
      markerElement.className = "flex flex-col items-center cursor-pointer";
      markerElement.innerHTML = `
        <div class="text-3xl drop-shadow-lg">${landmark.icon}</div>
        <div class="bg-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap mt-1">
          ${landmark.name}
        </div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: landmark.position,
        content: markerElement,
        title: landmark.name,
      });

      markersRef.current.push(marker);
    });

    // Add property pins
    listings.forEach((listing) => {
      if (!listing.address) return;

      geocoder.geocode({ address: listing.address }, (results, status) => {
        if (
          status === "OK" &&
          results &&
          results[0] &&
          mapRef.current &&
          window.google
        ) {
          const location = results[0].geometry.location;

          const markerElement = document.createElement("div");
          markerElement.className = "flex flex-col items-center cursor-pointer";
          markerElement.innerHTML = `
            <div class="bg-[oklch(0.58_0.16_55)] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold drop-shadow-lg">
              🏠
            </div>
            <div class="bg-white text-xs font-semibold px-2 py-1 rounded shadow-md whitespace-nowrap mt-1 max-w-[120px] text-center overflow-hidden text-ellipsis">
              ${listing.name}
            </div>
          `;

          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: mapRef.current,
            position: location,
            content: markerElement,
            title: listing.name,
          });

          // Add click listener to show property info
          marker.addEventListener("click", () => {
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-bold text-sm">${listing.name}</h3>
                  <p class="text-xs text-gray-600">${listing.address}</p>
                  <p class="text-xs mt-1">
                    <span class="font-semibold">${listing.beds} beds</span> •
                    <span class="font-semibold">${listing.guests} guests</span>
                  </p>
                </div>
              `,
            });
            infoWindow.open(mapRef.current, marker);
          });

          markersRef.current.push(marker);
        }
      });
    });
  }, [listings, geocoder]);

  return (
    <MapView
      initialCenter={KISSIMMEE_CENTER}
      initialZoom={initialZoom}
      className={className}
      onMapReady={handleMapReady}
    />
  );
}
