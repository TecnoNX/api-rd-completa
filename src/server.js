require('dotenv').config();
const express = require('express');
const cors = require('cors');
const xmlbuilder = require('xmlbuilder');

const provinces = require('../data/provinces');
const municipalities = require('../data/municipalities');
const towns = require('../data/towns');

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_FORMAT = process.env.DEFAULT_FORMAT || 'json';

// Middleware
app.use(cors());
app.use(express.json());

// Helper para formatear respuesta (JSON o XML)
const formatResponse = (res, data, format) => {
  if (format === 'xml') {
    const root = xmlbuilder.create('response', { encoding: 'UTF-8' });
    root.att('format', 'xml');
    root.att('timestamp', data.timestamp || new Date().toISOString());
    
    if (data.success !== undefined) {
      root.ele('success', data.success.toString());
    }
    
    if (data.pagination) {
      const pag = root.ele('pagination');
      pag.ele('page', data.pagination.page.toString());
      pag.ele('limit', data.pagination.limit.toString());
      pag.ele('total', data.pagination.total.toString());
      pag.ele('totalPages', data.pagination.totalPages.toString());
      if (data.pagination.hasNext !== undefined) {
        pag.ele('hasNext', data.pagination.hasNext.toString());
      }
      if (data.pagination.hasPrev !== undefined) {
        pag.ele('hasPrev', data.pagination.hasPrev.toString());
      }
    }
    
    if (data.filters) {
      const filters = root.ele('filters');
      Object.entries(data.filters).forEach(([key, value]) => {
        filters.ele(key, value);
      });
    }
    
    if (data.data && Array.isArray(data.data)) {
      const dataElem = root.ele('data');
      data.data.forEach((item, index) => {
        const itemElem = dataElem.ele('item');
        Object.entries(item).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            const objElem = itemElem.ele(key);
            Object.entries(value).forEach(([k, v]) => {
              objElem.ele(k, v.toString());
            });
          } else {
            itemElem.ele(key, value?.toString() || '');
          }
        });
      });
    } else if (data.data) {
      const dataElem = root.ele('data');
      Object.entries(data.data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          const objElem = dataElem.ele(key);
          Object.entries(value).forEach(([k, v]) => {
            objElem.ele(k, v.toString());
          });
        } else {
          dataElem.ele(key, value?.toString() || '');
        }
      });
    }
    
    if (data.error) {
      const error = root.ele('error');
      if (data.error.code) error.ele('code', data.error.code.toString());
      if (data.error.message) error.ele('message', data.error.message);
    }
    
    if (data.province) {
      const prov = root.ele('province');
      if (data.province.id) prov.ele('id', data.province.id.toString());
      if (data.province.nombre) prov.ele('nombre', data.province.nombre);
    }
    
    if (data.province_id) {
      root.ele('province_id', data.province_id.toString());
    }
    
    if (data.municipality_id) {
      root.ele('municipality_id', data.municipality_id.toString());
    }
    
    if (data.statistics) {
      const stats = root.ele('statistics');
      Object.entries(data.statistics).forEach(([key, value]) => {
        stats.ele(key, value.toString());
      });
    }
    
    if (data.documentation) {
      const doc = root.ele('documentation');
      if (data.documentation.description) doc.ele('description', data.documentation.description);
      if (data.documentation.formats) {
        const formats = doc.ele('formats');
        data.documentation.formats.forEach(f => formats.ele('format', f));
      }
    }
    
    if (data.message) {
      root.ele('message', data.message);
    }
    
    if (data.version) {
      root.ele('version', data.version);
    }
    
    if (data.status) {
      root.ele('status', data.status);
    }
    
    if (data.app) {
      root.ele('app', data.app);
    }
    
    if (data.filters && typeof data.filters === 'object' && !Array.isArray(data.filters)) {
      // Already handled above
    }
    
    res.type('application/xml').send(root.end({ pretty: true }));
  } else {
    res.json(data);
  }
};

// Helper para paginación
const paginate = (items, page = 1, limit = 10) => {
  const total = items.length;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: endIndex < total,
    hasPrev: startIndex > 0
  };
};

