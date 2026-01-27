# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src
│   ├── assets
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# F1 Live - Project Roadmap

## 📰 Roadmap: Sección Noticias (Home)

Plan para transformar la página de inicio en un hub de información con noticias destacadas.

### 📝 Fase 1: Estructura y Componentes
- [x] **Schema de Noticias**: Crear `news.json` con campos: `id`, `titulo`, `bajada`, `imagen`, `fecha`, `tags`, `cuerpo`, `fuente`, `autor`.
- [x] **Componente Card**: `<NewsCard />` con diseño moderno (imagen de fondo o top, fecha formateada).
- [x] **Sección en Home**: Integrar un grid de "Últimas Noticias" en `index.astro`.
- [x] **Agregar estados a las noticias**: Implementar estados para ubicarlas en la home (principal, secundaria, elegiada por el autor, etc.)
- [x] **Actualizar front** Actualizar front para estos cambios



### 📖 Fase 2: Página de Lectura
- [x] **Ruta Dinámica**: Crear `/noticias/[id]` para leer el artículo completo.
- [x] **Markdown Support**: Permitir que el `cuerpo` de la noticia soporte Markdown o HTML básico.
- [x] **Agregar SEO** Agegar a la home y a las paginas de noticias


<!-- ## 🎨 Roadmap: Componentes UI y Datos Estáticos (Luz Verde)

Fase inmediata para construir la identidad visual y estructura del sitio aprovechando los datos JSON ya existentes (`teams.json`, `calendario.json`, `news.json`).

### 🧩 UI Kit Base (Global)
- [x] **Componentes Atómicos**: Crear `Button`, `Badge` (para tags/estados) y `Card` (contenedor genérico).
- [x] **Layout Estructural**: Refinar `Header` (Navbar) y `Footer` como componentes aislados y reutilizables.
- [x] **Estilización Global**: Implementar la nueva paleta de colores (Cyan, Blue, Purple, Neon) definida en `global.css` en todos los componentes UI.

### 🏎️ Componentes de Circuitos (Datos: `calendario.json`)
- [x] **`CircuitHeader`**: Cabecera con bandera, nombre del GP y ubicación.
- [ ] **`StatGrid`**: Grid visual para datos técnicos (longitud, vueltas, distancia).
- [ ] **`TrackMap`**: Componente para renderizar la imagen del mapa (svg/img) con estilos.
- [x] **`Countdown`**: Cuenta regresiva lógica (JS) para la próxima sesión.

### 👤 Componentes de Pilotos (Datos: `teams.json`)
- [ ] **`DriverCard`**: Tarjeta para el grid de pilotos (foto, número, equipo).
- [ ] **`DriverHero`**: Cabecera de detalle de piloto (gran impacto visual).
- [ ] **`FunFactCard`**: Tarjeta para mostrar datos curiosos del JSON.

### 📰 Refactor Noticias
- [ ] **`FeaturedNews`**: Extraer la lógica de la noticia principal de la Home a su propio componente. -->

## 🗄️ Roadmap: Migración a Base de Datos (Turso)

Plan para migrar de archivos JSON estáticos a una base de datos SQLite distribuida con Turso.

### 🛠️ Fase 1: Configuración y Esquema
- [x] **Setup Turso**: Crear base de datos en Turso y obtener `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`.
- [x] **Instalar Cliente**: Agregar `@libsql/client` al proyecto.
- [x] **Setup Drizzle ORM**: Instalar `drizzle-orm` y `drizzle-kit` para manejo de esquemas y migraciones.
- [x] **Configurar Drizzle**: Crear `drizzle.config.ts` y conectar con Turso.
- [x] **Definir Esquemas**: Crear modelos en TypeScript (`src/db/schema.ts`) para `drivers`, `teams`, `circuits`, etc.

### 🔄 Fase 2: Migración de Datos (JSON a SQL)
- [x] **Script de Seeding**: Crear script (Node.js) que lea los JSONs actuales (`public/*.json`) e inserte los datos en Turso.
- [x] **Verificación**: Comprobar que los datos en Turso coinciden con los JSON.

### 🔌 Fase 3: Integración en Astro
- [x] **Cliente DB**: Crear `src/lib/db.ts` para gestionar la conexión.
- [ ] **Refactor de Lectura**: Reemplazar `fs.readFile` en `getStaticPaths` y cargas de datos por consultas SQL (`SELECT * FROM ...`).

