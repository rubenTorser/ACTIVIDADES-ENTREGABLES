// =====================================================================
// UT03 - Actividad evaluable: Mi ficha personal
// Alumno/a: ...........................................
// Para mostrar resultados en la página usa mostrar("<p>texto</p>").
// =====================================================================

// Objeto con los datos de la ficha (ver apartado 0 del enunciado).
// Se completa en los apartados 1, 2 y 3 y lo usan los apartados 4 y 5.
// Se declara con var (no con let ni const) para que la ventana hija
// pueda acceder a ella con window.opener.ficha.
var ficha = {};

// 1. STRING ------------------------------------------------------------
function analizarNombre() {
  mostrar("<h2>1. Nombre</h2>");
  let nombre = prompt("Introduce tu nombre:");
  if(nombre === null || nombre.trim() === "") {
    nombre = null;
    console.log(nombre);
  }
  else{
    let nombreSinTildes = quitarTildes(nombre);
    
    /*
    elimina los espacios sobrantes (trim(), split(), filter(), join()) y 
    pon en mayúscula la primera letra de cada palabra y el resto en minúscula.
    Con el ejemplo anterior se obtiene "Lucía Martín Peña". 
    Guárdalo en ficha.nombre.
    */
    let nombreNormalizado = nombreSinTildes.toLowerCase().trim().split(" ").filter((item) => item !== "").join(" ");
    nombreNormalizado = nombreNormalizado.replace(/\b\w/g, (l) => l.toUpperCase());
    ficha.nombre = nombreNormalizado;
    mostrar(`<p>Nombre: ${ficha.nombre}</p>`);


    /*
  Muestra:
  •	Las iniciales. Ejemplo: LMP.
  •	El número de letras, sin contar los espacios. Ejemplo: 15.
  •	El nombre escrito al revés. Ejemplo: "Lucía Martín Peña" → "añeP nítraM aícuL".
  */

  // Muestra las iniciales
  let iniciales = ficha.nombre.split(" ").map((palabra) => palabra[0]).join("");
  mostrar(`<p>Iniciales: ${iniciales}</p>`);

  // Muestra el número de letras, sin contar los espacios
  let numLetras = ficha.nombre.replace(/\s/g, "").length;
  mostrar(`<p>Número de letras: ${numLetras}</p>`);

  // Muestra el nombre escrito al revés
  let nombreReves = ficha.nombre.split("").reverse().join("");
  mostrar(`<p>Nombre al revés: ${nombreReves}</p>`);


  /* 
  Pide tu DNI con prompt() y genera tu nombre de usuario, formado por:
  •	Las 4 primeras letras de tu primer apellido, en minúscula y sin tildes. Considera que el primer apellido es la penúltima palabra del nombre completo.
  •	La inicial de tu nombre, en minúscula y sin tilde.
  •	Los 3 últimos dígitos del DNI.
  Ejemplo: "Lucía Martín Peña" con DNI 12345678 → martl678.
  Si el apellido tiene menos de 4 letras, complétalo con x usando padEnd() (ver Anexo B). Por ejemplo, Gil → gilx. Guarda el resultado en ficha.usuario.
  */
  let dni = prompt("Introduce tu DNI:");
  if(dni === null || dni.trim() === "") {
    dni = null;
  } else {
    let apellido = ficha.nombre.split(" ").slice(-2, -1)[0];
    let inicial = ficha.nombre.split(" ")[0][0];
    let ultimos3 = dni.slice(-3);
    ficha.usuario = apellido.toLowerCase().replace(/á|é|í|ó|ú/g, (l) => 
      "aeiou".replace(l, "")).padEnd(4, "x") + 
      inicial.toLowerCase().replace(/á|é|í|ó|ú/g, (l) => 
      "aeiou".replace(l, "")) + ultimos3;
    mostrar(`<p>Nombre de usuario: ${ficha.usuario}</p>`);
  }
  }

}

