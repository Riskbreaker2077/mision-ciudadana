# Misión Ciudadana — sitio unificado

Un solo sitio GitHub Pages con los 6 módulos + página principal, consolidado desde los repos individuales (mayo 2026).

## Estructura
- `index.html` — página principal ("Elige tu misión"), enlaza a cada módulo
- `modulos/modulo-N.html` — un archivo autocontenido por módulo (assets embebidos en base64)

## Módulos
1. (Módulo 1)
2. Corrupción
3. Constitución Política
4. (sin página original — placeholder)
5. Mecanismos de protección
6. Globalización y Migraciones

## Deploy
GitHub Actions (`.github/workflows/deploy-pages.yml`) publica la carpeta raíz a Pages.
