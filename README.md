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
├── publicaciones.html          # Feed de publicaciones
├── css/
│   └── shared.css              # Estilos compartidos por todas las páginas
├── js/
│   └── layout.js               # Nav y footer inyectados en todas las páginas
├── imagenes/
│   ├── LOGOIALAB.png
│   ├── POLO3.png               # Fondo principal
│   └── ia-lab-*.jpg/jpeg       # Fotos del laboratorio
├── publicaciones/
│   ├── index.json              # Índice de publicaciones (fuente del feed)
│   └── <vertical>/*.html       # Papers y guías (una página por publicación)
└── verticales/                 # 11 páginas, una por sector
    ├── energia.html
    ├── recursos-humanos.html
    ├── salud.html
    ├── marketing.html
    ├── ciencias-economicas.html
    ├── arquitectura.html
    ├── derecho.html
    ├── seguridad-higiene.html
    ├── rrii.html
    ├── coaching.html
    └── real-estate.html
```

---

## Páginas

### Principales

| Página | Descripción |
|--------|-------------|
| `index.html` | Home: hero, misión + grid de verticales, teaser de metodología, equipo (chips) + galería, banda CTA de membresía |
| `metodologia.html` | Enfoque, principios y procedimiento de gestión interna del vertical |
| `eventos.html` | Agenda de eventos del año 2026; el estado próximo/realizado se deriva automáticamente de `data-fecha` |
| `membresia.html` | Planes Individual ($85k) y Corporativa ($150k) + manual de incorporación (línea de tiempo de 7 pasos) |
| `publicaciones.html` | Feed de publicaciones filtrable por vertical y ordenable por fecha |

El nav y el footer de todas las páginas se inyectan desde `js/layout.js` (contenedores `#nav-root` y `#footer-root`).

### Publicaciones (`publicaciones.html`)

Feed estático que carga `publicaciones/index.json` (vía `fetch`) y renderiza las cards con filtros por vertical y ordenamiento por fecha.

**Para agregar una publicación:**
1. Crear la página del paper/guía en `publicaciones/<vertical>/<slug>.html`.
2. Agregar su entrada (título, vertical, fecha, autor, resumen, URL) en `publicaciones/index.json`.

### Inscripción a membresías (`membresia.html`)

La página presenta los dos planes —Individual ($85.000/mes) y Corporativa ($150.000/mes)— con sus beneficios. El botón **"Quiero inscribirme"** abre directamente el **Google Form de inscripción** en una pestaña nueva; la inscripción se completa íntegramente en Google.

**Por qué un enlace directo y no un formulario embebido:**
El Google Form incluye campos de **subida de archivos** (selfie para Face ID + comprobante de pago). Google obliga a iniciar sesión en cualquier formulario con subida de archivos, y esos campos no se pueden completar por URL pre-llena ni por envío anónimo (`fetch` con `mode: no-cors`). Por eso la inscripción se delega al Google Form en lugar de embeberla en el sitio.

> **Implicancia:** los visitantes necesitan una cuenta de Google para completar la inscripción.

La URL del form está en el `href` del enlace "Quiero inscribirme" (`membresia.html`, ~línea 917).

Debajo de los planes, la página incluye el **manual de incorporación** ("Cómo es la incorporación"): una línea de tiempo vertical de 7 pasos (del sitio web a las credenciales) con sus modalidades de participación y acceso por capas. Antes estaba en `metodologia.html` como un stepper clickeable; se movió a Membresía y se rediseñó.

---

### Verticales (sectores de trabajo)

| Página | Sector | Referentes |
|--------|--------|-----------|
| `verticales/energia.html` | Energía / Vaca Muerta | Andrés López Gibson · Maxi Arias |
| `verticales/recursos-humanos.html` | Recursos Humanos | Mariana Sobisch · Vanesa Villalobos · Belén Lombi |
| `verticales/salud.html` | Salud | Vanesa Scholl |
| `verticales/marketing.html` | Marketing y Comercialización | Rodrigo Bustos · Fernando Acuña |
| `verticales/ciencias-economicas.html` | Ciencias Económicas | Matias Bacci · Pablo Serra |
| `verticales/arquitectura.html` | Arquitectura | A definir |
| `verticales/derecho.html` | Derecho | Vanesa Ruiz |
| `verticales/seguridad-higiene.html` | Seguridad (HSE) | Cristian Sanz · Ezequiel Weidermann |
| `verticales/rrii.html` | Relaciones Institucionales | Sol Buschiazzo · Ileana Temi |
| `verticales/coaching.html` | Coaching | Vanesa Funes |
| `verticales/real-estate.html` | Real Estate | Leandro Sfeir |

---

## Tecnologías

- **HTML / CSS / JavaScript** vanilla — sin frameworks
- **Google Fonts:** Open Sans
- **Font Awesome 6** (vía CDN) para iconografía
- **Diseño:** modo claro, glassmorphism, animaciones CSS, paleta teal + aqua (sistema ENE)

---

## Despliegue

El sitio está publicado en producción vía **Netlify**, conectado a la rama `main` de este repositorio. Cualquier merge a `main` se despliega automáticamente.

### Flujo de trabajo

1. Trabajar siempre en la rama `develop`
2. Hacer commits y push a `origin/develop`
3. Cuando los cambios estén listos, abrir un **Pull Request** de `develop` → `main` en GitHub

> **Nunca** pushear directo a `main`.
