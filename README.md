# Portafolio personal — Alvaro Flores

Portafolio hecho con **Vite** (web bundler) + **LESS** (CSS generado) + **Handlebars** (parciales), con la misma estructura vista en clase (`pw2_202603`).

## Scripts
- `npm install`
- `npm run dev` — servidor de desarrollo
- `npm run build` — genera `dist/` con HTML, JS y CSS minificados
- `npm run preview` — sirve `dist/`

## Estructura
- `index.html` — página con parciales Handlebars (`{{>Header}}`, `{{>ProjectSlide}}`, `{{>Footer}}`).
- `src/less/` — LESS (variables, mixins, mapa `@breaks`, anidamiento) y `components/`.
- `src/components/` — parciales `.hbs`.
- `src/data/` — datos de proyectos/habilidades inyectados en el HTML.
- `src/main.js` — carrusel, menú móvil, tema y formulario.
- `.github/workflows/publicar_a_gp.yml` — despliegue automático a GitHub Pages al hacer push a `main`.

## Enlaces del proyecto
- Repositorio: https://github.com/alvlfloresl-AF/portafolio
- Portafolio desplegado (GitHub Pages): https://alvlfloresl-af.github.io/portafolio/
