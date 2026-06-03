# web-ia-lab

- **Repositorio:** web-ia-lab
- **Remote:** https://github.com/ialabenepctnqn/web-ia-lab.git
- **Branch principal:** main


## Control de versiones y ramas

Este proyecto está publicado en producción vía **Netlify**, conectado al repositorio de GitHub. Cualquier push a `main` se despliega automáticamente al sitio en vivo.

### ⚠️ Regla crítica: nunca pushear directo a `main`

Todo el trabajo de desarrollo debe hacerse en la rama `develop`.

**Flujo de trabajo obligatorio:**

1. Asegurarse de estar en la rama `develop` antes de cualquier cambio:
```bash
   git checkout develop
   # Si no existe aún:
   git checkout -b develop
```

2. Hacer commits normalmente en `develop`:
```bash
   git add .
   git commit -m "descripción del cambio"
   git push origin develop
```

3. Cuando los cambios estén listos para producción, **abrir un Pull Request** en GitHub de `develop` → `main`. Nunca mergear directo por línea de comandos.

### Resumen
- Rama de trabajo diario: `develop`
- Rama de producción (Netlify): `main`
- **Nunca** hacer cambios directamente sobre `main`
- **Siempre** usar PR para pasar cambios de `develop` a `main`
