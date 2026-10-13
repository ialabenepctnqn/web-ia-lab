# Agenda conectada al CRM de ENE

Los eventos se administran en `https://chatbotene.onrender.com/crm/eventos`.
Subir flyers o texto prepara un borrador; confirmar la publicación actualiza
los datos que consultan este sitio y el bot. El sitio los carga al abrir
`eventos.html`, conservando galerías, filtros y enlaces compartidos.

El servidor público se configura en `js/agenda-config.js`, sin credenciales.
Solo se consulta `GET /agenda/eventos`; las imágenes provienen del mismo
servidor. Cada tarjeta usa texto seguro y la inscripción admite HTTP/HTTPS.
Los cancelados no ofrecen inscripción ni compartir; las fechas pendientes
no se reemplazan por un día ficticio.

La puesta en marcha está en `chatbot-polo/specs/spec-agenda-eventos.md`.
Hasta importar, revisar y publicar los eventos anteriores, dejar
`AGENDA_HABILITADA=false` en el backend. Con la agenda activa, cero registros
significa agenda vacía. Si hay un error de conexión, se conserva el HTML
anterior con un aviso de posible desactualización, no como datos vigentes.

Los cambios son locales. El despliegue de esta web sigue el flujo del
proyecto: develop → revisión → main/Netlify.
