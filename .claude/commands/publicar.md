Pipeline para publicar un artículo en el sitio IA LAB.

Uso: /publicar <ruta-al-html>

Ejecutá los siguientes pasos en orden:

## 1. Leer el archivo fuente

Leé el HTML en `$ARGUMENTS` completo, sin alterarlo.

## 2. Inyectar el logo

Buscá el marcador `[ Logo ENE IA LAB ]` dentro del HTML. Si lo encontrás, reemplazalo con:

```html
<img src="../../imagenes/LOGOIALAB.png" alt="ENE IA LAB" style="height:34px;width:auto;filter:brightness(0) invert(1);">
```

Si el marcador **no existe**, avisale al usuario y pedile que lo indique antes de continuar. No adivines dónde va el logo.

## 3. Generar el resumen

Leé el contenido del documento (portada, subtítulo, introducción) y generá un resumen de 2–3 frases que describa de qué trata el artículo y cuál es su aporte. El resumen va en la tarjeta de `publicaciones.html`.

## 4. Proponer metadatos y pedir confirmación

Mostrá al usuario los metadatos que vas a usar y esperá confirmación antes de escribir cualquier archivo:

- **titulo**: extraído del `<title>` o del encabezado principal del documento
- **autor**: extraído del documento, o "ENE IA LAB" si no figura
- **vertical**: el slug correspondiente al tema del artículo. Slugs válidos: `energia`, `rrhh`, `salud`, `marketing`, `arquitectura`, `derecho`, `seguridad-higiene`, `rrii`, `ciencias-economicas`, `coaching`, `real-estate`
- **fecha**: extraída del documento, o la fecha de hoy (formato YYYY-MM-DD)
- **resumen**: el que generaste en el paso 3
- **slug**: generado desde el título — minúsculas, sin acentos, sin caracteres especiales, palabras separadas por guiones (ej. "ia-aplicada-en-arquitectura")

Presentalos así y esperá OK:

```
Metadatos propuestos:
  titulo:   ...
  autor:    ...
  vertical: ...
  fecha:    ...
  slug:     ...
  resumen:  ...

¿Confirmás o querés cambiar algo?
```

## 5. Escribir el artículo en el repo

Una vez confirmados los metadatos:

1. Creá la subcarpeta `WEB-IALAB-main/publicaciones/<vertical>/` si no existe.
2. Escribí el HTML con el logo inyectado en `WEB-IALAB-main/publicaciones/<vertical>/<slug>.html`.

## 6. Actualizar index.json

Leé `WEB-IALAB-main/publicaciones/index.json` y agregá al array esta entrada:

```json
{
  "titulo": "...",
  "autor": "...",
  "vertical": "...",
  "fecha": "...",
  "resumen": "...",
  "url": "publicaciones/<vertical>/<slug>.html"
}
```

Guardá el archivo con el array actualizado.

## 7. Commit y push

Mostrá un resumen de los archivos creados/modificados y pedí confirmación final antes de commitear.

Con OK del usuario, hacé commit en `develop` y push:

```
git add WEB-IALAB-main/publicaciones/<vertical>/<slug>.html WEB-IALAB-main/publicaciones/index.json
git commit -m "feat(publicaciones): agregar <slug> — vertical <vertical>"
git push origin develop
```

Informá al usuario que el artículo quedó en `develop` y que debe abrir un PR a `main` para que Netlify lo publique.