// Helper para filtrar
const filterItems = (items, filters) => {
  let filtered = [...items];
  
  if (filters.nombre) {
    const search = filters.nombre.toLowerCase();
    filtered = filtered.filter(item => 
      item.nombre.toLowerCase().includes(search)
    );
  }
  
  if (filters.provincia_id) {
    filtered = filtered.filter(item => 
      item.provincia_id === parseInt(filters.provincia_id)
    );
  }
  
  if (filters.provincia) {
    const search = filters.provincia.toLowerCase();
    filtered = filtered.filter(item => 
      item.provincia && item.provincia.toLowerCase().includes(search)
    );
  }
  
  if (filters.municipio_id) {
    filtered = filtered.filter(item => 
      item.municipio_id === parseInt(filters.municipio_id)
    );
  }
  
  if (filters.min_poblacion) {
    filtered = filtered.filter(item => 
      item.poblacion >= parseInt(filters.min_poblacion)
    );
  }
  
  if (filters.max_poblacion) {
    filtered = filtered.filter(item => 
      item.poblacion <= parseInt(filters.max_poblacion)
    );
  }
  
  if (filters.min_area) {
    filtered = filtered.filter(item => 
      item.area_km2 >= parseFloat(filters.min_area)
    );
  }
  
  if (filters.max_area) {
    filtered = filtered.filter(item => 
      item.area_km2 <= parseFloat(filters.max_area)
    );
  }
  
  return filtered;
};

// Determinar formato de respuesta
const getFormat = (req) => {
  const queryFormat = req.query.format;
  const acceptHeader = req.accepts(['json', 'xml']);
  return queryFormat || acceptHeader || DEFAULT_FORMAT;
};

// ================= PROVINCIAS ENDPOINTS =================
app.get('/provinces', (req, res) => {
  const format = getFormat(req);
  const { page = 1, limit = 10, ...filters } = req.query;
  
  let filtered = filterItems(provinces, filters);
  const pagination = paginate(filtered, page, limit);
  const paginatedData = filtered.slice(
    (page - 1) * limit, 
    parseInt(page) * limit
  );
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit)
    },
    filters: Object.keys(filters).length > 0 ? filters : null,
    data: paginatedData
  };
  
  formatResponse(res, response, format);
});

app.get('/provinces/:id', (req, res) => {
  const format = getFormat(req);
  const province = provinces.find(p => p.id === parseInt(req.params.id));
  
  if (!province) {
    const error = {
      success: false,
      timestamp: new Date().toISOString(),
      format: format,
      error: {
        code: 404,
        message: 'Provincia no encontrada'
      }
    };
    return formatResponse(res, error, format);
  }
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    data: province
  };
  
  formatResponse(res, response, format);
});

app.get('/provinces/name/:name', (req, res) => {
  const format = getFormat(req);
  const searchName = req.params.name.toLowerCase();
  const province = provinces.find(p => 
    p.nombre.toLowerCase() === searchName
  );
  
  if (!province) {
    const error = {
      success: false,
      timestamp: new Date().toISOString(),
      format: format,
      error: {
        code: 404,
        message: `Provincia "${req.params.name}" no encontrada`
      }
    };
    return formatResponse(res, error, format);
  }
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    data: province
  };
  
  formatResponse(res, response, format);
});

app.get('/provinces/:id/municipalities', (req, res) => {
  const format = getFormat(req);
  const { page = 1, limit = 10 } = req.query;
  
  const province = provinces.find(p => p.id === parseInt(req.params.id));
  if (!province) {
    const error = {
      success: false,
      timestamp: new Date().toISOString(),
      format: format,
      error: {
        code: 404,
        message: 'Provincia no encontrada'
      }
    };
    return formatResponse(res, error, format);
  }
  
  const provinceMunicipalities = municipalities.filter(
    m => m.provincia_id === province.id
  );
  
  const pagination = paginate(provinceMunicipalities, page, limit);
  const paginatedData = provinceMunicipalities.slice(
    (page - 1) * limit,
    parseInt(page) * limit
  );
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    province: {
      id: province.id,
      nombre: province.nombre
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: provinceMunicipalities.length,
      totalPages: Math.ceil(provinceMunicipalities.length / limit)
    },
    data: paginatedData
  };
  
  formatResponse(res, response, format);
});

