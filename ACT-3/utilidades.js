// =====================================================================
// utilidades.js  ->  NO MODIFICAR
// =====================================================================

/**
 * Añade el texto o código HTML recibido al final de la zona de salida.
 * @param {string} html Texto o código HTML que se muestra.
 */
function mostrar(html) {
  document.getElementById("salida").innerHTML += html;
}

/** Vacía la zona de salida. */
function limpiar() {
  document.getElementById("salida").innerHTML = "";
}

/**
 * Elimina las tildes de un texto (también convierte la ñ en n).
 * Ejemplo: quitarTildes("Peña Martín") devuelve "Pena Martin".
 * @param {string} texto Texto original.
 * @returns {string} Texto sin tildes.
 */
function quitarTildes(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "");
}
