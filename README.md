# Web IA LAB

Sitio web del **Laboratorio de Inteligencia Artificial de Neuquén**, iniciativa del Polo Tecnológico Confluencia vinculada al ecosistema de Vaca Muerta.

---

## Estructura del proyecto

```
WEB-IALAB-main/
├── index.html                  # Home
├── metodologia.html            # Metodología del laboratorio
├── eventos.html                # Eventos 2026
├── membresia.html              # Planes de membresía
├── css/
│   └── shared.css              # Estilos compartidos por todas las páginas
├── imagenes/
│   ├── LOGOIALAB.png
│   ├── POLO3.png               # Fondo principal
│   └── IA LAB*.jpg/jpeg        # Fotos del laboratorio
└── verticales/
    ├── energia.html
    ├── recursos-humanos.html
    ├── salud.html
    ├── marketing.html
    ├── ciencias-economicas.html
    ├── arquitectura.html
    ├── derecho.html
    └── seguridad-higiene.html
```

---

## Páginas

### Principales

| Página | Descripción |
|--------|-------------|
| `index.html` | Home con hero, misión, verticales, metodología, equipo, galería y membresías |
| `metodologia.html` | Detalle del enfoque y metodología del laboratorio |
| `eventos.html` | Agenda de eventos del año 2026 |
| `membresia.html` | Planes Individual ($85k) y Corporativa ($150k) |
| `publicaciones.html` | Feed de publicaciones filtrable por vertical, cargado desde Google Sheets vía CSV |

### Publicaciones (`publicaciones.html`)

Feed dinámico que consume un Google Sheet publicado como CSV y renderiza las publicaciones filtradas por vertical.

**Fuente de datos:**
- URL configurada en la constante `SHEET_CSV_URL` (línea ~391).
- Para actualizar la fuente: Archivo → Compartir → Publicar en la web → Hoja1 → CSV → copiar URL.

**Parser CSV (`parseCSV` + `HEADER_MAP`):**
- Soporta encabezados en español e inglés, con o sin acentos, y variantes comunes (ej. `enlace` / `link` / `url publicacion` → campo `url`; `resumen` / `summary` / `descripcion` → campo `resumen`).
- La función `normalizeHeader()` extrae la lógica de normalización (trim, minúsculas, strip diacríticos) reutilizada tanto en la detección de headers como en los filtros.
- Las columnas mapeadas a `null` en `HEADER_MAP` (ej. `marca temporal`, `timestamp`) se descartan al parsear.
- Compatible con exports directos de Google Forms → Google Sheets sin edición manual de encabezados.

### Flujo de registro de membresías (`membresia.html`)

Reemplaza los antiguos enlaces `mailto:` por un flujo guiado de cuatro pasos:

1. **Selector de tipo** — el usuario elige entre Membresía Individual ($85.000/mes) y Corporativa ($150.000/mes).
2. **Beneficios** — se muestran los beneficios completos del tipo elegido antes de continuar.
3. **Formulario dinámico** — campos comunes (nombre, email, teléfono, vertical de interés, fuente de referido, consentimiento) más campos condicionales según el tipo: profesión y organización para Individual; empresa, cargo, cantidad de personas y sector para Corporativa.
4. **Confirmación** — mensaje de éxito al completar el envío.

**Arquitectura:**
- Estado centralizado en el objeto `state` (`type`, `formData`).
- Datos de membresías (precios, beneficios, textos) centralizados en la constante `MEMBERSHIPS` — un único lugar para actualizarlos.
- Los grupos de campos condicionales se muestran/ocultan con la clase `.active` según `state.type`; no hay duplicación de formularios.
- Validación del lado del cliente con errores inline y foco automático en el primer campo inválido.
- Atributos `required`, `autocomplete` y `aria-live="polite"` en los errores para compatibilidad con lectores de pantalla.
- Función `submitMembershipForm(data)` preparada para futura integración con Google Forms (actualmente stub con `// TODO`).

---

### Verticales (sectores de trabajo)

| Página | Sector | Referente |
|--------|--------|-----------|
| `verticales/energia.html` | Energía / Vaca Muerta | Diego Manfio |
| `verticales/recursos-humanos.html` | Recursos Humanos | Mariana Sobisch |
| `verticales/salud.html` | Salud | Vanesa Scholl |
| `verticales/marketing.html` | Marketing | Rodrigo Bustos |
| `verticales/ciencias-economicas.html` | Ciencias Económicas | Matias Bacci |
| `verticales/arquitectura.html` | Arquitectura | Pablo Coronato |
| `verticales/derecho.html` | Derecho | Por incorporar |
| `verticales/seguridad-higiene.html` | Seguridad e Higiene | Cristian Sanz |

---

## Tecnologías

- **HTML / CSS / JavaScript** vanilla — sin frameworks
- **Google Fonts:** Inter + Montserrat
- **Font Awesome 6** (vía CDN) para iconografía
- **Diseño:** dark mode, glassmorphism, animaciones CSS, accents cyan + violeta

---

## Despliegue

El sitio está publicado en producción vía **Netlify**, conectado a la rama `main` de este repositorio. Cualquier merge a `main` se despliega automáticamente.

### Flujo de trabajo

1. Trabajar siempre en la rama `develop`
2. Hacer commits y push a `origin/develop`
3. Cuando los cambios estén listos, abrir un **Pull Request** de `develop` → `main` en GitHub

> **Nunca** pushear directo a `main`.
