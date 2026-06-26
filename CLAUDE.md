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
- En `membresia.html` se muestran los dos planes (Individual / Corporativa) con sus beneficios. El botón **"Quiero inscribirme"** es un `<a class="btn-cta">` que abre el **Google Form de inscripción** en una pestaña nueva (`href` ~línea 907). No hay formulario embebido ni envío `fetch`.
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
