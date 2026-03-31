/* =============================================================
   PropertyMapWithPins — Enhanced Map with Property & Landmark Pins
   Displays vacation rental properties and important theme park locations
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { MapView } from "./Map";

// Magic Kingdom coordinates (center of map)
const MAGIC_KINGDOM = { lat: 28.4159, lng: -81.5585 };

// 16 miles in degrees (approximately 0.227 degrees per mile)
const RADIUS_MILES = 16;
const DEGREES_PER_MILE = 0.0145;
const RADIUS_DEGREES = RADIUS_MILES * DEGREES_PER_MILE;

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
    name: "LEGOLAND Florida",
    position: { lat: 28.3506, lng: -81.6686 },
    icon: "🧱",
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
  const circleRef = useRef<google.maps.Circle | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  // Fetch listings from database
  const { data: listings = [] } = trpc.listings.getActiveHomes.useQuery();

  // Initialize geocoder when map is ready
  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    if (window.google) {
      const newGeocoder = new window.google.maps.Geocoder();
      setGeocoder(newGeocoder);

      // Draw 16-mile radius circle around Magic Kingdom
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
      circleRef.current = new google.maps.Circle({
        map: map,
        center: MAGIC_KINGDOM,
        radius: RADIUS_MILES * 1609.34, // Convert miles to meters
        fillColor: "#3b82f6",
        fillOpacity: 0.05,
        strokeColor: "#3b82f6",
        strokeOpacity: 0.2,
        strokeWeight: 2,
        clickable: false,
      });
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

    // Add landmark pins first (important locations) - larger
    LANDMARKS.forEach((landmark) => {
      const markerElement = document.createElement("div");
      markerElement.className = "flex flex-col items-center cursor-pointer";
      markerElement.innerHTML = `
        <div class="text-2xl drop-shadow-lg hover:scale-125 transition-transform">${landmark.icon}</div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: landmark.position,
        content: markerElement,
        title: landmark.name,
      });

      // Show label on hover
      marker.addEventListener("mouseenter", () => {
        const labelElement = document.createElement("div");
        labelElement.className =
          "bg-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap";
        labelElement.textContent = landmark.name;
        markerElement.appendChild(labelElement);
      });

      marker.addEventListener("mouseleave", () => {
        const label = markerElement.querySelector("div:last-child");
        if (label && label !== markerElement.firstChild) {
          label.remove();
        }
      });

      markersRef.current.push(marker);
    });

    // Add property pins - smaller
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
          markerElement.className =
            "flex flex-col items-center cursor-pointer relative group";

          // Small pin for property
          markerElement.innerHTML = `
            <div class="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold drop-shadow-lg hover:bg-blue-700 hover:scale-125 transition-all flex-shrink-0">
              🏠
            </div>
            <div class="absolute bottom-full mb-2 bg-white text-xs font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
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
                <div class="p-3 max-w-xs">
                  <h3 class="font-bold text-sm mb-1">${listing.name}</h3>
                  <p class="text-xs text-gray-600 mb-2">${listing.address}</p>
                  <p class="text-xs">
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
      initialCenter={MAGIC_KINGDOM}
      initialZoom={initialZoom}
      className={className}
      onMapReady={handleMapReady}
    />
  );
}
