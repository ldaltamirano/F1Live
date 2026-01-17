/**
 * Script para extraer las URLs de los trazados (SVG Outlines) 
 * del sitio oficial de F1 2026.
 */

function extraerMapasF1() {
    const selectorTarjetas = '.event-item-wrapper'; // El contenedor de cada carrera
    const selectorMascara = '.event-circuit-map .f1-placeholder'; // El elemento que tiene la máscara CSS
    
    const tarjetas = document.querySelectorAll(selectorTarjetas);
    const resultados = [];

    tarjetas.forEach((tarjeta, index) => {
        const nombreEvento = tarjeta.querySelector('.event-title')?.innerText.trim() || "Desconocido";
        const elementoMapa = tarjeta.querySelector('.event-circuit-map-wrapper [style*="mask-image"]');
        
        let urlSvg = "No encontrada";

        if (elementoMapa) {
            // Extraemos la URL del atributo style (mask-image: url("..."))
            const style = elementoMapa.getAttribute('style');
            const match = style.match(/url\("?(.+?)"?\)/);
            if (match && match[1]) {
                urlSvg = match[1];
            }
        }

        resultados.push({
            round: index + 1,
            evento: nombreEvento,
            url_mapa: urlSvg
        });
    });

    console.table(resultados); // Muestra una tabla linda en la consola
    return JSON.stringify(resultados, null, 2); // Devuelve el JSON por si quieres copiarlo
}

// Ejecutar la función
const jsonResult = extraerMapasF1();
console.log("JSON Generado:");
console.log(jsonResult);