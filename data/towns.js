const municipalities = require('./municipalities');

const towns = [
  // ================= DISTRITO NACIONAL (Provincia 1) =================
  { id: 1, nombre: 'Los Tres Ojos', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 5.2, coordenadas: { lat: 18.4700, lng: -69.8700 } },
  { id: 2, nombre: 'Gazcue', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 2.1, coordenadas: { lat: 18.4750, lng: -69.8800 } },
  { id: 3, nombre: 'Zona Colonial', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 1.5, coordenadas: { lat: 18.4650, lng: -69.8850 } },
  { id: 4, nombre: 'Piantini', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 4.8, coordenadas: { lat: 18.4950, lng: -69.9100 } },
  { id: 5, nombre: 'Naco', municipio_id: 1, municipio: 'Santo Domingo', provincia_id: 1, provincia: 'Distrito Nacional', distancia_km: 6.2, coordenadas: { lat: 18.5050, lng: -69.9000 } },
  
  // ================= SANTO DOMINGO (Provincia 31) =================
  { id: 6, nombre: 'Boca Chica', municipio_id: 66, municipio: 'Santo Domingo Este', provincia_id: 31, provincia: 'Santo Domingo', distancia_km: 28.5, coordenadas: { lat: 18.4200, lng: -69.6500 } },
  { id: 7, nombre: 'Los Alcarrizos', municipio_id: 68, municipio: 'Santo Domingo Oeste', provincia_id: 31, provincia: 'Santo Domingo', distancia_km: 18.3, coordenadas: { lat: 18.5100, lng: -70.0200 } },
  { id: 8, nombre: 'Haina', municipio_id: 66, municipio: 'Santo Domingo Este', provincia_id: 31, provincia: 'Santo Domingo', distancia_km: 22.8, coordenadas: { lat: 18.4400, lng: -69.7500 } },
  { id: 9, nombre: 'Sabana Perdida', municipio_id: 68, municipio: 'Santo Domingo Oeste', provincia_id: 31, provincia: 'Santo Domingo', distancia_km: 25.1, coordenadas: { lat: 18.5600, lng: -69.9800 } },
  
  // ================= SAN CRISTÓBAL (Provincia 24) =================
  { id: 10, nombre: 'Los Llanos', municipio_id: 51, municipio: 'San Cristóbal', provincia_id: 24, provincia: 'San Cristóbal', distancia_km: 8.5, coordenadas: { lat: 18.4100, lng: -69.9200 } },
  { id: 11, nombre: 'Cambita Garabitos', municipio_id: 52, municipio: 'Castañuelas', provincia_id: 24, provincia: 'San Cristóbal', distancia_km: 15.2, coordenadas: { lat: 18.3800, lng: -69.9500 } },
  { id: 12, nombre: 'El Molino', municipio_id: 51, municipio: 'San Cristóbal', provincia_id: 24, provincia: 'San Cristóbal', distancia_km: 12.8, coordenadas: { lat: 18.4500, lng: -69.9200 } },
  
  // ================= AZUA (Provincia 2) =================
  { id: 13, nombre: 'Las Yayas', municipio_id: 2, municipio: 'Azua de Compostela', provincia_id: 2, provincia: 'Azua', distancia_km: 18.4, coordenadas: { lat: 18.3800, lng: -70.6800 } },
  { id: 14, nombre: 'Jumá', municipio_id: 2, municipio: 'Azua de Compostela', provincia_id: 2, provincia: 'Azua', distancia_km: 22.5, coordenadas: { lat: 18.4200, lng: -70.8000 } },
  { id: 15, nombre: 'Estebanía', municipio_id: 2, municipio: 'Azua de Compostela', provincia_id: 2, provincia: 'Azua', distancia_km: 25.8, coordenadas: { lat: 18.5000, lng: -70.6500 } },
  
  // ================= BAORUCO (Provincia 3) =================
  { id: 16, nombre: 'Las Lajas', municipio_id: 5, municipio: 'Vicente Noble', provincia_id: 3, provincia: 'Baoruco', distancia_km: 8.2, coordenadas: { lat: 18.3800, lng: -71.3200 } },
  { id: 17, nombre: 'Fondura', municipio_id: 6, municipio: 'Barahona', provincia_id: 3, provincia: 'Baoruco', distancia_km: 12.5, coordenadas: { lat: 18.2200, lng: -71.0800 } },
  
  // ================= BARAHONA (Provincia 4) =================
  { id: 18, nombre: 'Paraíso', municipio_id: 8, municipio: 'Santa Cruz de Barahona', provincia_id: 4, provincia: 'Barahona', distancia_km: 8.5, coordenadas: { lat: 18.1800, lng: -71.0500 } },
  { id: 19, nombre: 'Cabral', municipio_id: 7, municipio: 'Cabral', provincia_id: 3, provincia: 'Baoruco', distancia_km: 15.2, coordenadas: { lat: 18.2800, lng: -71.2500 } },
  { id: 20, nombre: 'Fondura', municipio_id: 8, municipio: 'Santa Cruz de Barahona', provincia_id: 4, provincia: 'Barahona', distancia_km: 18.3, coordenadas: { lat: 18.1200, lng: -71.1800 } },
  
  // ================= DAJABÓN (Provincia 5) =================
  { id: 21, nombre: 'Líbano', municipio_id: 10, municipio: 'Dajabón', provincia_id: 5, provincia: 'Dajabón', distancia_km: 12.8, coordenadas: { lat: 19.6167, lng: -71.5500 } },
  { id: 22, nombre: 'Campamento', municipio_id: 10, municipio: 'Dajabón', provincia_id: 5, provincia: 'Dajabón', distancia_km: 18.5, coordenadas: { lat: 19.5800, lng: -71.7500 } },
  
  // ================= DUARTE (Provincia 6) =================
  { id: 23, nombre: 'Galbán', municipio_id: 12, municipio: 'San Francisco de Macorís', provincia_id: 6, provincia: 'Duarte', distancia_km: 7.2, coordenadas: { lat: 19.3000, lng: -70.2000 } },
  { id: 24, nombre: 'Pimentel', municipio_id: 13, municipio: 'Pimentel', provincia_id: 6, provincia: 'Duarte', distancia_km: 15.8, coordenadas: { lat: 19.3167, lng: -70.1667 } },
  
  // ================= ELÍAS PIÑA (Provincia 7) =================
  { id: 25, nombre: 'Comendador', municipio_id: 15, municipio: 'Comendador', provincia_id: 7, provincia: 'Elías Piña', distancia_km: 0.0, coordenadas: { lat: 18.9500, lng: -71.5667 } },
  { id: 26, nombre: 'San Miguel de la Atalaya', municipio_id: 15, municipio: 'Comendador', provincia_id: 7, provincia: 'Elías Piña', distancia_km: 12.5, coordenadas: { lat: 18.9800, lng: -71.6200 } },
  
  // ================= EL SEIBO (Provincia 8) =================
  { id: 27, nombre: 'Miches', municipio_id: 18, municipio: 'Miches', provincia_id: 8, provincia: 'El Seibo', distancia_km: 0.0, coordenadas: { lat: 18.9167, lng: -68.8167 } },
  { id: 28, nombre: 'Santa Cruz del Seibo', municipio_id: 17, municipio: 'Santa Cruz del Seibo', provincia_id: 8, provincia: 'El Seibo', distancia_km: 0.0, coordenadas: { lat: 18.8281, lng: -69.0506 } },
  
  // ================= ESPAILLAT (Provincia 9) =================
  { id: 29, nombre: 'Gaspar Hernández', municipio_id: 20, municipio: 'Gaspar Hernández', provincia_id: 9, provincia: 'Espaillat', distancia_km: 0.0, coordenadas: { lat: 19.5000, lng: -70.5833 } },
  { id: 30, nombre: 'Gastón', municipio_id: 20, municipio: 'Gaspar Hernández', provincia_id: 9, provincia: 'Espaillat', distancia_km: 8.5, coordenadas: { lat: 19.4800, lng: -70.5500 } },
  
  // ================= HATO MAYOR (Provincia 10) =================
  { id: 31, nombre: 'El Valle', municipio_id: 22, municipio: 'El Valle', provincia_id: 10, provincia: 'Hato Mayor', distancia_km: 0.0, coordenadas: { lat: 18.9167, lng: -69.2333 } },
  { id: 32, nombre: 'Sabana Grande de Yagüita', municipio_id: 21, municipio: 'Hato Mayor del Rey', provincia_id: 10, provincia: 'Hato Mayor', distancia_km: 12.8, coordenadas: { lat: 18.8500, lng: -69.3800 } },
  
  // ================= HERMANAS MIRABAL (Provincia 11) =================
  { id: 33, nombre: 'Tenares', municipio_id: 24, municipio: 'Tenares', provincia_id: 11, provincia: 'Hermanas Mirabal', distancia_km: 0.0, coordenadas: { lat: 19.3833, lng: -70.3333 } },
  { id: 34, nombre: 'Salcedo', municipio_id: 23, municipio: 'Salcedo', provincia_id: 11, provincia: 'Hermanas Mirabal', distancia_km: 5.8, coordenadas: { lat: 19.3167, lng: -70.3667 } },
  
  // ================= INDEPENDENCIA (Provincia 12) =================
  { id: 35, nombre: 'Las Matas de Farfán', municipio_id: 25, municipio: 'Las Matas de Farfán', provincia_id: 12, provincia: 'Independencia', distancia_km: 0.0, coordenadas: { lat: 18.2333, lng: -72.1833 } },
  { id: 36, nombre: 'Bellemar', municipio_id: 26, municipio: 'Jimaní', provincia_id: 12, provincia: 'Independencia', distancia_km: 8.2, coordenadas: { lat: 18.2200, lng: -72.0500 } },
  
  // ================= LA ALTAGRACIA (Provincia 13) =================
  { id: 37, nombre: 'Punta Cana', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 45.0, coordenadas: { lat: 18.5333, lng: -68.3667 } },
  { id: 38, nombre: 'Bávaro', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 48.5, coordenadas: { lat: 18.6833, lng: -68.4167 } },
  { id: 39, nombre: 'Cap Cana', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 38.2, coordenadas: { lat: 18.4667, lng: -68.9667 } },
  { id: 40, nombre: 'Juanillo', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 52.0, coordenadas: { lat: 18.7000, lng: -68.4333 } },
  { id: 41, nombre: 'Uvero Alto', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 58.3, coordenadas: { lat: 18.7833, lng: -68.4500 } },
  { id: 42, nombre: 'Macao', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 50.1, coordenadas: { lat: 18.7167, lng: -68.4167 } },
  { id: 43, nombre: 'Cabeza de Toro', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 42.8, coordenadas: { lat: 18.7333, lng: -68.4167 } },
  { id: 44, nombre: 'Verón', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 40.5, coordenadas: { lat: 18.5800, lng: -68.8200 } },
  { id: 45, nombre: 'Arena Gorda', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 55.2, coordenadas: { lat: 18.7500, lng: -68.4000 } },
  { id: 46, nombre: 'Cortecito', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 47.8, coordenadas: { lat: 18.6900, lng: -68.4200 } },
  { id: 47, nombre: 'Las Ballenas', municipio_id: 27, municipio: 'Higüey', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 53.5, coordenadas: { lat: 18.7200, lng: -68.3900 } },
  { id: 48, nombre: 'Río San Juan', municipio_id: 28, municipio: 'Río San Juan', provincia_id: 13, provincia: 'La Altagracia', distancia_km: 0.0, coordenadas: { lat: 18.9167, lng: -69.0167 } },
  
  // ================= LA ROMANA (Provincia 14) =================
  { id: 49, nombre: 'Casa de Campo', municipio_id: 29, municipio: 'La Romana', provincia_id: 14, provincia: 'La Romana', distancia_km: 12.5, coordenadas: { lat: 18.4000, lng: -68.9167 } },
  { id: 50, nombre: 'Bayahibe', municipio_id: 29, municipio: 'La Romana', provincia_id: 14, provincia: 'La Romana', distancia_km: 28.3, coordenadas: { lat: 18.3500, lng: -68.9667 } },
  { id: 51, nombre: 'Dominicus', municipio_id: 29, municipio: 'La Romana', provincia_id: 14, provincia: 'La Romana', distancia_km: 26.8, coordenadas: { lat: 18.3417, lng: -68.9667 } },
  { id: 52, nombre: 'Guayacán', municipio_id: 30, municipio: 'Guayacán', provincia_id: 14, provincia: 'La Romana', distancia_km: 18.5, coordenadas: { lat: 18.5000, lng: -68.9000 } },
  
  // ================= LA VEGA (Provincia 15) =================
  { id: 53, nombre: 'Río Blanco', municipio_id: 31, municipio: 'Concepción de La Vega', provincia_id: 15, provincia: 'La Vega', distancia_km: 8.9, coordenadas: { lat: 19.0500, lng: -70.4800 } },
  { id: 54, nombre: 'Jarabacoa', municipio_id: 32, municipio: 'Jarabacoa', provincia_id: 15, provincia: 'La Vega', distancia_km: 35.2, coordenadas: { lat: 19.1333, lng: -70.7167 } },
  { id: 55, nombre: 'Constanza', municipio_id: 33, municipio: 'Constanza', provincia_id: 15, provincia: 'La Vega', distancia_km: 52.8, coordenadas: { lat: 19.0833, lng: -70.8167 } },
  { id: 56, nombre: 'San José de las Matas', municipio_id: 31, municipio: 'Concepción de La Vega', provincia_id: 15, provincia: 'La Vega', distancia_km: 48.5, coordenadas: { lat: 19.2000, lng: -70.9000 } },
  
  // ================= MARÍA TRINIDAD SÁNCHEZ (Provincia 16) =================
  { id: 57, nombre: 'Cabrera', municipio_id: 35, municipio: 'Cabrera', provincia_id: 16, provincia: 'María Trinidad Sánchez', distancia_km: 0.0, coordenadas: { lat: 19.4167, lng: -69.6333 } },
  { id: 58, nombre: 'Las Tunas', municipio_id: 34, municipio: 'Nagua', provincia_id: 16, provincia: 'María Trinidad Sánchez', distancia_km: 12.5, coordenadas: { lat: 19.2800, lng: -69.8000 } },
  
  // ================= MONSEÑOR NOUEL (Provincia 17) =================
  { id: 59, nombre: 'Bonao', municipio_id: 36, municipio: 'Bonao', provincia_id: 17, provincia: 'Monseñor Nouel', distancia_km: 0.0, coordenadas: { lat: 18.9333, lng: -70.4667 } },
  { id: 60, nombre: 'Piedra Blanca', municipio_id: 37, municipio: 'Villa Altagracia', provincia_id: 17, provincia: 'Monseñor Nouel', distancia_km: 15.2, coordenadas: { lat: 18.8800, lng: -70.4200 } },
  
  // ================= MONTE CRISTI (Provincia 18) =================
  { id: 61, nombre: 'Las Guáranas', municipio_id: 38, municipio: 'Monte Cristi', provincia_id: 18, provincia: 'Monte Cristi', distancia_km: 18.5, coordenadas: { lat: 19.5800, lng: -70.7500 } },
  { id: 62, nombre: 'Guayabal', municipio_id: 39, municipio: 'Guayubín', provincia_id: 18, provincia: 'Monte Cristi', distancia_km: 25.8, coordenadas: { lat: 19.5833, lng: -71.3500 } },
  
  // ================= MONTE PLATA (Provincia 19) =================
  { id: 63, nombre: 'Yamasá', municipio_id: 41, municipio: 'Yamasá', provincia_id: 19, provincia: 'Monte Plata', distancia_km: 0.0, coordenadas: { lat: 18.6833, lng: -69.8333 } },
  { id: 64, nombre: 'Chimán', municipio_id: 40, municipio: 'Monte Plata', provincia_id: 19, provincia: 'Monte Plata', distancia_km: 8.2, coordenadas: { lat: 18.7500, lng: -69.7000 } },
  
  // ================= PEDERNALES (Provincia 20) =================
  { id: 65, nombre: 'Oviedo', municipio_id: 43, municipio: 'Oviedo', provincia_id: 20, provincia: 'Pedernales', distancia_km: 0.0, coordenadas: { lat: 18.1500, lng: -71.5500 } },
  { id: 66, nombre: 'Las Salinas', municipio_id: 42, municipio: 'Pedernales', provincia_id: 20, provincia: 'Pedernales', distancia_km: 12.8, coordenadas: { lat: 18.1200, lng: -71.6800 } },
  
  // ================= PERAVIA (Provincia 21) =================
  { id: 67, nombre: 'Nizao', municipio_id: 45, municipio: 'Nizao', provincia_id: 21, provincia: 'Peravia', distancia_km: 0.0, coordenadas: { lat: 18.5167, lng: -70.3667 } },
  { id: 68, nombre: 'Las Caobas', municipio_id: 44, municipio: 'Baní', provincia_id: 21, provincia: 'Peravia', distancia_km: 18.2, coordenadas: { lat: 18.4200, lng: -70.4500 } },
  
  // ================= PUERTO PLATA (Provincia 22) =================
  { id: 69, nombre: 'Villa Montellano', municipio_id: 46, municipio: 'Puerto Plata', provincia_id: 22, provincia: 'Puerto Plata', distancia_km: 12.5, coordenadas: { lat: 19.7500, lng: -70.7500 } },
  { id: 70, nombre: 'Imbert', municipio_id: 47, municipio: 'Sosúa', provincia_id: 22, provincia: 'Puerto Plata', distancia_km: 8.8, coordenadas: { lat: 19.7800, lng: -70.5800 } },
  { id: 71, nombre: 'Los Hidalgos', municipio_id: 46, municipio: 'Puerto Plata', provincia_id: 22, provincia: 'Puerto Plata', distancia_km: 15.2, coordenadas: { lat: 19.8200, lng: -70.7200 } },
  { id: 72, nombre: 'Altamira', municipio_id: 46, municipio: 'Puerto Plata', provincia_id: 22, provincia: 'Puerto Plata', distancia_km: 18.5, coordenadas: { lat: 19.7200, lng: -70.6200 } },
  
  // ================= SAMANÁ (Provincia 23) =================
  { id: 73, nombre: 'Santa Bárbara', municipio_id: 50, municipio: 'Santa Bárbara de Samaná', provincia_id: 23, provincia: 'Samaná', distancia_km: 0.0, coordenadas: { lat: 19.2500, lng: -69.3333 } },
  { id: 74, nombre: 'El Catey', municipio_id: 49, municipio: 'Sánchez', provincia_id: 23, provincia: 'Samaná', distancia_km: 18.5, coordenadas: { lat: 19.2833, lng: -69.7667 } },
  { id: 75, nombre: 'Las Galeras', municipio_id: 50, municipio: 'Santa Bárbara de Samaná', provincia_id: 23, provincia: 'Samaná', distancia_km: 22.3, coordenadas: { lat: 19.2167, lng: -69.2000 } },
  { id: 76, nombre: 'Cayo Levantado', municipio_id: 50, municipio: 'Santa Bárbara de Samaná', provincia_id: 23, provincia: 'Samaná', distancia_km: 25.8, coordenadas: { lat: 19.2333, lng: -69.1833 } },
  { id: 77, nombre: 'El Progreso', municipio_id: 50, municipio: 'Santa Bárbara de Samaná', provincia_id: 23, provincia: 'Samaná', distancia_km: 8.5, coordenadas: { lat: 19.2800, lng: -69.3800 } },
  
  // ================= SANTIAGO (Provincia 29) =================
  { id: 78, nombre: 'Tamboril', municipio_id: 61, municipio: 'Santiago de los Caballeros', provincia_id: 29, provincia: 'Santiago', distancia_km: 8.5, coordenadas: { lat: 19.5200, lng: -70.6800 } },
  { id: 79, nombre: 'Luperón', municipio_id: 61, municipio: 'Santiago de los Caballeros', provincia_id: 29, provincia: 'Santiago', distancia_km: 15.2, coordenadas: { lat: 19.4800, lng: -70.8200 } },
  { id: 80, nombre: 'Jánico', municipio_id: 61, municipio: 'Santiago de los Caballeros', provincia_id: 29, provincia: 'Santiago', distancia_km: 18.8, coordenadas: { lat: 19.5500, lng: -70.6200 } },
  { id: 81, nombre: 'Cienegueta', municipio_id: 61, municipio: 'Santiago de los Caballeros', provincia_id: 29, provincia: 'Santiago', distancia_km: 12.5, coordenadas: { lat: 19.4200, lng: -70.7800 } },
  
  // ================= SANTIAGO RODRÍGUEZ (Provincia 30) =================
  { id: 82, nombre: 'Sabaneta', municipio_id: 64, municipio: 'San Ignacio de Sabaneta', provincia_id: 30, provincia: 'Santiago Rodríguez', distancia_km: 0.0, coordenadas: { lat: 19.5000, lng: -71.3333 } },
  { id: 83, nombre: 'Monción', municipio_id: 65, municipio: 'Monción', provincia_id: 30, provincia: 'Santiago Rodríguez', distancia_km: 12.8, coordenadas: { lat: 19.4333, lng: -71.2333 } },
  { id: 84, nombre: 'Tres Cruces', municipio_id: 64, municipio: 'San Ignacio de Sabaneta', provincia_id: 30, provincia: 'Santiago Rodríguez', distancia_km: 8.2, coordenadas: { lat: 19.5200, lng: -71.3800 } },
  
  // ================= SÁNCHEZ RAMÍREZ (Provincia 28) =================
  { id: 85, nombre: 'Fantino', municipio_id: 60, municipio: 'Fantino', provincia_id: 28, provincia: 'Sánchez Ramírez', distancia_km: 0.0, coordenadas: { lat: 18.9500, lng: -70.0167 } },
  { id: 86, nombre: 'La Vega Vieja', municipio_id: 59, municipio: 'Cotuí', provincia_id: 28, provincia: 'Sánchez Ramírez', distancia_km: 15.8, coordenadas: { lat: 19.0200, lng: -70.1500 } },
  
  // ================= SAN JOSÉ DE OCOA (Provincia 25) =================
  { id: 87, nombre: 'Rancho Arriba', municipio_id: 54, municipio: 'Rancho Arriba', provincia_id: 25, provincia: 'San José de Ocoa', distancia_km: 0.0, coordenadas: { lat: 18.7167, lng: -70.6000 } },
  { id: 88, nombre: 'Palo Hincado', municipio_id: 53, municipio: 'San José de Ocoa', provincia_id: 25, provincia: 'San José de Ocoa', distancia_km: 12.5, coordenadas: { lat: 18.6800, lng: -70.5800 } },
  
  // ================= SAN JUAN (Provincia 26) =================
  { id: 89, nombre: 'Guanajayabo', municipio_id: 55, municipio: 'San Juan de la Maguana', provincia_id: 26, provincia: 'San Juan', distancia_km: 8.2, coordenadas: { lat: 18.7200, lng: -71.2500 } },
  { id: 90, nombre: 'El Llano', municipio_id: 56, municipio: 'Elías Piña', provincia_id: 26, provincia: 'San Juan', distancia_km: 15.5, coordenadas: { lat: 18.6500, lng: -71.3200 } },
  { id: 91, nombre: 'Galván', municipio_id: 55, municipio: 'San Juan de la Maguana', provincia_id: 26, provincia: 'San Juan', distancia_km: 18.8, coordenadas: { lat: 18.6800, lng: -71.1800 } },
  
  // ================= SAN PEDRO DE MACORÍS (Provincia 27) =================
  { id: 92, nombre: 'Guayabal', municipio_id: 58, municipio: 'Guayabal', provincia_id: 27, provincia: 'San Pedro de Macorís', distancia_km: 0.0, coordenadas: { lat: 18.5333, lng: -69.2833 } },
  { id: 93, nombre: 'Quisqueya', municipio_id: 57, municipio: 'San Pedro de Macorís', provincia_id: 27, provincia: 'San Pedro de Macorís', distancia_km: 12.5, coordenadas: { lat: 18.4200, lng: -69.4200 } },
  
  // ================= VALVERDE (Provincia 32) =================
  { id: 94, nombre: 'Llanos de Espumillón', municipio_id: 69, municipio: 'Mao', provincia_id: 32, provincia: 'Valverde', distancia_km: 8.5, coordenadas: { lat: 19.5500, lng: -71.1500 } },
  { id: 95, nombre: 'Malpaso', municipio_id: 70, municipio: 'Laguna Salada', provincia_id: 32, provincia: 'Valverde', distancia_km: 15.2, coordenadas: { lat: 19.6200, lng: -71.0500 } }
];

module.exports = towns;