// 2. NUMBER Y MATH -----------------------------------------------------
function analizarNumeros() {
  mostrar("<h2>2. Números</h2>");
  /*
  2.1. Pide con prompt() tu fecha de nacimiento en formato dd/mm/aaaa y guarda 
  el texto en ficha.textoNacimiento (lo usarás en el apartado 3).
  •	Muestra el día, el mes y el año en binario, octal y hexadecimal, usando toString(base).
  •	Comprueba la conversión inversa con parseInt(texto, base): a partir del binario y del hexadecimal, 
    obtén de nuevo el número decimal.

  2.2. Genera una contraseña aleatoria con tantos caracteres como letras tenga tu nombre (mínimo 8). 
  Debe contener, al menos, una mayúscula, una minúscula, un dígito y un símbolo. Usa Math.random() y 
  Math.floor(). Guárdala en ficha.contrasena.
  */

    let fechaNacimiento = prompt("Introduce tu fecha de nacimiento en formato dd/mm/aaaa:");
    if(fechaNacimiento === null || fechaNacimiento.trim() === "") {
      fechaNacimiento = null;
    } 
    else 
    {
      ficha.textoNacimiento = fechaNacimiento;
      let [dia, mes, anio] = fechaNacimiento.split("/").map(Number);
      mostrar(`<p>Día: ${dia} (binario: ${dia.toString(2)}, octal: ${dia.toString(8)}, hexadecimal: ${dia.toString(16)})</p>`);
      mostrar(`<p>Mes: ${mes} (binario: ${mes.toString(2)}, octal: ${mes.toString(8)}, hexadecimal: ${mes.toString(16)})</p>`);
      mostrar(`<p>Año: ${anio} (binario: ${anio.toString(2)}, octal: ${anio.toString(8)}, hexadecimal: ${anio.toString(16)})</p>`);
    }

    let longitudContrasena;
    
    if(ficha.nombre === undefined || ficha.nombre === null) {
      longitudContrasena = 8;
    } else {
      longitudContrasena = Math.max(ficha.nombre.replace(/\s/g, "").length, 8);
    }

    let mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let minusculas = "abcdefghijklmnopqrstuvwxyz";
    let digitos = "0123456789";
    let simbolos = "!@#$%^&*()_+-=[]{}|;:',.<>/?";
    let todosCaracteres = mayusculas + minusculas + digitos + simbolos;

    let contrasena = "";
    contrasena += mayusculas[Math.floor(Math.random() * mayusculas.length)];
    contrasena += minusculas[Math.floor(Math.random() * minusculas.length)];
    contrasena += digitos[Math.floor(Math.random() * digitos.length)];
    contrasena += simbolos[Math.floor(Math.random() * simbolos.length)];

    for (let i = 4; i < longitudContrasena; i++) {
      contrasena += todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)];
    }

    // Mezclar la contraseña para que los caracteres obligatorios no estén siempre al principio
    contrasena = contrasena.split("").sort(() => Math.random() - 0.5).join("");
    ficha.contrasena = contrasena;
    mostrar(`<p>Contraseña generada: ${ficha.contrasena}</p>`);
  }