### 🚀 Fase 4: Escritura y Admin
- [ ] **API Endpoints**: Crear endpoints en Astro (`src/pages/api/...`) para operaciones de escritura (UPDATE standings, INSERT results).
- [ ] **Conectar Dashboard**: Hacer que el Admin Dashboard envíe peticiones a la API en lugar de editar archivos locales.

## 🧪 Roadmap: Testing & Calidad

Plan para asegurar la estabilidad del código y la integridad de los datos, crucial durante la migración de arquitectura.

### 🧱 Fase 1: Unit Testing (Prioridad Alta)
- [ ] **Setup Vitest**: Instalar y configurar Vitest en el entorno de Astro.
- [ ] **Helpers de Formato**: Tests para funciones de tiempo (`formatTime`, `gapToLeader`) y fechas.
- [ ] **Lógica de Puntos**: Validar el cálculo de puntos para diferentes formatos de sesión (Sprint vs Race).
- [ ] **Validación de Datos**: Tests para asegurar que los datos crudos (JSON/DB) no rompen los componentes.

### 🛡️ Fase 2: Integration Testing (Prioridad Media)
- [ ] **Verificación de Seeding**: Tests automáticos que validen que la migración JSON -> Turso fue exacta.
- [ ] **Database Queries**: Tests para asegurar que las consultas con Drizzle retornan las relaciones correctas (ej. Driver -> Team).

## 💻 Roadmap: Admin Dashboard (Gestión de Datos)

Plan para crear un panel de control interno que facilite la actualización de los archivos JSON sin tocar código.

### 🔐 Fase 1: Base y Seguridad
- [ ] **Layout Admin**: Crear un layout específico (`/layouts/AdminLayout.astro`) con sidebar y modo oscuro forzado.
- [ ] **Componente Sidebar**: Crear `<AdminSidebar />` para la navegación lateral del panel.
- [ ] **Autenticación Simple**: Implementar un login básico (cookie/session) para proteger la ruta `/admin`.
- [ ] **Visor de Archivos**: Listar los archivos JSON actuales (`drivers`, `teams`, `standings`) y ver su contenido "raw".

### ✏️ Fase 2: Editores Visuales
- [ ] **Componentes de Edición**: Crear `<FileEditor />` genérico y `<StatusToggle />` para interruptores de estado.
- [ ] **Editor de Drivers**: Formulario para modificar biografías de pilotos.
- [ ] **Editor de Standings**: Interfaz tipo hoja de cálculo para ajustar la tabla de posiciones rápidamente.
- [ ] **Status del Calendario**: Toggles para marcar sesiones como "Completadas" o "En Curso".

### 🤖 Fase 3: Automatización y API
- [ ] **Componente Importador**: Crear `<DataImporter />` para manejar la ingesta de datos externos.
- [ ] **Importador de Resultados**: Script para "Simular Carrera" que actualice puntos automáticamente basado en posiciones ingresadas.
- [ ] **Sincronización OpenF1**: Botón para traer datos reales de la API y actualizar los JSON locales.
- [ ] **Backup System**: Botón para descargar una copia de seguridad de todos los JSONs actuales.

## 🏆 Roadmap: Sección Resultados y Standings

Plan para visualizar las clasificaciones del campeonato y los resultados de cada sesión.

### 📊 Fase 1: Tablas de Clasificación (Standings)
- [x] **Estructura de Datos**: Definir y crear `standings_2026.json` o calcular dinámicamente desde resultados.
- [x] **Componente Tabla**: Crear `<StandingsTable />` reutilizable con ordenamiento y estilos de equipo.
- [x] **Página Principal**: Implementar `/resultados` con pestañas para Pilotos y Constructores.
- [x] **Gráfico de Evolución**: Integrar librería de gráficos (ej. Chart.js) para ver progreso de puntos.
- [x] **Gráfico de evolucion por seleccion de pilotos**: Poder selecciones los pilots a graficar.


### 🏁 Fase 2: Resultados por Gran Premio
- [ ] **Rutas Dinámicas**: Crear `/resultados/[round]` para el detalle de cada GP.
- [ ] **Componente Sesión**: `<SessionResultTable />` para mostrar tablas de tiempos (P1, P2, P3, Qualy, Race).
- [ ] **Formato de Tiempos**: Helper para formatear diferencias (`+0.4s`) y sectores.
- [ ] **Highlights**: Mostrar "Driver of the Day" y "Fastest Lap" con tarjetas destacadas (`<HighlightCard />`).

