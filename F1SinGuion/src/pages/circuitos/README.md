# F1 Live - Project Roadmap

## 🏎️ Roadmap: Sección Circuitos

Plan de trabajo para mejorar la experiencia en la sección de circuitos y detalles del Gran Premio.

### 🏁 Fase 1: Datos y Estadísticas (Mejora del Contenido)
- [ ] **Desglosar Datos Técnicos**: Separar `longitud_km`, `numero_vueltas`, `distancia_carrera`, `record_vuelta` en el JSON y mostrar en `<StatGrid />`.
- [ ] **Historial de Ganadores**: Agregar campo `ultimos_ganadores` al JSON y mostrar tabla en la sección "History".

### ⏱️ Fase 2: Dinamismo y Tiempo Real
- [ ] **Cuenta Regresiva (Countdown)**: Reloj en tiempo real hacia la sesión `Race` en la cabecera del detalle.
- [ ] **Integración de Clima**: Mostrar clima actual/pronóstico usando API (ej. Open-Meteo) basado en coordenadas.

### 🗺️ Fase 3: Interactividad Visual
- [ ] **Mapa Interactivo**: Integrar Leaflet.js para ver la ubicación real del circuito.
- [ ] **Comparativa de Vueltas**: Gráfico visual comparando longitud/vueltas con el promedio de la temporada.

### 🔍 Fase 4: Navegación y UX
- [ ] **Filtros Avanzados**: Filtrar por Continente, Tipo (Urbano/Permanente), Formato (Sprint).
- [ ] **Estado del Evento**: Distinción visual para eventos pasados vs futuros.

### 📱 Fase 5: Integración Cross-Data
- [ ] **"El Rey del Circuito"**: Cruzar datos con `teams.json` para mostrar qué piloto actual tiene más victorias en cada trazado.