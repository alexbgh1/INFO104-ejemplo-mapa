import dynamic from "next/dynamic";

// Acá le decimos al programa que no utilizará "ssr" (Server Side Rendering)
// Esto significa que la librería se ejecutará en el cliente, no en el servidor
// Es necesario para evitar problemas de renderizado

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

// Cargando el mapa y pasándole props: filtros
export default function MapComponent({ filtros }) {
  return <Map filtros={filtros} />;
}
