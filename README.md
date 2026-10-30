# BMEUsco

**Simulador de balances de materia y energía para procesos agroindustriales**
Programa de Ingeniería Agroindustrial · Universidad Surcolombiana (Neiva, Huila, Colombia)

**Aplicación:** https://jaimebustos1982.github.io/BMEUsco/
**Versión actual:** 2026-10-30-a

---

## Autoría y derechos

| | |
|---|---|
| **Autor** | D. Sc. Jaime Daniel Bustos Vanegas, docente del Programa de Ingeniería Agroindustrial, Universidad Surcolombiana |
| **Titular de los derechos patrimoniales** | Universidad Surcolombiana, conforme al Estatuto de Propiedad Intelectual (Acuerdo 014 de 2018 del Consejo Superior, art. 33) |
| **Licencia** | Todos los derechos reservados. Ver [LICENSE](LICENSE) |

El autor conserva los derechos morales sobre la obra. Que el repositorio sea público en GitHub no concede ninguna licencia de uso, copia o modificación del código ni del contenido.

**Cómo citar:**
Bustos Vanegas, J. D. (2026). *BMEUsco: simulador de balances de materia y energía para procesos agroindustriales* (versión 2026-10-29-c) [Software]. Universidad Surcolombiana. https://jaimebustos1982.github.io/BMEUsco/

---

## Qué es

BMEUsco es una aplicación web progresiva (PWA) de apoyo al curso *Balance de Materia y Energía*. El estudiante resuelve problemas contextualizados en procesos agroindustriales reales, compara su respuesta con la solución verificada y consulta el procedimiento paso a paso. Funciona en celular y computador, se puede instalar como aplicación y sigue funcionando sin conexión a internet.

Su propósito es que el estudiante practique sin recurrir a herramientas de inteligencia artificial para resolver los problemas, y que el docente pueda hacer seguimiento del trabajo individual y en clase.

### Contenido: 94 fichas en 9 capítulos

| Capítulo | Tema | Práctica libre | Modo taller |
|---|---|---:|---:|
| 1 | Introducción al análisis de procesos agroindustriales (planteamiento de esquemas) | 12 | 2 |
| 2 | Conceptos fundamentales: unidades SI y homogeneidad dimensional | 5 | 2 |
| 3 | Balance de materia sin reacción química (estado estacionario) | 13 | 2 |
| 4 | Balance de materia con reacción química | 9 | 2 |
| 5 | Balance de materia en estado transitorio | 8 | 2 |
| 6 | Balance de energía en estado estacionario | 11 | 2 |
| 7 | Balance de energía con reacción química | 8 | 2 |
| 8 | Balance de energía en estado transitorio | 5 | 2 |
| 9 | Balances simultáneos de materia y energía | 5 | 2 |
| | **Total** | **76** | **18** |

Las fichas siguen el índice del libro de texto del curso, *Balance de materia y energía en procesos agroindustriales* (en preparación), e incluyen problemas propuestos para la aplicación.

### Cada ficha incluye

- Enunciado contextualizado en un proceso agroindustrial (lácteos, café, caña, frutas, biocombustibles, entre otros).
- Diagrama del proceso con el volumen de control (V.C.) marcado y corrientes animadas.
- Datos conocidos precargados y campos para la respuesta del estudiante. Acepta coma o punto decimal, y tiene un botón ± para temperaturas negativas.
- Tres pistas progresivas, que el estudiante consulta solo si las necesita.
- Verificación de la respuesta con tolerancia de ±3 %, y el procedimiento completo paso a paso.
- Comprobaciones físicas: por ejemplo, la app rechaza datos que harían que el fluido frío de un intercambiador salga más caliente que la entrada del fluido caliente.

El capítulo 1 trabaja la comprensión de lectura. El estudiante debe identificar el esquema correcto del proceso (operaciones unitarias, volumen de control, corrientes de entrada y salida, variables conocidas y por calcular, base de cálculo) mediante preguntas de diagnóstico, antes de hacer cualquier cálculo.

### Vista para celular o computador

En pantallas anchas la aplicación usa una vista de computador: los capítulos van en una barra lateral y cada ficha se presenta en dos columnas (enunciado y diagrama a la izquierda; datos, pistas, respuesta y resultados a la derecha). En ventanas desde 900 px de ancho aparece un selector **📱 Celular / 🖥️ Computador** en el encabezado; la elección queda guardada en el dispositivo. En celulares se usa siempre la vista de una columna.

### Modo taller (actividades en clase)

- El docente genera un código con tiempo límite (máximo 240 minutos) que habilita las 2 fichas reservadas de un capítulo. El código lo crea y lo valida el servicio de registro, así que no se puede fabricar ni alterar desde la app; para entrar al taller se necesita conexión a internet.
- Las fichas de taller no aparecen en la práctica libre.
- Si el estudiante cambia de ventana o sale de la aplicación, pierde el acceso al taller.
- Cada ficha de taller solo se puede verificar una vez con el mismo código, aunque el estudiante salga y vuelva a entrar.
- El docente ve las fichas asignadas completas, con sus respuestas.

### Panel docente

- Uso del simulador en práctica libre y en modo taller.
- Análisis de dificultad: fichas con mayor proporción de respuestas incorrectas y pistas usadas.
- Registro de actividad y reportes de error enviados por los estudiantes.
- Exportación a Excel (.xlsx) con siete hojas y gráficas nativas de Excel: Resumen, Por estudiante, Talleres (resultado de cada estudiante en cada ficha de taller y fecha de presentación), Uso por ficha, Dificultad, Actividad y Reportes. También permite copiar los datos como CSV.
- Botón para borrar los registros al terminar cada actividad.

---

