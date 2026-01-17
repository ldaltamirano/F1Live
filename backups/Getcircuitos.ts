const BASE_URL = "https://api.openf1.org/v1";

    interface GP {
      meeting_key: number;
      meeting_name: string;
      country_name: string;
      date_start: string;
    }

    interface Session {
      session_key: number;
      session_name: string;
      session_type: string;
      date_start: string;
    }

    /**
     * LLAMADA 1: Obtiene todos los Grandes Premios de un año específico.
     */
    async function obtenerGPs(anio: number) {
      try {
        const response = await fetch(`${BASE_URL}/meetings?year=${anio}`);
        if (!response.ok) throw new Error("Error al obtener GPs");

        const gps: GP[] = await response.json();
        return gps.map((gp) => ({
          id: gp.meeting_key,
          nombre: gp.meeting_name,
          pais: gp.country_name,
          fecha: gp.date_start,
        }));
      } catch (error) {
        console.error("Error en obtenerGPs:", error);
        return [];
      }
    }

    /**
     * LLAMADA 2: Obtiene las sesiones de un GP específico usando su meeting_key.
     */
    async function obtenerSesionesDeGP(meetingKey: number) {
      try {
        const response = await fetch(
          `${BASE_URL}/sessions?meeting_key=${meetingKey}`
        );
        if (!response.ok) throw new Error("Error al obtener sesiones");

        const sesiones: Session[] = await response.json();
        return sesiones.map((s) => ({
          id: s.session_key,
          nombre: s.session_name,
          tipo: s.session_type,
          inicio: s.date_start,
        }));
      } catch (error) {
        console.error(
          `Error en obtenerSesionesDeGP para la key ${meetingKey}:`,
          error
        );
        return [];
      }
    }

    /**
     * EJEMPLO DE USO:
     * Primero listamos los GPs y luego consultamos las sesiones del primero.
     */
    async function ejecutarProyecto() {
      console.log("--- Verificando actualizaciones del Calendario 2026 ---");
      
      // 1. Intentar cargar el JSON actual desde public
      let calendarioActual: any[] = [];
      try {
        const res = await fetch('/calendario_f1_2026.json');
        if (res.ok) {
          calendarioActual = await res.json();
          console.log(`Calendario local cargado: ${calendarioActual.length} eventos.`);
        }
      } catch (error) {
        console.log("No se encontró calendario local o hubo error al leerlo. Se creará uno nuevo.");
      }

      // 2. Obtener lista de GPs desde la API
      const listaGPsApi = await obtenerGPs(2026);
      let nuevosGPs = 0;

      if (listaGPsApi.length > 0) {
        for (const gpApi of listaGPsApi) {
          // Verificar si este GP ya existe en nuestro JSON local
          const existe = calendarioActual.find((gpLocal: any) => gpLocal.id === gpApi.id);

          if (!existe) {
            console.log(`\nNuevo GP detectado: ${gpApi.nombre}. Obteniendo sesiones...`);
            const sesiones = await obtenerSesionesDeGP(gpApi.id);
            
            calendarioActual.push({ ...gpApi, sesiones });
            nuevosGPs++;
          }
        }
      }

      // 3. Si hubo cambios, descargar el nuevo JSON
      if (nuevosGPs > 0) {
        console.log(`Se agregaron ${nuevosGPs} eventos nuevos. Descargando actualización...`);
        // Ordenar cronológicamente
        calendarioActual.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        const blob = new Blob([JSON.stringify(calendarioActual, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'calendario_f1_2026.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      } else {
        console.log("El calendario está al día. No hay cambios.");
      }
    }

    ejecutarProyecto();