// ================= MUNICIPIOS ENDPOINTS =================
app.get('/municipalities', (req, res) => {
  const format = getFormat(req);
  const { page = 1, limit = 10, ...filters } = req.query;
  
  let filtered = filterItems(municipalities, filters);
  const pagination = paginate(filtered, page, limit);
  const paginatedData = filtered.slice(
    (page - 1) * limit,
    parseInt(page) * limit
  );
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit)
    },
    filters: Object.keys(filters).length > 0 ? filters : null,
    data: paginatedData
  };
  
  formatResponse(res, response, format);
});

app.get('/municipalities/:id', (req, res) => {
  const format = getFormat(req);
  const municipality = municipalities.find(m => m.id === parseInt(req.params.id));
  
  if (!municipality) {
    const error = {
      success: false,
      timestamp: new Date().toISOString(),
      format: format,
      error: {
        code: 404,
        message: 'Municipio no encontrado'
      }
    };
    return formatResponse(res, error, format);
  }
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    data: municipality
  };
  
  formatResponse(res, response, format);
});

app.get('/municipalities/name/:name', (req, res) => {
  const format = getFormat(req);
  const searchName = req.params.name.toLowerCase();
  const municipality = municipalities.find(m => 
    m.nombre.toLowerCase() === searchName
  );
  
  if (!municipality) {
    const error = {
      success: false,
      timestamp: new Date().toISOString(),
      format: format,
      error: {
        code: 404,
        message: `Municipio "${req.params.name}" no encontrado`
      }
    };
    return formatResponse(res, error, format);
  }
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    data: municipality
  };
  
  formatResponse(res, response, format);
});

app.get('/municipalities/province/:provinceId', (req, res) => {
  const format = getFormat(req);
  const { page = 1, limit = 10 } = req.query;
  
  const provinceMunicipalities = municipalities.filter(
    m => m.provincia_id === parseInt(req.params.provinceId)
  );
  
  const pagination = paginate(provinceMunicipalities, page, limit);
  const paginatedData = provinceMunicipalities.slice(
    (page - 1) * limit,
    parseInt(page) * limit
  );
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    province_id: parseInt(req.params.provinceId),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: provinceMunicipalities.length,
      totalPages: Math.ceil(provinceMunicipalities.length / limit)
    },
    data: paginatedData
  };
  
  formatResponse(res, response, format);
});

// ================= TOWNS ENDPOINTS =================
app.get('/towns', (req, res) => {
  const format = getFormat(req);
  const { page = 1, limit = 10, ...filters } = req.query;
  
  let filtered = filterItems(towns, filters);
  const pagination = paginate(filtered, page, limit);
  const paginatedData = filtered.slice(
    (page - 1) * limit,
    parseInt(page) * limit
  );
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit)
    },
    filters: Object.keys(filters).length > 0 ? filters : null,
    data: paginatedData
  };
  
  formatResponse(res, response, format);
});

app.get('/towns/:id', (req, res) => {
  const format = getFormat(req);
  const town = towns.find(t => t.id === parseInt(req.params.id));
  
  if (!town) {
    const error = {
      success: false,
      timestamp: new Date().toISOString(),
      format: format,
      error: {
        code: 404,
        message: 'Pueblo no encontrado'
      }
    };
    return formatResponse(res, error, format);
  }
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    data: town
  };
  
  formatResponse(res, response, format);
});

app.get('/towns/name/:name', (req, res) => {
  const format = getFormat(req);
  const searchName = req.params.name.toLowerCase();
  const town = towns.find(t => 
    t.nombre.toLowerCase() === searchName
  );
  
  if (!town) {
    const error = {
      success: false,
      timestamp: new Date().toISOString(),
      format: format,
      error: {
        code: 404,
        message: `Pueblo "${req.params.name}" no encontrado`
      }
    };
    return formatResponse(res, error, format);
  }
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    data: town
  };
  
  formatResponse(res, response, format);
});

