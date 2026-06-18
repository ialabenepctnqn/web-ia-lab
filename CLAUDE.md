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

**Diseño:** Dark mode · Glassmorphism · Paleta cyan/violeta · Estilo moderno e institucional

**Estructura del sitio:**
- Home
- Metodología
- Eventos
- Membresías
- Verticales: Energía · RRHH · Salud · Marketing · Arquitectura · Derecho · Seguridad e Higiene · Relaciones Internacionales · Ciencias Económicas · Coaching · Real Estate

---

## 3. Componentes especiales

### Chatbot (Neo)
- Demo funcional del asistente IA LAB. Mascota: **Neo**.
- Archivos: `css/chatbot.css`, `js/chatbot.js`
- Interfaz desacoplada del resto del sitio.
- Preparado para futura integración RAG vía `sendMessage()`.

### Membresías
- Flujo implementado en `membresia.html` — 4 pasos: selección de plan → beneficios → formulario → éxito.
- **Formulario conectado a Google Forms** vía fetch POST (`mode: no-cors`). Dos formularios separados:
  - **Individual** — campos: Nombre Completo, Email, Teléfono, Razón Social, CUIT, Dirección
  - **Corporativo** — campos: Nombre del Contacto, Empresa, Email, Teléfono, Razón Social, CUIT, Dirección, Cantidad de Usuarios
- Los entry IDs y Form IDs están hardcodeados en `GOOGLE_FORMS` (objeto JS en `membresia.html`, ~línea 1160).
- Las respuestas van a un Google Sheet compartido con dos pestañas (Individual / Corporativo).
- **Migración de miembros previos:** archivo `Miembros_IA_LAB_v3.xlsx` en local (Downloads del usuario) con 18 miembros (10 individual, 8 corporativo), listo para importar al Sheet.

---

## 4. Filosofía de desarrollo

- Código limpio, sin dependencias innecesarias.
- Mantener coherencia visual en todo el sitio.
- Reutilizar componentes existentes antes de crear nuevos archivos.
- Modificar la menor cantidad de archivos posible por cambio.
- Facilitar el rollback: cambios atómicos y bien delimitados.
- Ante un cambio importante de arquitectura: explicar el porqué, ventajas y desventajas antes de implementar.
