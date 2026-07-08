# web-ia-lab

## 1. Repositorio y flujo Git

- **Remote:** https://github.com/ialabenepctnqn/web-ia-lab.git
- **Producción:** Netlify, conectado a `main`. Todo push a `main` se despliega automáticamente.

### Regla crítica: nunca pushear directo a `main`

Rama de trabajo diario: `develop`. Rama de producción: `main`.

```bash
git checkout develop          # siempre trabajar acá
git commit -m "descripción"
git push origin develop
# cuando esté listo para producción:
gh pr create                  # PR de develop → main, nunca merge directo
```

---

## 2. Contexto del proyecto

Sitio institucional de IA LAB — comunidad de innovación aplicada en inteligencia artificial.

**Stack:** HTML · CSS · JavaScript Vanilla · Sin frameworks

**Diseño:** Modo oscuro (jul 2026) · Glassmorphism · Fondo azul-noche (#060B14) + cian neón (#4FD8EB), azul eléctrico (#2E9BFF) y violeta (#8B5CF6), ámbar/naranja ENE puntual · Corporativo/tecnológico e institucional. Fuente de verdad de paleta, tipografía (Open Sans) y componentes: `publi ej/DESIGN-DARK.md` (sistema "Hydro-Clean Professional — Dark", derivado de las placas promocionales); la variante clara anterior vive en `publi ej/DESIGN.md`. En dark la elevación es por bordes luminosos y glow tintado, no sombras; texto sobre botones cian = navy #001F25.

**Estructura del sitio:**
- Home (video intro `poloTetris.mp4` a pantalla completa con botón CTA "Ver IA LAB" centrado abajo —cian neón, `#skip-intro-btn`— y auto-scroll al terminar → hero → misión + grid de verticales → teaser de metodología → equipo en chips + galería → banda CTA de membresía). El nav y el side-nav se ocultan (clase `hidden`) mientras se está en la intro; en móvil el video usa `100dvh`, safe-areas y poster de respaldo si el autoplay está bloqueado.
- Metodología (principios + procedimiento de gestión interna del vertical)
- Eventos
- Membresías (planes Individual/Corporativa + manual de incorporación en línea de tiempo)
- Publicaciones (feed filtrable, carga desde `publicaciones/index.json`; los papers viven en `publicaciones/<vertical>/`)
- Verticales: Energía · RRHH · Salud · Marketing · Arquitectura · Derecho · Seguridad e Higiene · Relaciones Internacionales · Ciencias Económicas · Coaching · Real Estate (páginas en `verticales/`)

**Nav y footer:** inyectados en todas las páginas por `js/layout.js` (`#nav-root` / `#footer-root`). Links: Verticales (ancla a la home) · Metodología · Eventos · Publicaciones + botones "Sumate" (membresía) y "Login" (app externa).

---

## 3. Componentes especiales

### Chatbot (Neo) — planificado, aún no implementado
- Asistente IA LAB previsto para el futuro. Mascota: **Neo**.
- Archivos previstos: `css/chatbot.css`, `js/chatbot.js` (todavía no existen en el repo).
- Idea: interfaz desacoplada del resto del sitio, preparada para integración RAG vía `sendMessage()`.

### Eventos / Compartir
- En `eventos.html` cada evento es un `<div class="event-card">`. Toda la lógica (filtros, modal de flyers, compartir) está **inline** en ese archivo: CSS en el `<style>` del `<head>` y JS al final del `<body>`.
- **Botón "Compartir":** se inyecta por JS **solo en eventos próximos**. La detección es por fecha real: el script compara `data-fecha` (ISO `YYYY-MM-DD`) de cada tarjeta contra la fecha actual; si la fecha ya pasó (o falta/es inválida), **no** se agrega el botón. No depende de `data-tipo`.
- **Cómo hacer compartible un evento nuevo:** en su `.event-card` agregar dos atributos:
  - `id="ev-..."` único → se usa como ancla en la URL compartida (`...#id`).
  - `data-fecha="2026-06-30"` → fecha real del evento en formato ISO.
- **Mecanismo:** usa **Web Share API** nativo (`navigator.share`, ideal en móvil); si el navegador no lo soporta, abre un menú con X/Twitter, LinkedIn, WhatsApp y "Copiar enlace".
- **Próximo/Pasado automático:** al cargar la página, el JS deriva el estado de cada card desde `data-fecha`: si la fecha ya pasó, setea `data-tipo="pasado"`, agrega la clase `event-card-past`, el estilo del badge y la etiqueta "Realizado" — todo en runtime, sin tocar el HTML. El `data-tipo` escrito en el HTML es solo fallback para cards sin `data-fecha` válida; no hace falta actualizarlo a mano cuando un evento pasa.
- **Iconos:** Font Awesome 6.0.0-beta3 → usar `fab fa-twitter` y `fas fa-share-alt` (esta versión no incluye `fa-x-twitter` ni garantiza `fa-share-nodes`).

### Membresías
- En `membresia.html` se muestran los dos planes (Individual / Corporativa) con sus beneficios. El botón **"Quiero inscribirme"** es un `<a class="btn-cta">` que abre el **Google Form de inscripción** en una pestaña nueva (`href` ~línea 917). No hay formulario embebido ni envío `fetch`.
- **Manual de incorporación:** debajo de los planes, `membresia.html` incluye el "Cómo es la incorporación" — una **línea de tiempo vertical** (`.flow-timeline`) de 7 pasos (del sitio web a las credenciales), más callouts, modalidades de participación y acceso por capas. CSS inline en el `<style>` de la página. Antes vivía en `metodologia.html` como un stepper clickeable; se movió acá y se rediseñó (jul 2026). En Metodología quedó solo el procedimiento de **gestión interna** (`#gestion`).
- **Por qué el enlace directo:** el Google Form pide subir archivos (selfie Face ID + comprobante de pago). Google obliga a iniciar sesión en formularios con subida de archivos, y esos campos no se pueden completar por URL pre-llena ni por envío anónimo. Por eso la inscripción se delega al form de Google (el visitante necesita cuenta de Google).
- Para cambiar a qué form apunta: editar el `href` del enlace "Quiero inscribirme".
- **Migración de miembros previos:** archivo `Miembros_IA_LAB_v3.xlsx` en local (Downloads del usuario) con 18 miembros (10 individual, 8 corporativo), listo para importar al Sheet.

---

## 4. Filosofía de desarrollo

- Código limpio, sin dependencias innecesarias.
- Mantener coherencia visual en todo el sitio.
- Reutilizar componentes existentes antes de crear nuevos archivos.
- Modificar la menor cantidad de archivos posible por cambio.
- Facilitar el rollback: cambios atómicos y bien delimitados.
- Ante un cambio importante de arquitectura: explicar el porqué, ventajas y desventajas antes de implementar.