// 3. DATE --------------------------------------------------------------
function analizarFechas() {
  mostrar("<h2>3. Fechas</h2>");
  /*
  3.1. A partir de ficha.textoNacimiento, crea tu fecha de nacimiento con new Date(año, mes - 1, día) y guárdala en ficha.nacimiento.
  Además, valida la fecha: escribe una función que compruebe si una fecha existe comparando el día, el mes y el año del objeto Date creado con los 
  introducidos. Comprueba que 31/02/2005 se detecta como incorrecta y que tu fecha es correcta.
  3.2. Muestra:
  •	Tu edad exacta, en años cumplidos. Guárdala en ficha.edad.
  •	Los días que has vivido.
  •	El día de la semana en que naciste, en español: toLocaleDateString("es-ES", { weekday: "long" }). Guárdalo en ficha.diaSemana.
  3.3. Muestra en qué fecha cumplirás (o cumpliste) 10 000 días de vida.
  */
 let fechaHoy = new Date();
 let diaMesAnio = ficha.textoNacimiento.split("/").map(Number);
 let fechaNacimiento = new Date(diaMesAnio[2], diaMesAnio[1] - 1, diaMesAnio[0]);

 let fechaValida = (fechaNacimiento.getDate() === diaMesAnio[0] && fechaNacimiento.getMonth() === diaMesAnio[1] - 1 && fechaNacimiento.getFullYear() === diaMesAnio[2]);

 if (!fechaValida) {
   mostrar("<p>La fecha introducida no es válida.</p>");
   return;
 }

 let diferenciaUnix = fechaHoy - fechaNacimiento;
 let diasVividos = Math.floor(diferenciaUnix / (1000 * 60 * 60 * 24));
 let edad = Math.floor(diasVividos / 365);
 let diaSemana = fechaNacimiento.toLocaleDateString("es-ES", { weekday: "long" }); 

 mostrar(`<p>Edad: ${edad} años</p>`);
 mostrar(`<p>Dias Vividos: ${diasVividos} días</p>`);
 mostrar(`<p>Dia de la semana que naciste: ${diaSemana}</p>`);

 ficha.nacimiento = fechaNacimiento;
 ficha.edad = edad;
 ficha.diaSemana = diaSemana;
 let diezMilDias = new Date(fechaNacimiento.getTime() + 10000 * 24 * 60 * 60 * 1000);
 mostrar(`<p>Fecha en la que cumplirás 10.000 días: ${diezMilDias.toLocaleDateString("es-ES")}</p>`);


}

// 4. VENTANAS ----------------------------------------------------------
let ventanaHija = null;

function abrirVentana() {
  mostrar("<h2>4. Ventanas</h2>");
  /*
  4.1. Con window.open(), abre hija.html en una ventana nueva de anchura 300 + día de nacimiento × 10 píxeles y altura 400. 
  Guarda la referencia en la variable ventanaHija.
  •	Si el navegador bloquea la ventana (window.open() devuelve null), muestra un aviso con alert().
  •	Si la ventana ya está abierta, no abras otra: ponla en primer plano con focus().
  */

  if (ventanaHija && !ventanaHija.closed) {
    ventanaHija.focus();
  } else {
    let ancho = 300 + (ficha.nacimiento.getDate() * 10);
    let alto = 400;
    ventanaHija = window.open("hija.html", "Ventana Hija", `width=${ancho},height=${alto}`);
    if (!ventanaHija) {
      alert("El navegador ha bloqueado la ventana emergente. Por favor, permite ventanas emergentes para este sitio.");
    }
  }
}

// La ventana hija llama a esta función con window.opener.recibirMensaje(texto)
function recibirMensaje(texto) {
  mostrar(`<p>Mensaje recibido de la ventana hija: ${texto}</p>`);
  if(ventanaHija && !ventanaHija.closed) {
    ventanaHija.close();
    mostrar("<p>La ventana hija se ha cerrado.</p>");
  }
  else{
    mostrar("<p>La ventana hija ya estaba cerrada.</p>");
  }
}

// 5. ALMACENAMIENTO ----------------------------------------------------
/*
Guarda el objeto ficha en localStorage, convertido a texto con JSON.stringify().
Después, recupera la ficha con JSON.parse() y muéstrala. Ten en cuenta que JSON.stringify() 
convierte las fechas en texto (por ejemplo, "2005-04-11T22:00:00.000Z"), así que la fecha de 
nacimiento vuelve como una cadena: conviértela de nuevo en Date con new Date(texto) y comprueba su tipo.
*/
function guardarFicha() {
  mostrar("<h2>5. Guardar ficha</h2>");
  localStorage.setItem("ficha", JSON.stringify(ficha));
  let fichaRecuperada = JSON.parse(localStorage.getItem("ficha"));
  fichaRecuperada.nacimiento = new Date(fichaRecuperada.nacimiento);
  mostrar(`<p>Ficha recuperada: ${JSON.stringify(fichaRecuperada)}</p>`);
  mostrar(`<p>Tipo de fichaRecuperada.nacimiento: ${typeof fichaRecuperada.nacimiento}</p>`);
}
