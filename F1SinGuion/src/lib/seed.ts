import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import fs from 'node:fs/promises';
import path from 'node:path';

// Configuración de la Base de Datos
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

// Rutas a los archivos JSON (Ajusta los nombres si difieren)
const DATA_DIR = path.join(process.cwd(), 'public');

async function seedNews() {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'news.json'), 'utf-8');
    const newsItems = JSON.parse(data);

    console.log(`📰 Procesando ${newsItems.length} noticias...`);

    const formattedNews = newsItems.map((n: any) => ({
      index: n.id, // El ID del JSON (string) va al campo index
      titulo: n.titulo,
      bajada: n.bajada || null,
      imagen: n.imagen || null,
      imagenPie: n.imagen_pie || n.imagenPie || null,
      fecha: n.fecha || new Date().toISOString(),
      tags: n.tags || [],
      categoria: n.categoria || 'General',
      fuente: n.fuente || null,
      enlaceOriginal: n.enlace_original || n.enlaceOriginal || null,
      tipo: n.tipo || 'secundaria',
      estado: n.estado || 'publicada',
      autor: n.autor || 'Redacción',
      tiempoLectura: n.tiempo_lectura || n.tiempoLectura || 0,
      visitas: n.visitas || 0,
      archivoContenido: n.archivo_contenido || n.archivoContenido || null,
      contenido: n.contenido || null,
      videoUrl: n.video_url || n.videoUrl || null,
      galeria: n.galeria || null,
    }));
    
    await db.insert(schema.news).values(formattedNews).onConflictDoUpdate({
      target: schema.news.index, // Usamos el index (slug) para detectar duplicados
      set: { 
        titulo: schema.news.titulo, // Truco para actualizar si existe (o mapear campos específicos)
        visitas: schema.news.visitas 
      } 
    });
    
    console.log('✅ Noticias insertadas correctamente.');
  } catch (error) {
    console.error('❌ Error insertando noticias:', error);
  }
}

async function seedTeamsAndDrivers() {
  try {
    const teamsPath = path.join(DATA_DIR, 'teams_2026.json');
    const driversPath = path.join(DATA_DIR, 'drivers_2026.json');
    
    let teams: any[] = [];
    let drivers: any[] = [];

    // 1. Intentar cargar Teams
    try {
      const teamsData = await fs.readFile(teamsPath, 'utf-8');
      teams = JSON.parse(teamsData);
      console.log(`📂 Teams cargados: ${teams.length} registros desde ${teamsPath}`);
    } catch (e) {
      console.warn(`⚠️  No se encontró teams.json en ${DATA_DIR}. Asegúrate de que el archivo exista.`);
    }

    // 2. Intentar cargar Drivers (o extraerlos de teams)
    try {
      const driversData = await fs.readFile(driversPath, 'utf-8');
      drivers = JSON.parse(driversData);
      console.log(`📂 Drivers cargados: ${drivers.length} registros desde ${driversPath}`);
    } catch (e) {
      console.log(`ℹ️  No se encontró drivers.json. Buscando pilotos dentro de teams.json...`);
      // Fallback: buscar en teams.drivers si existe esa estructura
      if (teams.length > 0) {
        teams.forEach((t: any) => {
          if (t.drivers && Array.isArray(t.drivers)) {
            t.drivers.forEach((d: any) => drivers.push({ ...d, teamId: t.id }));
          }
        });
        if (drivers.length > 0) console.log(`🔄 Se extrajeron ${drivers.length} pilotos anidados en teams.json`);
      }
    }

    if (teams.length > 0) {
      console.log(`🏎️ Procesando ${teams.length} escuderías...`);
      const formattedTeams = teams.map((t: any) => ({
        index: t.id,
        nombre: t.nombre,
        nombreCompleto: t.nombre_completo || t.nombreCompleto || null,
        base: t.base || null,
        jefe: t.jefe || null,
        directorTecnico: t.director_tecnico || t.directorTecnico || null,
        chasis: t.chasis || null,
        motor: t.motor || null,
        primeraParticipacion: t.primera_participacion || t.primeraParticipacion || null,
        campeonatos: t.campeonatos || 0,
        victorias: t.victorias || 0,
        poles: t.poles || 0,
        vueltasRapidas: t.vueltas_rapidas || t.vueltasRapidas || 0,
        colorVar: t.color_var || t.colorVar || null,
        logo: t.logo || null,
        imagenCoche: t.imagen_coche || t.imagenCoche || null,
        banner: t.banner || null,
        redesSociales: t.redes_sociales || t.redesSociales || null,
        reseña: t.resena || t.reseña || null,
      }));
      await db.insert(schema.teams).values(formattedTeams).onConflictDoUpdate({
        target: schema.teams.index,
        set: { nombre: schema.teams.nombre }
      });
    }

    if (drivers.length > 0) {
      console.log(`👤 Procesando ${drivers.length} pilotos...`);
      const formattedDrivers = drivers.map((d: any) => ({
        index: d.id,
        teamId: d.team_id || d.teamId || null,
        nombre: d.nombre,
        apellido: d.apellido,
        numero: d.numero || null,
        pais: d.pais || null,
        codigo: d.codigo || null,
        imagen: d.imagen || null,
        imagenCasco: d.imagen_casco || d.imagenCasco || null,
        banner: d.banner || null,
        fechaNacimiento: d.fecha_nacimiento || d.fechaNacimiento || null,
        lugarNacimiento: d.lugar_nacimiento || d.lugarNacimiento || null,
        debut: d.debut || null,
        equiposAnteriores: d.equipos_anteriores || d.equiposAnteriores || [],
        
        // Stats
        campeonatos: d.campeonatos || 0,
        victorias: d.victorias || 0,
        podios: d.podios || 0,
        poles: d.poles || 0,
        vueltasRapidas: d.vueltas_rapidas || d.vueltasRapidas || 0,
        puntosHistoricos: d.puntos_historicos || d.puntosHistoricos || 0,
        
        // 2026 Performance
        posicion: d.posicion || 0,
        puntos: d.puntos || 0,
        victoriasTemp: d.victorias_temp || d.victoriasTemp || 0,

        // Social & Info
        instagram: d.instagram || null,
        twitter: d.twitter || null,
        redesSociales: d.redes_sociales || d.redesSociales || null,
        reseña: d.resena || d.reseña || null,
        fraseReferencia: d.frase_referencia || d.fraseReferencia || null,
      }));
      await db.insert(schema.drivers).values(formattedDrivers).onConflictDoUpdate({
        target: schema.drivers.index,
        set: { nombre: schema.drivers.nombre }
      });
    }

    console.log('✅ Equipos y Pilotos procesados.');
  } catch (error) {
    console.error('❌ Error en Equipos/Pilotos:', error);
  }
}

