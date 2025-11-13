"use client";
import { useEffect, useRef, useState } from "react";

export default function DirectionPage() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const watchIdRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentStreet, setCurrentStreet] = useState("Locating...");
  const [heading, setHeading] = useState("Calculating...");
  const [error, setError] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let L = null;

    const initMap = async () => {
      try {
        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }

        // Load Leaflet Routing Machine CSS
        if (!document.querySelector('link[href*="leaflet-routing-machine.css"]')) {
          const routingLink = document.createElement("link");
          routingLink.rel = "stylesheet";
          routingLink.href = "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css";
          document.head.appendChild(routingLink);
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        // Load Leaflet
        if (!window.L) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        L = window.L;

        // Load Leaflet Routing Machine
        if (!L.Routing) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        const church = {
          lat: 9.142361592025193,
          lng: 7.3123844009045165,
          name: "Assemblies of God Church - Gbazango, Kubwa",
          address: "Gbazango District, Kubwa, Abuja FCT",
          phone: "+234 803 XXX XXXX",
        };

        const getStreetName = async (lat, lng) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const address = data.address;
            return {
              road: address.road || address.neighbourhood || "Unknown Road",
              area: address.suburb || address.city_district || "",
              city: address.city || "Abuja"
            };
          } catch (err) {
            return { road: "Location detected", area: "", city: "" };
          }
        };

        const calculateBearing = (start, end) => {
          const startLat = start.lat * Math.PI / 180;
          const startLng = start.lng * Math.PI / 180;
          const endLat = end.lat * Math.PI / 180;
          const endLng = end.lng * Math.PI / 180;

          const dLng = endLng - startLng;
          const y = Math.sin(dLng) * Math.cos(endLat);
          const x = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
          const bearing = Math.atan2(y, x) * 180 / Math.PI;

          return (bearing + 360) % 360;
        };

        const getDirectionText = (bearing) => {
          if (bearing >= 337.5 || bearing < 22.5) return "Head North ⬆️";
          if (bearing >= 22.5 && bearing < 67.5) return "Head Northeast ↗️";
          if (bearing >= 67.5 && bearing < 112.5) return "Head East ➡️";
          if (bearing >= 112.5 && bearing < 157.5) return "Head Southeast ↘️";
          if (bearing >= 157.5 && bearing < 202.5) return "Head South ⬇️";
          if (bearing >= 202.5 && bearing < 247.5) return "Head Southwest ↙️";
          if (bearing >= 247.5 && bearing < 292.5) return "Head West ⬅️";
          return "Head Northwest ↖️";
        };

        if (!mapInstanceRef.current && mapRef.current) {
          const map = L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: true,
          }).setView([church.lat, church.lng], 15);
          
          mapInstanceRef.current = map;

          // Use satellite/street view style map
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19,
          }).addTo(map);

          const churchIcon = L.divIcon({
            className: "custom-church-icon",
            html: `
              <div style="
                background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
                width: 60px; height: 60px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 8px 25px rgba(217, 119, 6, 0.5);
                border: 5px solid white;
                animation: churchPulse 2s infinite;">
                <span style="font-size: 36px;">⛪</span>
              </div>`,
            iconSize: [60, 60],
            iconAnchor: [30, 30],
          });

          L.marker([church.lat, church.lng], { icon: churchIcon })
            .addTo(map)
            .bindPopup(`
              <div style="text-align: center; padding: 15px; min-width: 280px;">
                <h3 style="color: #d97706; margin-bottom: 12px; font-size: 1.2rem; font-weight: bold;">
                  ⛪ ${church.name}
                </h3>
                <p style="margin: 8px 0; font-size: 0.95rem; color: #666;">📍 ${church.address}</p>
                <p style="margin: 8px 0; font-size: 0.95rem; color: #666;">📞 ${church.phone}</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${church.lat},${church.lng}&travelmode=driving" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #f59e0b; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Open in Google Maps</a>
              </div>
            `);

          L.circle([church.lat, church.lng], {
            color: "#f59e0b",
            fillColor: "#fef3e2",
            fillOpacity: 0.25,
            radius: 150,
            weight: 3,
          }).addTo(map);

          if ("geolocation" in navigator) {
            let lastPosition = null;

            watchIdRef.current = navigator.geolocation.watchPosition(
              async (pos) => {
                const userLat = pos.coords.latitude;
                const userLng = pos.coords.longitude;
                const currentPosition = { lat: userLat, lng: userLng };
                setUserLocation(currentPosition);

                const locationInfo = await getStreetName(userLat, userLng);
                setCurrentStreet(`${locationInfo.road}${locationInfo.area ? ', ' + locationInfo.area : ''}`);

                const dist = map.distance([userLat, userLng], [church.lat, church.lng]);
                setDistance((dist / 1000).toFixed(2));

                let bearing = calculateBearing(currentPosition, { lat: church.lat, lng: church.lng });
                setHeading(getDirectionText(bearing));

                const carIcon = L.divIcon({
                  className: "custom-car-icon",
                  html: `
                    <div style="
                      width: 60px; height: 60px;
                      display: flex; align-items: center; justify-content: center;
                      transform: rotate(${bearing}deg);
                      transition: transform 1s ease;
                      filter: drop-shadow(0 6px 10px rgba(0,0,0,0.4));">
                      <div style="
                        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                        width: 50px; height: 50px; border-radius: 50%;
                        display: flex; align-items: center; justify-content: center;
                        border: 4px solid white;
                        animation: carPulse 1.5s infinite;">
                        <span style="font-size: 28px; transform: rotate(-${bearing}deg);">📍</span>
                      </div>
                    </div>`,
                  iconSize: [60, 60],
                  iconAnchor: [30, 30],
                });

                if (!markerRef.current) {
                  markerRef.current = L.marker([userLat, userLng], { 
                    icon: carIcon,
                    zIndexOffset: 1000 
                  }).addTo(map);
                  
                  markerRef.current.bindPopup(`
                    <div style="text-align: center; padding: 12px;">
                      <strong style="color: #2563eb; font-size: 1.2rem;">📍 You Are Here</strong>
                      <p style="margin-top: 8px; font-size: 0.9rem; color: #666;">Following your location...</p>
                    </div>
                  `);

                  const bounds = L.latLngBounds([[userLat, userLng], [church.lat, church.lng]]);
                  map.fitBounds(bounds, { padding: [100, 100], maxZoom: 17 });

                  // Create route with Leaflet Routing Machine
                  if (L.Routing) {
                    try {
                      const routeControl = L.Routing.control({
                        waypoints: [
                          L.latLng(userLat, userLng),
                          L.latLng(church.lat, church.lng),
                        ],
                        routeWhileDragging: false,
                        addWaypoints: false,
                        draggableWaypoints: false,
                        createMarker: () => null,
                        lineOptions: {
                          styles: [
                            { 
                              color: '#FF0000',  // Red shadow for visibility
                              weight: 12, 
                              opacity: 0.5,
                            },
                            { 
                              color: '#0066FF',  // Bright blue main line
                              weight: 8, 
                              opacity: 1,
                            }
                          ]
                        },
                        show: false,
                        fitSelectedRoutes: true,
                        router: L.Routing.osrmv1({
                          serviceUrl: 'https://router.project-osrm.org/route/v1',
                          profile: 'driving'
                        })
                      });
                      
                      routeControl.on('routesfound', function(e) {
                        console.log('Route found!', e);
                        const routes = e.routes;
                        const summary = routes[0].summary;
                        setDuration(Math.round(summary.totalTime / 60));
                        
                        // Get turn-by-turn instructions
                        const steps = routes[0].instructions.slice(0, 5).map(inst => ({
                          text: inst.text,
                          distance: (inst.distance / 1000).toFixed(1) + ' km'
                        }));
                        setInstructions(steps);
                      });

                      routeControl.on('routingerror', function(e) {
                        console.error('Routing error:', e);
                        // Draw straight line as fallback
                        L.polyline([
                          [userLat, userLng],
                          [church.lat, church.lng]
                        ], {
                          color: '#FF0000',
                          weight: 8,
                          opacity: 0.8,
                          dashArray: '20, 10'
                        }).addTo(map);
                      });
                      
                      routeControl.addTo(map);
                      routeLayerRef.current = routeControl;
                      
                      console.log('Route control added to map');
                    } catch (err) {
                      console.error('Error creating route:', err);
                      // Fallback: draw simple line
                      L.polyline([
                        [userLat, userLng],
                        [church.lat, church.lng]
                      ], {
                        color: '#0066FF',
                        weight: 8,
                        opacity: 0.8,
                        dashArray: '15, 10'
                      }).addTo(map);
                    }
                  } else {
                    // If routing library not loaded, draw straight line
                    L.polyline([
                      [userLat, userLng],
                      [church.lat, church.lng]
                    ], {
                      color: '#0066FF',
                      weight: 8,
                      opacity: 0.8,
                      dashArray: '15, 10'
                    }).addTo(map);
                  }

                  setIsLoading(false);
                } else {
                  const oldLatLng = markerRef.current.getLatLng();
                  const newLatLng = L.latLng(userLat, userLng);
                  
                  const moved = map.distance(oldLatLng, newLatLng);
                  if (moved > 3) {
                    let step = 0;
                    const steps = 40;
                    const animationDuration = 1500;
                    const stepTime = animationDuration / steps;
                    
                    const animate = setInterval(() => {
                      step++;
                      if (step > steps) {
                        clearInterval(animate);
                        markerRef.current.setIcon(carIcon);
                        return;
                      }
                      
                      const easeOut = 1 - Math.pow(1 - step / steps, 3);
                      const lat = oldLatLng.lat + (newLatLng.lat - oldLatLng.lat) * easeOut;
                      const lng = oldLatLng.lng + (newLatLng.lng - oldLatLng.lng) * easeOut;
                      markerRef.current.setLatLng([lat, lng]);
                      
                      map.panTo([lat, lng], { animate: true, duration: 0.3 });
                    }, stepTime);
                  }

                  if (routeLayerRef.current && routeLayerRef.current.setWaypoints) {
                    try {
                      routeLayerRef.current.setWaypoints([
                        L.latLng(userLat, userLng),
                        L.latLng(church.lat, church.lng),
                      ]);
                    } catch (e) {
                      console.log("Route update in progress...");
                    }
                  }
                }

                lastPosition = currentPosition;
              },
              (err) => {
                console.error("Error getting location:", err);
                setError(`Location error: ${err.message}. Please enable GPS and refresh.`);
                setIsLoading(false);
              },
              { 
                enableHighAccuracy: true, 
                maximumAge: 0, 
                timeout: 10000 
              }
            );
          } else {
            setError("Geolocation is not supported on your device.");
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Error initializing map:", err);
        setError(`Failed to load map: ${err.message}`);
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const openGoogleStreetView = () => {
    if (userLocation) {
      window.open(
        `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${userLocation.lat},${userLocation.lng}&heading=0&pitch=0&fov=80`,
        '_blank'
      );
    }
  };

  return (
    <div className="w-full h-screen relative bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 z-[9999]">
          <div className="text-center">
            <div className="text-7xl mb-6 animate-bounce">🗺️</div>
            <p className="text-white font-bold text-2xl mb-2">
              Starting Navigation...
            </p>
            <p className="text-blue-200 text-lg">
              Please allow location access
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-8 py-5 rounded-xl shadow-2xl z-[9999] max-w-md">
          <p className="font-bold text-xl mb-2">⚠️ Navigation Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {/* Navigation Header */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-600 to-blue-500 text-white px-6 py-4 shadow-2xl z-[1000]">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-semibold opacity-90">TO CHURCH</div>
                <div className="text-3xl font-bold">{distance} km</div>
                {duration && <div className="text-lg">{duration} min away</div>}
              </div>
              <button
                onClick={openGoogleStreetView}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2"
              >
                📷 Street View
              </button>
            </div>
          </div>

          {/* Direction Indicator */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl z-[1000]">
            <div className="text-center">
              <div className="text-2xl font-bold">{heading}</div>
            </div>
          </div>

          {/* Instructions Panel */}
          {instructions.length > 0 && (
            <div className="absolute top-52 right-6 bg-white rounded-xl shadow-2xl p-4 z-[1000] max-w-sm">
              <h3 className="font-bold text-lg mb-3 text-gray-800">📍 Next Steps:</h3>
              <div className="space-y-2">
                {instructions.map((inst, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-blue-600">{idx + 1}.</span>
                    <div className="flex-1">
                      <div className="text-gray-800">{inst.text}</div>
                      <div className="text-gray-500 text-xs">{inst.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Street Name Display */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-gray-800 text-white px-6 py-6 shadow-2xl z-[1000]">
            <div className="flex items-center gap-4">
              <div className="text-5xl animate-pulse">📍</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-400 uppercase mb-1">Current Location</div>
                <div className="text-2xl font-bold">{currentStreet}</div>
              </div>
              <div className="text-4xl">⛪</div>
            </div>
          </div>
        </>
      )}

      <div id="map" ref={mapRef} className="w-full h-full" />
      
      <style jsx global>{`
        @keyframes churchPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        @keyframes carPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .custom-church-icon,
        .custom-car-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }
        
        .leaflet-routing-container {
          display: none !important;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}