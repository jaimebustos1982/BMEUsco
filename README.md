# BMEUsco

Simulador de balances de materia y energía — Programa de Ingeniería Agroindustrial, Universidad Surcolombiana.
Curso *Balance de Materia y Energía* · Docente: D. Sc. Jaime Daniel Bustos Vanegas.

**App en vivo:** https://jaimebustos1982.github.io/BMEUsco/

---

## Qué es esto

Una PWA (aplicación web instalable) de un solo archivo con 93 fichas interactivas organizadas en 9 capítulos, alineadas al índice del libro de texto del curso. Cada ficha trae enunciado, pistas progresivas, verificación de la respuesta del estudiante y solución paso a paso. Incluye un "modo taller" para ejercicios cronometrados en clase y un panel docente con seguimiento de uso.

No usa frameworks (sin React/Vue) ni build step: es HTML + CSS + JavaScript plano en un solo archivo, para que sea fácil de leer, editar y auditar.

## Estructura del repositorio

```
index.html       — la app completa (todo el código vive aquí)
manifest.json    — metadatos de instalación PWA (nombre, íconos)
sw.js            — service worker (funcionamiento offline + actualización automática)
icon-192.png     — ícono de la app (192×192)
icon-512.png     — ícono de la app (512×512)
```

El registro de uso NO vive en este repositorio: usa una Google Sheet aparte + un script de Google Apps Script como backend (ver más abajo).

## Cómo actualizar la app

1. Edita `index.html` localmente.
2. Sube los archivos que cambiaron a este repositorio (botón **Add file → Upload files** en GitHub, o `git push` si usas la terminal).
3. Si cambiaste `index.html`, abre `sw.js` y sube en uno el número de versión de `CACHE_NAME` (por ejemplo, de `-h` a `-i`). Esto obliga a los teléfonos que ya tienen la app instalada a descargar la versión nueva la próxima vez que la abran con internet, en vez de quedarse con una copia vieja en caché.
4. GitHub Pages publica el cambio solo, en la misma URL — no hay que hacer nada más.

**Para verificar que un cambio sí llegó:** el pie de página de la app muestra un código de versión (ej. `2026-08-08-h`). Si un estudiante reporta algo raro, pídele ese código antes de diagnosticar nada — la causa más común de "esto no funciona" a lo largo de este proyecto fue alguien viendo una copia vieja guardada en su teléfono.

## Cómo agregar una ficha nueva

Todo el contenido vive en el arreglo `OPS` dentro de `index.html`. Cada ficha es un objeto con esta forma mínima:

```js
{ id:'idUnico', num:'94', cat:'materia', chapter:3, sector:'Alimentaria', diagramKey:'mixer', name:'Nombre corto',
  title:'Título de la ficha',
  context:'Dónde aparece (para el encabezado)',
  story:'Enunciado completo del problema.',
  inputs:[ {key:'F', label:'F — descripción', unit:'kg/h', def:'100'} ],
  hints:[ 'Pista 1', 'Pista 2', 'Pista 3' ],
  answerFields:[ {key:'resultado', label:'Resultado', unit:'kg/h'} ],
  calc(v){
    // v.F, v.x1, etc. — los valores ingresados
    // devuelve {error} o {outputs, diagram, flows, steps, note?}
  }
}
```

- `diagramKey` reutiliza un diagrama ya existente del objeto `DIAGRAMS` (mezclador, reactor, evaporador, etc.) — casi nunca hace falta dibujar uno nuevo.
- `chapter` determina en qué pestaña aparece. `taller:true` la reserva para el modo taller (no aparece en la práctica libre).
- Para fichas de "esquema" (tipo capítulo 1, sin cálculo), usa `kind:'esquema'` con `quiz:[...]` y `schemaExplain` en vez de `calc`.

**Antes de programar una ficha, verifica la fórmula aparte** (en Node.js o una calculadora) — así se detectaron los errores reales que encontramos en el libro. No confíes en que "se ve bien" sin correr números.

## Backend (Google Apps Script + Google Sheets)

El seguimiento de uso, el modo taller y los reportes de error usan una Google Sheet llamada **"Registro BME"** con un script de Apps Script (`registro_apps_script.gs`, guardado aparte de este repo) expuesto como aplicación web.

- La URL de ese script va pegada en la constante `SHEET_WEBAPP_URL` dentro de `index.html`.
- El código de acceso al panel docente (`DOCENTE_CODE`) debe coincidir exactamente con `RESET_SECRET` en el script de Apps Script — si cambias uno, cambia el otro.
- Cada vez que edites el script de Apps Script, hay que volver a **Implementar → Gestionar implementaciones → editar → Nueva versión** para que el cambio quede activo (la URL no cambia).

## Créditos

Desarrollado de forma conversacional con Claude (Anthropic), verificando cada fórmula contra el libro de texto del curso antes de programarla.
