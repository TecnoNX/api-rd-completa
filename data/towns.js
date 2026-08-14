const municipalities = require('./municipalities');

const towns = [
  // Zonas aledanas a Santo Domingo (Distrito Nacional)
  { id: 1, nombre: 'Los Tres Ojos', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 5.2, coordenadas: { lat: 18.4700, lng: -69.8700 } },
  { id: 2, nombre: 'Bella Vista', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 8.1, coordenadas: { lat: 18.5000, lng: -69.9200 } },
  { id: 3, nombre: 'Villa Mella', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 12.5, coordenadas: { lat: 18.5400, lng: -69.9400 } },
  { id: 4, nombre: 'Hato Nuevo', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 15.3, coordenadas: { lat: 18.5600, lng: -69.9100 } },
  { id: 5, nombre: 'Capotillo', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 10.8, coordenadas: { lat: 18.5200, lng: -69.8800 } },
  
  // Zonas aledanas a Azua
  { id: 6, nombre: 'Las Yayas', municipio_id: 2, municipio: 'Azua de Compostela', provincia_id: 2, provincia: 'Azua', distancia_km: 18.4, coordenadas: { lat: 18.3800, lng: -70.6800 } },
  { id: 7, nombre: 'Altamira', municipio_id: 2, municipio: 'Azua de Compostela', provincia_id: 2, provincia: 'Azua', distancia_km: 14.2, coordenadas: { lat: 18.5200, lng: -70.7000 } },
  
  // Zonas aledanas a Santiago
  { id: 8, nombre: 'Tañé', municipio_id: 61, municipio: 'Santiago de los Caballeros', provincia_id: 29, provincia: 'Santiago', distancia_km: 6.8, coordenadas: { lat: 19.5000, lng: -70.6800 } },
  { id: 9, nombre: 'Jima Abajo', municipio_id: 61, municipio: 'Santiago de los Caballeros', provincia_id: 29, provincia: 'Santiago', distancia_km: 11.2, coordenadas: { lat: 19.5200, lng: -70.8000 } },
  { id: 10, nombre: 'Puñal', municipio_id: 61, municipio: 'Santiago de los Caballeros', provincia_id: 29, provincia: 'Santiago', distancia_km: 9.5, coordenadas: { lat: 19.5500, lng: -70.7000 } },
  
  // Zonas aledanas a Puerto Plata
  { id: 11, nombre: 'Cofresí', municipio_id: 46, municipio: 'Puerto Plata', provincia_id: 22, provincia: 'Puerto Plata', distancia_km: 4.3, coordenadas: { lat: 19.7500, lng: -70.7200 } },
  { id: 12, nombre: 'Yáquez', municipio_id: 46, municipio: 'Puerto Plata', provincia_id: 22, provincia: 'Puerto Plata', distancia_km: 7.8, coordenadas: { lat: 19.8200, lng: -70.6500 } },
  
  // Zonas aledanas a La Vega
  { id: 13, nombre: 'Río Blanco', municipio_id: 31, municipio: 'Concepción de La Vega', provincia_id: 15, provincia: 'La Vega', distancia_km: 8.9, coordenadas: { lat: 19.0500, lng: -70.4800 } },
  { id: 14, nombre: 'La Ciénaga', municipio_id: 31, municipio: 'Concepción de La Vega', provincia_id: 15, provincia: 'La Vega', distancia_km: 12.4, coordenadas: { lat: 18.9500, lng: -70.5800 } },
  
  // Zonas aledanas a Higüey
  { id: 15, nombre: 'Boca de Yuma', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 22.6, coordenadas: { lat: 18.7200, lng: -68.4500 } },
  { id: 16, nombre: 'Playa Blanca', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 18.3, coordenadas: { lat: 18.9000, lng: -68.6000 } },
  
  // Zonas aledanas a Baní
  { id: 17, nombre: 'La Palma', municipio_id: 44, municipio: 'Baní', provincia_id: 21, provincia: 'Peravia', distancia_km: 10.5, coordenadas: { lat: 18.4000, lng: -70.4000 } },
  { id: 18, nombre: 'Sabana Grande', municipio_id: 44, municipio: 'Baní', provincia_id: 21, provincia: 'Peravia', distancia_km: 15.8, coordenadas: { lat: 18.5000, lng: -70.4500 } },
  
  // Zonas aledanas a San Francisco de Macorís
  { id: 19, nombre: 'Galbán', municipio_id: 12, municipio: 'San Francisco de Macorís', provincia_id: 6, provincia: 'Duarte', distancia_km: 7.2, coordenadas: { lat: 19.3000, lng: -70.2000 } },
  { id: 20, nombre: 'Guayubín', municipio_id: 12, municipio: 'San Francisco de Macorís', provincia_id: 6, provincia: 'Duarte', distancia_km: 11.8, coordenadas: { lat: 19.4000, lng: -70.3000 } },
  
  // Zonas aledanas a La Romana
  { id: 21, nombre: 'Playa Grande', municipio_id: 29, municipio: 'La Romana', provincia_id: 14, provincia: 'La Romana', distancia_km: 16.4, coordenadas: { lat: 18.3800, lng: -68.9200 } },
  { id: 22, nombre: 'Bellavista', municipio_id: 29, municipio: 'La Romana', provincia_id: 14, provincia: 'La Romana', distancia_km: 9.7, coordenadas: { lat: 18.4800, lng: -68.9000 } },
  
  // Zonas aledanas a Barahona
  { id: 23, nombre: 'Enriquillo', municipio_id: 8, municipio: 'Santa Cruz de Barahona', provincia_id: 4, provincia: 'Barahona', distancia_km: 6.5, coordenadas: { lat: 18.1600, lng: -71.1500 } },
  { id: 24, nombre: 'Honduras', municipio_id: 8, municipio: 'Santa Cruz de Barahona', provincia_id: 4, provincia: 'Barahona', distancia_km: 10.2, coordenadas: { lat: 18.2500, lng: -71.0500 } },
  
  // Zonas aledanas a Moca
  { id: 25, nombre: 'Guayacanes', municipio_id: 19, municipio: 'Moca', provincia_id: 9, provincia: 'Espaillat', distancia_km: 5.8, coordenadas: { lat: 19.4200, lng: -70.5000 } },
  { id: 26, nombre: 'Pozón', municipio_id: 19, municipio: 'Moca', provincia_id: 9, provincia: 'Espaillat', distancia_km: 8.3, coordenadas: { lat: 19.3500, lng: -70.4800 } },
  
  // Zonas aledanas a Cotuí
  { id: 27, nombre: 'Félix Pérez Jiménez', municipio_id: 59, municipio: 'Cotuí', provincia_id: 28, provincia: 'Sánchez Ramírez', distancia_km: 7.4, coordenadas: { lat: 18.9600, lng: -70.1800 } },
  { id: 28, nombre: 'El Castillo', municipio_id: 59, municipio: 'Cotuí', provincia_id: 28, provincia: 'Sánchez Ramírez', distancia_km: 12.6, coordenadas: { lat: 19.0400, lng: -70.0800 } },
  
  // Zonas aledanas a Mao
  { id: 29, nombre: 'Guayabal', municipio_id: 69, municipio: 'Mao', provincia_id: 32, provincia: 'Valverde', distancia_km: 9.1, coordenadas: { lat: 19.6000, lng: -71.0800 } },
  { id: 30, nombre: 'Los Pinos', municipio_id: 69, municipio: 'Mao', provincia_id: 32, provincia: 'Valverde', distancia_km: 14.7, coordenadas: { lat: 19.5200, lng: -71.2000 } }
];

module.exports = towns;