async function seedCalendar() {
  try {
    // Basado en tu script.js, parece que el archivo se llama calendario_f1_2026.json
    const calendarData = await fs.readFile(path.join(DATA_DIR, 'calendario_f1_2026.json'), 'utf-8');
    const events = JSON.parse(calendarData);

    console.log(`📅 Procesando ${events.length} eventos del calendario...`);

    for (const [index, event] of events.entries()) {
      // Asegurar ID numérico para la relación
      const circuitId = event.id ? Number(event.id) : (event.round ? Number(event.round) : index + 1);

      // 1. Insertar Circuito
      const circuitData = {
        id: circuitId,
        nombre: event.circuit_name || event.nombre,
        pais: event.pais || event.country || null,
        ciudad: event.ciudad || event.location || null,
        bandera: event.bandera || null,
        background: event.background || null,
        imagenCircuito: event.imagen_circuito || event.circuit_image || null,
        infoTecnica: event.info_tecnica || event.infoTecnica || null,
        resenaHistorica: event.resena_historica || event.resenaHistorica || null,
        fecha: event.fecha || event.date || null,
        longitud: event.longitud ? String(event.longitud) : null,
        vueltas: event.vueltas ? Number(event.vueltas) : null,
        distanciaTotal: event.distancia_total || event.distanciaTotal || null,
        recordVuelta: event.record_vuelta || event.recordVuelta || null,
        primerGranPremio: event.primer_gran_premio || event.primerGranPremio || null,
        numeroCurvas: event.numero_curvas || event.numeroCurvas || null,
        zonasDrs: event.zonas_drs || event.zonasDrs || null,
        neumaticosSugeridos: event.neumaticos_sugeridos || event.neumaticosSugeridos || [],
        homeDriverIds: event.home_driver_ids || event.homeDriverIds || [],
        homeTeamIds: event.home_team_ids || event.homeTeamIds || [],
      };

      await db.insert(schema.circuits).values(circuitData).onConflictDoUpdate({
        target: schema.circuits.id,
        set: { nombre: circuitData.nombre }
      });

      // 2. Insertar Sesiones (si existen en el JSON)
      // Buscamos en varias propiedades comunes
      const sessionsList = event.sessions || event.Sessions || event.sesiones;

      if (sessionsList && Array.isArray(sessionsList) && sessionsList.length > 0) {
        const sessionsData = sessionsList.map((s: any) => ({
          id: s.id ? Number(s.id) : undefined, // Si es undefined, SQLite autoincrementa
          circuitId: circuitId,
          nombre: s.nombre || s.session_name || s.name, 
          tipo: s.tipo || s.session_type || s.type,
          inicio: s.inicio || s.date_start || s.date,
        }));

        // Filtramos sesiones inválidas (sin nombre o fecha)
        const validSessions = sessionsData.filter((s: any) => s.nombre && s.inicio);

        if (validSessions.length > 0) {
            await db.insert(schema.sessions).values(validSessions).onConflictDoNothing();
            console.log(`   ↳ Insertadas ${validSessions.length} sesiones para ${circuitData.nombre}`);
        }
      } else {
        console.log(`   ⚠️  No se encontraron sesiones para ${circuitData.nombre}`);
      }
    }

    console.log('✅ Calendario y Sesiones insertados.');
  } catch (error) {
    console.error('❌ Error en Calendario:', error);
  }
}

async function main() {
  console.log('🚀 Iniciando Seeding de Base de Datos...');
  
  const start = Date.now();

  await seedTeamsAndDrivers();
  await seedCalendar();
  await seedNews();

  const end = Date.now();
  console.log(`✨ Seeding completado en ${(end - start) / 1000}s`);
  process.exit(0);
}

main().catch((err) => {
  console.error('🔥 Error fatal en seeding:', err);
  process.exit(1);
});