## Arquitectura técnica

- **Lenguajes:** HTML5, CSS3 y JavaScript (ES6+), sin frameworks ni librerías externas para la lógica. Toda la aplicación vive en un solo archivo (`index.html`), lo que la hace liviana, fácil de auditar y utilizable sin conexión.
- **Diagramas:** SVG escrito directamente, con animaciones CSS y SVG (partículas en las corrientes, agitadores, burbujas).
- **Sonido:** Web Audio API (tonos generados en el navegador, sin archivos de audio), con opción de silenciar.
- **Funcionamiento sin conexión:** *service worker* con estrategia "red primero, caché como respaldo".
- **Exportación a Excel:** el archivo .xlsx (Office Open XML) se genera en el propio navegador, incluidas las gráficas, sin librerías externas.
- **Registro de uso:** Google Apps Script expuesto como aplicación web, que escribe en una hoja de cálculo de Google del docente, entrega los registros solo con la clave docente y crea y valida los códigos de taller. Este componente no está en el repositorio.
- **Seguridad:** la clave del panel docente no está en el código de la app; solo la conoce el servicio de registro. El service worker no guarda en caché las consultas al servicio.
- **Publicación:** GitHub Pages.

### Estructura del repositorio

```
index.html     — la aplicación completa (interfaz, fichas, cálculos, diagramas, panel docente)
manifest.json  — metadatos de instalación (nombre, íconos, colores)
sw.js          — service worker (funcionamiento sin conexión y actualización)
icon-192.png   — ícono 192×192
icon-512.png   — ícono 512×512
README.md      — este documento
LICENSE        — términos de uso
```

### Datos que registra

Cuando el estudiante verifica una respuesta, la aplicación envía al registro del docente su nombre y código, la ficha, el número de pistas consultadas, el resultado (correcta, parcial, incorrecta o sin respuesta) y la fecha. Los reportes de error guardan además el mensaje escrito por el estudiante. Estos datos se almacenan solo en la hoja de cálculo del docente y se usan con fines académicos. El progreso personal del estudiante se guarda únicamente en su propio dispositivo.

---

## Metodología de desarrollo y verificación

La aplicación se desarrolló de forma iterativa, con asistencia de Claude (Anthropic) como herramienta de programación. El autor definió el alcance, el enfoque pedagógico, los problemas y los criterios de validación, y revisó cada versión. Cada fórmula se verificó numéricamente de forma independiente antes de programarse, y cada versión pasa una prueba automática que resuelve todas las fichas con sus datos por defecto. Este proceso de verificación detectó y corrigió errores físicos en algunos problemas de referencia, por ejemplo la referencia de entalpías en los balances de evaporadores y la consistencia con la segunda ley en los intercambiadores de calor.

---

## Mantenimiento

### Publicar una actualización

1. Reemplace `index.html` (y `sw.js` si cambió) en el repositorio: **Add file → Upload files**.
2. En cada versión nueva, el valor `CACHE_NAME` de `sw.js` cambia (por ejemplo, de `bmeusco-2026-10-29-a` a `bmeusco-2026-10-29-b`). Así, los celulares que tienen la aplicación instalada descargan la versión nueva.
3. GitHub Pages publica el cambio en la misma dirección en uno o dos minutos.
4. El pie de la aplicación muestra el código de versión. Si un estudiante reporta un problema, lo primero es pedirle ese código: la causa más frecuente es una copia vieja guardada en el teléfono.

### Agregar una ficha

Todo el contenido está en el arreglo `OPS` dentro de `index.html`. Cada ficha es un objeto con esta forma:

```js
{ id:'idUnico', num:'95', cat:'materia', chapter:3, sector:'Alimentaria', diagramKey:'mixer', name:'Nombre corto',
  title:'Título de la ficha',
  context:'Proceso o planta donde ocurre',
  story:'Enunciado completo del problema.',
  inputs:[ {key:'F', label:'F — descripción', unit:'kg/h', def:'100', dtag:'d-in-1'} ],
  hints:[ 'Pista 1', 'Pista 2', 'Pista 3' ],
  answerFields:[ {key:'resultado', label:'Resultado', unit:'kg/h'} ],
  calc(v){
    // v.F, ... son los valores ingresados
    // devuelve {error} o {outputs, diagram, flows, steps, note}
  }
}
```

- `diagramKey` reutiliza un diagrama del objeto `DIAGRAMS`. `dtag` indica en qué lugar del diagrama se muestra cada dato.
- `taller:true` reserva la ficha para el modo taller.
- Para una respuesta de opción (por ejemplo, Sí/No), use `opciones:['No','Sí']` en el campo de respuesta. En la salida, `raw` es el índice de la opción correcta.
- Para fichas de planteamiento de esquema (capítulo 1), use `kind:'esquema'` con `quiz` y `schemaExplain` en lugar de `calc`.
- Antes de programar una ficha, verifique la solución numéricamente por aparte y compruebe que los datos sean físicamente consistentes.

### Registro de uso (Google Apps Script)

- La dirección del script va en la constante `SHEET_WEBAPP_URL` de `index.html`.
- La clave del panel docente es la constante `CLAVE_DOCENTE` del script. Para cambiarla basta con editar el script; la app no se toca.
- El script guarda los códigos de taller en la hoja `CodigosTaller` de la misma hoja de cálculo.
- Cada vez que se modifica el script hay que publicarlo de nuevo: **Implementar → Gestionar implementaciones → Editar → Nueva versión**. La dirección no cambia.
- Desde la versión 2026-10-29-c la app necesita la versión 2 del script (la que valida la clave y los códigos de taller).

---

© 2026 Universidad Surcolombiana. Todos los derechos reservados.
