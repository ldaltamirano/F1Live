// --- VERSIÓN PARA NAVEGADOR (Chrome/Edge) ---
// Si no tienes Node.js, puedes ejecutar este código directamente en la consola del navegador (F12).
// Requisitos:
// 1. Abre tu sitio en localhost (ej: http://localhost:4321).
// 2. Pega este código en la consola.
// 3. Selecciona la carpeta donde quieres guardar los archivos cuando se te pida.

const API_URL = "https://api.openf1.org/v1/meetings?year=2026";
const LOCAL_JSON_URL = "/calendario_f1_2026.json"; // Ruta relativa al servidor web

// Mapeo manual de países a códigos ISO (Alpha-2) para F1
const countryMapping = {
    "Bahrain": "BH",
    "Australia": "AU",
    "China": "CN",
    "Japan": "JP",
    "Saudi Arabia": "SA",
    "United States": "US",
    "USA": "US",
    "Canada": "CA",
    "Monaco": "MC",
    "Spain": "ES",
    "Austria": "AT",
    "United Kingdom": "GB",
    "UK": "GB",
    "Great Britain": "GB",
    "Belgium": "BE",
    "Hungary": "HU",
    "Netherlands": "NL",
    "Italy": "IT",
    "Azerbaijan": "AZ",
    "Singapore": "SG",
    "Mexico": "MX",
    "Brazil": "BR",
    "Qatar": "QA",
    "United Arab Emirates": "AE",
    "UAE": "AE",
    "Korea": "KR",
    "Russia": "RU"
};

function obtenerCodigoIso(nombrePais) {
    if (countryMapping[nombrePais]) return countryMapping[nombrePais];
    // Búsqueda insensible a mayúsculas
    const lowerName = nombrePais.toLowerCase();
    for (const [key, val] of Object.entries(countryMapping)) {
        if (key.toLowerCase() === lowerName) return val;
    }
    return null;
}

async function descargarImagen(url, dirHandle, nombreArchivo) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        
        // Crear archivo en el directorio seleccionado
        const fileHandle = await dirHandle.getFileHandle(nombreArchivo, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        
        console.log(`    [OK] Guardado: ${nombreArchivo}`);
    } catch (err) {
        console.error(`    [ERROR] Falló descarga de ${url}: ${err.message}`);
    }
}

async function main() {
    console.log("--- Iniciando descarga de assets (Modo Navegador) ---");
    console.log("Por favor, selecciona la carpeta de destino en la ventana emergente...");

    let rootDirHandle;
    try {
        // API File System Access (Solo Chrome/Edge/Opera en Desktop)
        rootDirHandle = await window.showDirectoryPicker();
    } catch (err) {
        console.error("Acceso a carpeta cancelado o no soportado.", err);
        return;
    }

    // 1. Cargar datos locales SOLO para obtener las URLs de los mapas (la API no las provee)
    let localCircuitos = [];
    try {
        const res = await fetch(LOCAL_JSON_URL);
        if (res.ok) localCircuitos = await res.json();
    } catch (e) {
        console.warn("Advertencia: No se pudo cargar el JSON local (fetch).");
    }

    // 2. Obtener lista de meetings desde la API
    console.log(`Consultando API: ${API_URL}`);
    let apiMeetings = [];
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        apiMeetings = await res.json();
    } catch (error) {
        console.error("Error al consultar la API:", error);
        return;
    }

    console.log(`Se encontraron ${apiMeetings.length} eventos en la API.`);

    for (const meeting of apiMeetings) {
        const meetingName = meeting.meeting_name;
        const circuitName = meeting.circuit_short_name; // Dato oficial del circuito desde OpenF1
        const pais = meeting.country_name; // La API usa 'country_name'
        
        // Formato solicitado: "Gran Premio de [País]"
        let nombreBase = `Gran Premio de ${pais}`;
        // Para evitar sobrescribir carpetas en países con múltiples carreras (USA, Italia, España), añadimos el nombre del evento
        if (["United States", "Italy", "Spain"].includes(pais)) {
            nombreBase += ` - ${meetingName.replace(' Grand Prix', '')}`;
        }
        const nombreCarpeta = nombreBase.replace(/[^a-z0-9 \-_]/gi, '').trim();
        
        // Crear/Obtener subcarpeta
        const circuitoDirHandle = await rootDirHandle.getDirectoryHandle(nombreCarpeta, { create: true });
            
        console.log(`\nProcesando: ${meetingName} -> Circuito: ${circuitName}`);

        // 1. Descargar Mapa (Prioridad: circuit_image de API, luego JSON local)
        let urlMapa = meeting.circuit_image;

        if (!urlMapa) {
            const localMatch = localCircuitos.find(c => c.nombre === meetingName || (c.pais === pais && !meetingName.includes("Testing")));
            if (localMatch) urlMapa = localMatch.imagen_circuito;
        }
        
        if (urlMapa) {
            // Extraer extensión simple
            let ext = ".jpg";
            if (urlMapa.includes('.')) {
                 const parts = urlMapa.split('.');
                 const possibleExt = '.' + parts[parts.length - 1].split('?')[0];
                 if (possibleExt.length <= 5) ext = possibleExt;
            }
            
            await descargarImagen(urlMapa, circuitoDirHandle, `mapa${ext}`);
        } else {
            console.log("    [INFO] No se encontró URL de mapa para este evento.");
        }

        // 2. Descargar Bandera
        if (pais) {
            const isoCode = obtenerCodigoIso(pais);
            if (isoCode) {
                const urlBandera = `https://flagcdn.com/w640/${isoCode.toLowerCase()}.png`;
                await descargarImagen(urlBandera, circuitoDirHandle, "bandera.png");
            } else {
                console.warn(`    [WARN] No se encontró código ISO para: ${pais}`);
            }
        }
    }
    console.log("--- Proceso finalizado ---");
}

// Creamos un botón temporal para cumplir con el requisito de "User Gesture"
const btn = document.createElement('button');
btn.innerText = "INICIAR DESCARGA (Click aquí)";
btn.style.position = "fixed";
btn.style.top = "10px";
btn.style.left = "10px";
btn.style.zIndex = "10000";
btn.style.padding = "20px";
btn.style.backgroundColor = "#e10600"; // Rojo F1
btn.style.color = "white";
btn.style.fontWeight = "bold";
btn.style.cursor = "pointer";
btn.style.border = "2px solid white";
btn.style.borderRadius = "8px";
btn.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";

btn.onclick = async () => {
    btn.innerText = "Procesando... (Mira la consola)";
    btn.disabled = true;
    btn.style.opacity = "0.7";
    await main();
    btn.innerText = "¡COMPLETADO!";
    btn.style.backgroundColor = "green";
};

document.body.appendChild(btn);
console.log(">>> BOTÓN CREADO: Haz clic en el botón rojo en la esquina superior izquierda de la página para iniciar.");