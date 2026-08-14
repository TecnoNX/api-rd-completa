#!/usr/bin/env python3
import json
from pathlib import Path

data_dir = Path('/home/nx/Documents/api-rd-completa/data/json')
with open(data_dir / 'rd-2026.json', 'r') as f:
    data = json.load(f)

provinces = data['provinces']
municipalities = data['municipalities']
towns = data['towns']

report = ['# Cobertura Completa - República Dominicana 2026', '', '## Resumen General']
report.append(f'- **Provincias**: {len(provinces)}')
report.append(f'- **Municipios**: {len(municipalities)}')
report.append(f'- **Pueblos/Zonas**: {len(towns)}')
report.append('')
report.append('## Detalle por Provincia')
report.append('')

for prov in provinces:
    prov_id = prov['id']
    mun_list = [m for m in municipalities if m['provincia_id'] == prov_id]
    town_list = [t for t in towns if t['provincia_id'] == prov_id]
    
    report.append(f'### {prov["nombre"]}')
    report.append(f'- **ID**: {prov_id}')
    report.append(f'- **Capital**: {prov["capital"]}')
    report.append(f'- **Área**: {prov["area_km2"]} km²')
    report.append(f'- **Población**: {prov["poblacion"]:,}')
    report.append(f'- **Municipios**: {len(mun_list)}')
    report.append(f'- **Pueblos/Zonas**: {len(town_list)}')
    report.append('')
    
    if mun_list:
        report.append('**Municipios:**')
        for mun in mun_list:
            report.append(f'  - {mun["nombre"]}')
        report.append('')
    
    if town_list:
        report.append('**Pueblos/Zonas:**')
        for town in town_list:
            report.append(f'  - {town["nombre"]}')
        report.append('')
    
    report.append('---')
    report.append('')

output_path = Path('/home/nx/Documents/api-rd-completa/COBERTURA_2026.md')
with open(output_path, 'w') as f:
    f.write('\n'.join(report))

print(f'Reporte generado: {output_path}')
print(f'Total líneas: {len(report)}')