### 📈 Fase 3: Análisis y Estadísticas
- [ ] **Head-to-Head**: Comparativa visual (barras) de puntos/posiciones entre compañeros (`<TeammateComparison />`).
- [ ] **Gap Analysis**: Visualización de intervalos de tiempo en carrera.
- [ ] **Tyre Strategy**: Gráfico visual de las paradas en boxes y compuestos usados.

## 🏎️ Roadmap: Sección Circuitos

Plan de trabajo para mejorar la experiencia en la sección de circuitos y detalles del Gran Premio.

### 🏁 Fase 1: Datos y Estadísticas (Mejora del Contenido)
- [ ] **Historial de Ganadores**: Agregar campo `ultimos_ganadores` al JSON y mostrar tabla en la sección "History" (`<WinnersHistory />`).

### ⏱️ Fase 2: Dinamismo y Tiempo Real
- [ ] **Integración de Clima**: Mostrar clima actual/pronóstico usando API (ej. Open-Meteo) basado en coordenadas (`<WeatherWidget />`).

### 🗺️ Fase 3: Interactividad Visual
- [ ] **Mapa Interactivo Avanzado**: Integrar Leaflet.js para ver la ubicación real del circuito (mejora sobre la imagen estática).
- [ ] **Comparativa de Vueltas**: Gráfico visual comparando longitud/vueltas con el promedio de la temporada.

### 🔍 Fase 4: Navegación y UX
- [ ] **Filtros Avanzados**: Filtrar por Continente, Tipo (Urbano/Permanente), Formato (Sprint).
- [ ] **Estado del Evento**: Distinción visual para eventos pasados vs futuros.

### 📱 Fase 5: Integración Cross-Data
- [ ] **"El Rey del Circuito"**: Cruzar datos con `teams.json` para mostrar qué piloto actual tiene más victorias en cada trazado.

## 🏎️ Roadmap: Sección Pilotos

Plan de trabajo para la sección de pilotos y perfiles individuales, aprovechando la riqueza de `teams.json`.

### 👤 Fase 1: Listado y Tarjetas (Grid)
- [ ] **Grid de Pilotos**: Crear página `/pilotos` con un grid responsive.
- [ ] **Filtros Básicos**: Filtrar por Escudería o Nacionalidad.

### 📄 Fase 2: Perfil Detallado (Bio)
- [ ] **Página Dinámica**: Crear `/pilotos/[id]` (slug basado en el nombre).
- [ ] **Datos Personales y Profesionales**: Mostrar edad (calculada), debut, títulos y estadísticas clave.

### 🆚 Fase 3: Comparativas y Relaciones
- [ ] **Head-to-Head**: Comparativa visual con su compañero de equipo en la página de detalle (`<TeammateComparison />`).
- [ ] **Trayectoria**: Línea de tiempo simple con equipos anteriores (usando `info_profesional.ex_equipos` o `equipo_anterior`).

##  Roadmap: Sección Live

Plan para la experiencia de seguimiento en vivo de las sesiones durante el fin de semana de carrera.

### ⏱️ Fase 1: Dashboard en Tiempo Real
- [ ] **Live Timing Básico**: Tabla con tiempos por vuelta, sectores y diferencias en tiempo real (`<TimingBoard />`).
- [ ] **Estado de Sesión**: Indicadores claros de bandera (Verde, Amarilla, Roja, SC, VSC) (`<LiveStatusIndicator />`).
- [ ] **Weather Widget**: Datos del clima en directo (temperatura pista/aire, humedad, lluvia) (`<WeatherWidget />`).

### 🎙️ Fase 2: Narración y Contexto
- [ ] **Feed de Comentarios**: Minuto a minuto textual de lo que ocurre en pista (`<CommentaryFeed />`).
- [ ] **Radio Messages**: Transcripción o reproducción de mensajes de radio destacados.
- [ ] **Incidencias**: Alertas visuales para investigaciones, penalizaciones y paradas en boxes.

### 🏎️ Fase 3: Telemetría Avanzada
- [ ] **Tracker en Mapa**: Posición aproximada de los pilotos en el mapa del circuito (interpolación).
- [ ] **Comparativa de Telemetría**: Gráficos de velocidad/aceleración entre dos pilotos seleccionados.
- [ ] **Tyre History**: Visualización de la estrategia de neumáticos en uso y vueltas acumuladas.
