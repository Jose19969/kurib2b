import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type * as Leaflet from "leaflet";
import { bestFit, projects, type OpportunityProject } from "@/data/mock";

/** Approximate locality coordinates for the sample projects */
const COORDS: Record<string, [number, number]> = {
  "green-meadows": [11.0795, 77.0005],
  "lotus-towers": [11.0275, 77.0265],
  "sri-sai-villas": [11.0245, 76.9045],
  "orchid-enclave": [10.9985, 76.9925],
  "emerald-court": [10.9995, 77.0335],
  "arun-villas": [11.0805, 76.9405],
  "marina-heights": [12.9010, 80.2280],
  "skyline-residences": [13.0355, 80.1575],
  "velan-hostel": [11.1250, 77.3150],
  "kumaran-mills": [11.0880, 77.3420],
};

export const DISTRICT_VIEWS: Record<string, { center: [number, number]; zoom: number }> = {
  Coimbatore: { center: [11.035, 76.97], zoom: 12 },
  Chennai: { center: [12.97, 80.19], zoom: 11 },
  Tiruppur: { center: [11.105, 77.33], zoom: 13 },
};

const tone = (p: OpportunityProject) => {
  const info = bestFit(p) === "switches" ? p.switches : p.solar;
  if (info.status === "Window closed") return "pin-closed";
  if (info.status === "Pitch now" || info.status === "This month") return "pin-now";
  return "pin-later";
};

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function TerritoryMap({ district, onDistrict, resultIds }: { district: string; onDistrict: (d: string) => void; resultIds: string[] }) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const layerRef = useRef<Leaflet.LayerGroup | null>(null);
  const libRef = useRef<typeof Leaflet | null>(null);
  const resultKey = resultIds.join(",");

  const draw = () => {
    const L = libRef.current, layer = layerRef.current;
    if (!L || !layer) return;
    layer.clearLayers();
    for (const p of projects) {
      const at = COORDS[p.id];
      if (!at) continue;
      const kind = bestFit(p);
      const info = kind === "switches" ? p.switches : p.solar;
      const dim = !resultIds.includes(p.id);
      const icon = L.divIcon({
        className: "map-pin-wrap",
        html: `<span class="map-pin ${tone(p)}${dim ? " pin-dim" : ""}">${info.score}</span>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -18],
      });
      L.marker(at, { icon, title: p.name, keyboard: true, riseOnHover: true })
        .bindPopup(
          `<div class="map-popup"><b>${esc(p.name)}</b><span>${esc(p.locality)}, ${esc(p.city)} · ${esc(p.units)}</span>` +
          `<span class="map-popup-status">${kind === "switches" ? "Smart switches" : "Rooftop solar"} ${info.score} · ${esc(info.status)}</span>` +
          `<a href="/opportunity/${p.id}">Open opportunity</a></div>`,
          { closeButton: false, minWidth: 200 },
        )
        .addTo(layer);
    }
  };

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then(mod => {
      const L = (mod as unknown as { default?: typeof Leaflet }).default ?? (mod as unknown as typeof Leaflet);
      if (cancelled || !el.current || mapRef.current) return;
      libRef.current = L;
      const view = DISTRICT_VIEWS[district] ?? { center: [11.035, 76.97] as [number, number], zoom: 12 };
      const map = L.map(el.current, { zoomControl: false, scrollWheelZoom: false }).setView(view.center, view.zoom);
      L.control.zoom({ position: "topright" }).addTo(map);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      draw();
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = DISTRICT_VIEWS[district];
    if (mapRef.current && view) mapRef.current.flyTo(view.center, view.zoom, { duration: 0.9 });
  }, [district]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { draw(); }, [resultKey]);

  return <div className="territory-map-wrap">
    <div ref={el} className="territory-map" role="region" aria-label={`Map of projects in ${district}`} />
    <div className="map-districts" role="group" aria-label="Choose district">
      {Object.keys(DISTRICT_VIEWS).map(d => <button key={d} aria-pressed={district === d} className={district === d ? "map-district map-district-active" : "map-district"} onClick={() => onDistrict(d)}>{d}</button>)}
    </div>
  </div>;
}
