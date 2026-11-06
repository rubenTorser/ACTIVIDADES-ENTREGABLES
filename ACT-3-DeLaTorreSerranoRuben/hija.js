// =====================================================================
// UT03 - hija.js
// Alumno/a: ...........................................
// =====================================================================

// 4.2 Al cargarse, la ventana hija muestra los datos de la ficha de la
// ventana principal (window.opener.ficha).

if (!window.opener || !window.opener.ficha) {
  mostrar("<p>Error: No se puede acceder a la ventana principal.</p>");
}

mostrar("<h2>4. Ventana hija</h2>");
mostrar("<p>Datos de la ficha de la ventana principal:</p>");
mostrar(`<p>Nombre: ${window.opener.ficha.nombre}</p>`);
mostrar(`<p>Edad: ${window.opener.ficha.edad}</p>`);
mostrar(`<p>Usuario: ${window.opener.ficha.usuario}</p>`);
mostrar(`<p>Contraseña: ${window.opener.ficha.contrasena}</p>`);
mostrar(`<p>Fecha de nacimiento: ${window.opener.ficha.nacimiento}</p>`);
mostrar(`<p>Dia de la semana que naciste: ${window.opener.ficha.diaSemana}</p>`);


// 4.3 Envía un mensaje a la ventana principal y cierra esta ventana.
function enviarAlPadre() {
  if (window.opener && !window.opener.closed) {
    let mensaje = prompt("Introduce un mensaje para la ventana principal:");
    if (mensaje !== null) {
      window.opener.recibirMensaje(mensaje);
    }
  } else {
    alert("La ventana principal no está disponible.");
  }
  window.close();
}