app.get('/towns/municipality/:municipalityId', (req, res) => {
  const format = getFormat(req);
  const { page = 1, limit = 10 } = req.query;
  
  const municipalityTowns = towns.filter(
    t => t.municipio_id === parseInt(req.params.municipalityId)
  );
  
  const pagination = paginate(municipalityTowns, page, limit);
  const paginatedData = municipalityTowns.slice(
    (page - 1) * limit,
    parseInt(page) * limit
  );
  
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    municipality_id: parseInt(req.params.municipalityId),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: municipalityTowns.length,
      totalPages: Math.ceil(municipalityTowns.length / limit)
    },
    data: paginatedData
  };
  
  formatResponse(res, response, format);
});

// ================= HEALTH & ROOT =================
app.get('/health', (req, res) => {
  const format = getFormat(req);
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    status: 'ok',
    app: process.env.APP_NAME || 'API República Dominicana',
    version: '1.0.0'
  };
  
  formatResponse(res, response, format);
});

app.get('/', (req, res) => {
  const format = getFormat(req);
  const response = {
    success: true,
    timestamp: new Date().toISOString(),
    format: format,
    message: `Bienvenido a ${process.env.APP_NAME || 'API República Dominicana'}`,
    version: '1.0.0',
    documentation: {
      description: 'API REST para obtener información de provincias, municipios y pueblos de la República Dominicana',
      formats: ['JSON', 'XML'],
      default_format: DEFAULT_FORMAT,
      endpoints: {
        provinces: {
          list: 'GET /provinces?format=json|xml&page=1&limit=10&nombre=X&provincia_id=X&min_poblacion=X&max_poblacion=X&min_area=X&max_area=X',
          byId: 'GET /provinces/{id}?format=json|xml',
          byName: 'GET /provinces/name/{name}?format=json|xml',
          municipalities: 'GET /provinces/{id}/municipalities?format=json|xml&page=1&limit=10'
        },
        municipalities: {
          list: 'GET /municipalities?format=json|xml&page=1&limit=10&nombre=X&provincia_id=X&provincia=X&min_poblacion=X&max_poblacion=X&min_area=X&max_area=X',
          byId: 'GET /municipalities/{id}?format=json|xml',
          byName: 'GET /municipalities/name/{name}?format=json|xml',
          byProvince: 'GET /municipalities/province/{provinceId}?format=json|xml&page=1&limit=10'
        },
        towns: {
          list: 'GET /towns?format=json|xml&page=1&limit=10&nombre=X&municipio_id=X&provincia=X&min_distancia=X&max_distancia=X',
          byId: 'GET /towns/{id}?format=json|xml',
          byName: 'GET /towns/name/{name}?format=json|xml',
          byMunicipality: 'GET /towns/municipality/{municipalityId}?format=json|xml&page=1&limit=10'
        }
      },
      filters: {
        nombre: 'Filtrar por nombre (partial match)',
        provincia_id: 'Filtrar por ID de provincia',
        provincia: 'Filtrar por nombre de provincia',
        municipio_id: 'Filtrar por ID de municipio',
        min_poblacion: 'Población mínima',
        max_poblacion: 'Población máxima',
        min_area: 'Área mínima en km²',
        max_area: 'Área máxima en km²'
      },
      pagination: {
        page: 'Número de página (default: 1)',
        limit: 'Elementos por página (default: 10, max: 100)'
      }
    },
    statistics: {
      total_provinces: provinces.length,
      total_municipalities: municipalities.length,
      total_towns: towns.length
    }
  };
  
  formatResponse(res, response, format);
});

app.listen(PORT, HOST, () => {
  console.log(`${process.env.APP_NAME || 'API República Dominicana'} corriendo en http://${HOST}:${PORT}`);
  console.log(`Formato por defecto: ${DEFAULT_FORMAT}`);
});

module.exports = app;
