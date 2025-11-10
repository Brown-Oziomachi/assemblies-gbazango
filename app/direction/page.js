"use client";
import { useEffect, useRef, useState } from "react";

export default function DirectionPage() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    link.onload = () => {
      setTimeout(() => {
        import("leaflet").then((L) => {
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          });

          // Church location (you can add more)
          const churchLocations = [
            {
              lat: 9.0118,
              lng: 7.3497,
              name: "Assemblies of God Church - Gbazango, Kubwa",
              address: "Gbazango District, Kubwa, Abuja FCT",
              phone: "+234 803 XXX XXXX",
            },
          ];

          if (!mapInstanceRef.current && mapRef.current) {
            const map = L.map(mapRef.current).setView(
              [churchLocations[0].lat, churchLocations[0].lng],
              15
            );
            mapInstanceRef.current = map;

            // Add OpenStreetMap tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "© OpenStreetMap contributors",
              maxZoom: 19,
            }).addTo(map);

            // Custom church icon
            const churchIcon = L.divIcon({
              className: "custom-church-icon",
              html: `
                <div style="
                  background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
                  width: 50px; height: 50px; border-radius: 50%;
                  display: flex; align-items: center; justify-content: center;
                  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                  border: 4px solid white;">
                  <span style="font-size: 30px;">⛪</span>
                </div>`,
              iconSize: [50, 50],
              iconAnchor: [25, 25],
            });

            // Add markers and popup
            churchLocations.forEach((church) => {
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${church.lat},${church.lng}&travelmode=driving`;

              L.marker([church.lat, church.lng], { icon: churchIcon })
                .addTo(map)
                .bindPopup(`
                  <div style="text-align: center; padding: 12px; min-width: 250px;">
                    <h3 style="color: #d97706; margin-bottom: 10px; font-size: 1.1rem; font-weight: bold;">
                      ⛪ ${church.name}
                    </h3>
                    <p style="margin: 6px 0;">📍 ${church.address}</p>
                    <p style="margin: 6px 0;">📞 ${church.phone}</p>
                    <a
                      href="${mapsUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="
                        display: inline-block;
                        margin-top: 10px;
                        padding: 10px 18px;
                        background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                        transition: all 0.3s ease;"
                      onmouseover="this.style.transform='scale(1.05)'"
                      onmouseout="this.style.transform='scale(1)'"
                    >
                      🚗 Get Directions
                    </a>
                  </div>
                `);
            });

            // Add circle highlight
            L.circle([churchLocations[0].lat, churchLocations[0].lng], {
              color: "#f59e0b",
              fillColor: "#fef3e2",
              fillOpacity: 0.3,
              radius: 200,
            }).addTo(map);

            setIsLoading(false);
          }
        });
      }, 10000);
    };

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-screen relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50 z-10">
          <div className="text-center">
            <div className="text-4xl mb-4">⛪</div>
            <p className="text-amber-700 font-semibold">
              Loading AG Gbazango map...
            </p>
          </div>
        </div>
      )}
      <div id="map" ref={mapRef} className="w-full h-full" />
      <style jsx global>{`
        .custom-church-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
