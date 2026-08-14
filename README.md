# API República Dominicana

API REST completa que proporciona información sobre todas las **provincias**, **municipios** y **pueblos/zonas aledanas** de la República Dominicana.

## Características

- ✅ **32 provincias** con capital, área, población y coordenadas
- ✅ **70 municipios** vinculados a sus provincias
- ✅ **30 pueblos/zonas aledanas** con distancia al municipio principal
- ✅ **Soporte multi-formato**: JSON y XML
- ✅ **Paginación** integrada para manejar grandes conjuntos de datos
- ✅ **Filtros avanzados** por nombre, provincia, población y área
- ✅ **API RESTful** con convenciones estándar

## Instalación

```bash
cd /home/nx/Documents/api-rd-completa
npm install
npm start
```

La API se ejecutará en `http://0.0.0.0:3001`

## Configuración

Variables de entorno en `.env`:

```env
PORT=3001
HOST=0.0.0.0
NODE_ENV=development
APP_NAME="API República Dominicana"
DEFAULT_FORMAT=json
```

## Endpoints

### Root & Health

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Documentación de la API y estadísticas |
| GET | `/health` | Verificar estado del servicio |

### Provincias

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/provinces` | Listar todas las provincias |
| GET | `/provinces/{id}` | Obtener provincia por ID |
| GET | `/provinces/name/{name}` | Buscar provincia por nombre |
| GET | `/provinces/{id}/municipalities` | Listar municipios de una provincia |

### Municipios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/municipalities` | Listar todos los municipios |
| GET | `/municipalities/{id}` | Obtener municipio por ID |
| GET | `/municipalities/name/{name}` | Buscar municipio por nombre |
| GET | `/municipalities/province/{provinceId}` | Listar municipios por provincia |

### Pueblos/Zonas Aledanas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/towns` | Listar todos los pueblos |
| GET | `/towns/{id}` | Obtener pueblo por ID |
| GET | `/towns/name/{name}` | Buscar pueblo por nombre |
| GET | `/towns/municipality/{municipalityId}` | Listar pueblos de un municipio |

## Parámetros de Consulta (Query Parameters)

### Paginación

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Número de página |
| `limit` | integer | 10 | Elementos por página |

### Formato

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `format` | string | json | `json` o `xml` |

### Filtros Disponibles

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `nombre` | string | Filtrar por nombre (búsqueda parcial) |
| `provincia_id` | integer | Filtrar por ID de provincia |
| `provincia` | string | Filtrar por nombre de provincia |
| `municipio_id` | integer | Filtrar por ID de municipio |
| `min_poblacion` | integer | Población mínima |
| `max_poblacion` | integer | Población máxima |
| `min_area` | float | Área mínima en km² |
| `max_area` | float | Área máxima en km² |

## Ejemplos de Uso

### Listar provincias (primera página, 5 resultados)

```bash
curl "http://localhost:3001/provinces?page=1&limit=5"
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2026-08-14T01:16:11.807Z",
  "format": "json",
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 32,
    "totalPages": 7
  },
  "data": [...]
}
```

### Buscar provincia por nombre

```bash
curl "http://localhost:3001/provinces/name/Santiago"
```

### Filtrar provincias por población mínima

```bash
curl "http://localhost:3001/provinces?min_poblacion=500000"
```

### Obtener respuesta en XML

```bash
curl "http://localhost:3001/provinces?limit=2&format=xml"
```

**Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response format="xml" timestamp="2026-08-14T01:16:11.807Z">
  <success>true</success>
  <pagination>
    <page>1</page>
    <limit>2</limit>
    <total>32</total>
    <totalPages>16</totalPages>
  </pagination>
  <data>
    <item>
      <id>1</id>
      <nombre>Distrito Nacional</nombre>
      <capital>Santo Domingo</capital>
      ...
    </item>
  </data>
</response>
```

### Listar municipios de una provincia específica

```bash
curl "http://localhost:3001/provinces/29/municipalities?limit=10"
```

### Buscar pueblos en una provincia

```bash
curl "http://localhost:3001/towns?provincia=Santiago&limit=5"
```

## Estructura de Datos

### Provincia

```json
{
  "id": 1,
  "nombre": "Distrito Nacional",
  "capital": "Santo Domingo",
  "area_km2": 104.44,
  "poblacion": 1019407,
  "coordenadas": {
    "lat": 18.4861,
    "lng": -69.8922
  }
}
```

### Municipio

```json
{
  "id": 1,
  "nombre": "Santo Domingo",
  "provincia_id": 1,
  "provincia": "Distrito Nacional",
  "area_km2": 104.44,
  "poblacion": 1019407,
  "coordenadas": {
    "lat": 18.4861,
    "lng": -69.8922
  }
}
```

### Pueblo/Zona Aledaña

```json
{
  "id": 1,
  "nombre": "Los Tres Ojos",
  "municipio_id": 1,
  "municipio": "Santo Domingo",
  "provincia_id": 1,
  "provincia": "Distrito Nacional",
  "distancia_km": 5.2,
  "coordenadas": {
    "lat": 18.47,
    "lng": -69.87
  }
}
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 201 | Creado |
| 400 | Bad Request (parámetros inválidos) |
| 404 | Not Found (recurso no encontrado) |
| 500 | Internal Server Error |

## Estadísticas

- **Total de provincias**: 32
- **Total de municipios**: 70
- **Total de pueblos/zonas**: 30

## Autor

**TecnoNX**

## Licencia

MIT

## Enlaces

- Repository: `https://github.com/TecnoNX/api-rd-completa`
- Documentation: `http://localhost:3001/`
