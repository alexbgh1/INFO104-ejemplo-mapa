// Definimos los marcadores que se mostrarán en el mapa
export const markers = [
  {
    id: 1,
    nombre: "Casa 2",
    ubicacion: {
      lat: -39.823651901716296,
      lng: -73.242,
    },
  },
  {
    id: 2,
    nombre: "Casa 2",
    ubicacion: {
      lat: -39.823651901716296,
      lng: -73.23533346913247,
    },
  },
];

// Generamos una solicitud GET
// Es decir, cuando se solicite la ruta /api/marcadores
// Se ejecutará esta función y devolverá los marcadores
export default function handler(req, res) {
  res.status(200).json(markers);
}
