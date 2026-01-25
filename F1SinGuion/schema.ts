import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// --- Escuderías ---
export const teams = sqliteTable('teams', {
  id: text('id').primaryKey(), // ej: "ferrari"
  nombre: text('nombre').notNull(),
  nombreCompleto: text('nombre_completo'),
  base: text('base'),
  jefe: text('jefe'),
  directorTecnico: text('director_tecnico'),
  chasis: text('chasis'),
  motor: text('motor'),
  primeraParticipacion: integer('primera_participacion'),
  campeonatos: integer('campeonatos').default(0),
  victorias: integer('victorias').default(0),
  poles: integer('poles').default(0),
  vueltasRapidas: integer('vueltas_rapidas').default(0),
  colorVar: text('color_var'), // ej: "#e10600"
  logo: text('logo'),
  imagenCoche: text('imagen_coche'),
  banner: text('banner'),
  redesSociales: text('redes_sociales', { mode: 'json' }),
  reseña: text('resena'),   
});

// --- Pilotos ---
export const drivers = sqliteTable('drivers', {
  id: text('id').primaryKey(), // ej: "leclerc"
  teamId: text('team_id').references(() => teams.id), // Relación con teams
  nombre: text('nombre').notNull(),
  apellido: text('apellido').notNull(),
  numero: integer('numero'),
  pais: text('pais'),
  codigo: text('codigo'), // ej: "LEC"
  imagen: text('imagen'),
  imagenCasco: text('imagen_casco'),
  banner: text('banner'),
  fechaNacimiento: text('fecha_nacimiento'),
  lugarNacimiento: text('lugar_nacimiento'),
  debut: text('debut'),
  equiposAnteriores: text('equipos_anteriores', { mode: 'json' }),
  
  // Estadísticas Históricas (Aplanadas para facilitar consultas)
  campeonatos: integer('campeonatos').default(0),
  victorias: integer('victorias').default(0),
  podios: integer('podios').default(0),
  poles: integer('poles').default(0),
  vueltasRapidas: integer('vueltas_rapidas').default(0),
  puntosHistoricos: integer('puntos_historicos').default(0),

  // Rendimiento 2026
  posicion: integer('posicion').default(0), // Rank actual
  puntos: integer('puntos').default(0),
  victoriasTemp: integer('victorias_temp').default(0),

  // Redes Sociales
  instagram: text('instagram'),
  twitter: text('twitter'),
  redesSociales: text('redes_sociales', { mode: 'json' }),

  reseña: text('resena'),
  fraseReferencia: text('frase_referencia'),
});

// --- Circuitos ---
export const circuits = sqliteTable('circuits', {
  id: integer('id').primaryKey(), // ID numérico del JSON (ej: 1279)
  nombre: text('nombre').notNull(),
  pais: text('pais'),
  ciudad: text('ciudad'),
  bandera: text('bandera'),
  background: text('background'),
  imagenCircuito: text('imagen_circuito'),
  infoTecnica: text('info_tecnica'),
  resenaHistorica: text('resena_historica'),
  fecha: text('fecha'), // ISO String
  
  // Datos técnicos
  longitud: text('longitud'),
  vueltas: integer('vueltas'),
  distanciaTotal: text('distancia_total'),
  recordVuelta: text('record_vuelta'),
  primerGranPremio: integer('primer_gran_premio'),
  numeroCurvas: integer('numero_curvas'),
  zonasDrs: integer('zonas_drs'),
  
  // Arrays guardados como JSON
  neumaticosSugeridos: text('neumaticos_sugeridos', { mode: 'json' }), 
  homeDriverIds: text('home_driver_ids', { mode: 'json' }),
  homeTeamIds: text('home_team_ids', { mode: 'json' }),
});

// --- Sesiones (Relacionado con Circuitos) ---
export const sessions = sqliteTable('sessions', {
  id: integer('id').primaryKey(),
  circuitId: integer('circuit_id').references(() => circuits.id),
  nombre: text('nombre'), // ej: "Qualifying"
  tipo: text('tipo'), // ej: "Practice", "Race"
  inicio: text('inicio'), // ISO String
});

// --- Noticias ---
export const news = sqliteTable('news', {
  id: text('id').primaryKey(),
  titulo: text('titulo').notNull(),
  bajada: text('bajada'),
  imagen: text('imagen'),
  imagenPie: text('imagen_pie'),
  fecha: text('fecha'),
  tags: text('tags', { mode: 'json' }), // Array de strings
  categoria: text('categoria'),
  fuente: text('fuente'),
  enlaceOriginal: text('enlace_original'),
  tipo: text('tipo'), // "principal", "secundaria", etc.
  estado: text('estado').default('publicada'),
  autor: text('autor'),
  tiempoLectura: integer('tiempo_lectura'),
  visitas: integer('visitas').default(0),
  archivoContenido: text('archivo_contenido'), // Referencia al .md
  contenido: text('contenido'),
  videoUrl: text('video_url'),
  galeria: text('galeria', { mode: 'json' }),
});


// --- Telemetría y Tiempos ---
export const lapTimes = sqliteTable('lap_times', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: integer('session_id').references(() => sessions.id),
  driverId: text('driver_id').references(() => drivers.id),
  lap: integer('lap').notNull(),
  position: integer('position'),
  time: text('time'), // Formato texto "1:32.456"
  milliseconds: integer('milliseconds'), // Para cálculos y ordenamiento
  sector1: text('sector_1'),
  sector2: text('sector_2'),
  sector3: text('sector_3'),
  gapToLeader: text('gap_to_leader'),
  interval: text('interval'),
  compound: text('compound'), // "SOFT", "MEDIUM", "HARD", "INTER", "WET"
  tyreAge: integer('tyre_age'),
  isValid: integer('is_valid', { mode: 'boolean' }).default(true),
});

export const telemetry = sqliteTable('telemetry', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: integer('session_id').references(() => sessions.id),
  driverId: text('driver_id').references(() => drivers.id),
  timestamp: text('timestamp'), // ISO String o tiempo relativo de la sesión
  speed: integer('speed'),
  rpm: integer('rpm'),
  gear: integer('gear'),
  throttle: integer('throttle'), // 0-100
  brake: integer('brake'), // 0-100
  drs: integer('drs', { mode: 'boolean' }),
  x: integer('x'), // Coordenadas para mapa (si aplica)
  y: integer('y'),
  z: integer('z'),
});


// --- Dashboard / Admin ---
export const admin = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  permissionId: integer('permission_id').references(() => permissions.id),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
});

export const auditLogs = sqliteTable('audit_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => admin.id),
  action: text('action').notNull(), // 'CREATE', 'UPDATE', 'DELETE'
  table: text('table').notNull(), // 'drivers', 'news', etc.
  recordId: text('record_id').notNull(),
  changes: text('changes', { mode: 'json' }), // JSON con los cambios
  timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
});

export const permissions = sqliteTable('permissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  role: text('role'), // 'admin', 'editor'
  resource: text('resource').notNull(), // 'drivers', 'news', 'all'
  action: text('action').notNull(), // 'create', 'read', 'update', 'delete'
});