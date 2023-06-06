// Leaflet
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { Icon } from "leaflet";

// React
import { useState, useEffect } from "react";

// Definimos un Icono personalizado
const myIcon = new L.Icon({
  iconUrl: "/images/marker.png", // esto referencia a : /public/images/marker.png
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [0, -36],
});

// ---- Acá comienza el Mapa ----
export default function Mapa() {
  // Usando 'useState' de React, creamos un estado para los "marcadores"
  const [marcadores, setMarcadores] = useState([]);

  // Usando 'useEffect' de React, ejecutamos una función cuando el componente se "monte"
  // Esto quiere decir, que se ejecuta cuando el componente se renderiza por primera vez
  useEffect(() => {
    // Obtener marcadores desde la API (/api/marcadores)
    fetch("/api/marcadores") // ···> Esto es una solicitud GET a la ruta /api/marcadores
      .then((res) => res.json()) // ···> Esto convierte la respuesta a JSON
      .then((data) => {
        setMarcadores(data); // ···> Esto es una función que se ejecuta cuando la respuesta llega (almacenamos la información solicitada)
      });
  }, []); // <···· Si la dependencia es [] (arreglo vacío), se ejecuta solo una vez

  const position_valdivia = [-39.823651901716296, -73.23533346913247];
  return (
    <>
      <div>
        {/* Configuraciones generales del Mapa, zoom, scroll, etc */}
        <MapContainer
          id="map"
          center={position_valdivia}
          zoom={14}
          scrollWheelZoom={false}
        >
          {/* Tipo de mapa */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 
            Iteramos utilizando ".map": Es una función para iterar sobre un arreglo (nuestro arreglo de "marcadores")
            Al usar map, podemos difinir un nombre para cada elemento del arreglo ("marcador") y podemos acceder a sus atributos
            Ejemplo: marcador.nombre, marcador.ubicacion.lat, marcador.ubicacion.lng
            (La estructura dependerá de cómo lo definimos en /api/marcadores)

            De esta manera estamos generando puntos "dinámicos" en el mapa, en vez de colocarlos uno a uno manualmente
            */}
          {marcadores.map((marcador) => (
            <Marker
              key={marcador.id}
              position={[marcador.ubicacion.lat, marcador.ubicacion.lng]}
              icon={myIcon}
            >
              <Popup>{marcador.nombre}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}
