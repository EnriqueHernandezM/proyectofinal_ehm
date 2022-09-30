// variables con las que regreso los valores para guardar edad del index
let regreso = localStorage.getItem("inputValueEntradaEdad");
let regresoOn = parseInt(regreso);
//variables con las que regreso el carrito de compras
let regresoGcarrito = localStorage.getItem("carritoGuardado");
regresoGcarrito = JSON.parse(regresoGcarrito);
// regreso el nombre que ingresa al principio
let nombreIgresadoParaUsar = localStorage.getItem("inputValueNombre");
//var para usar luxon
var DateTime = luxon.DateTime;
//funcion que me premiste saber si el cliente ya accedio siendo mayor de edad
const mostrarRegreso = () => {
  if (regresoOn >= 18) {
    document.getElementById("acceso").remove();
  } else if (regresoOn <= 17) {
    bloquearAcceso();
  } else if (regresoOn == " ") {
    document.getElementById("acceso");
    respuesta();
  }
};
//funcion para permitir acceso en caso de ser mayor de edad
const respuesta = () => {
  let esp = " ";
  let inputValue = document.getElementById("entradaEdad").value;
  let inputValueNombre = document.getElementById("entradaNombre").value;
  localStorage.setItem("inputValueNombre", inputValueNombre);
  localStorage.setItem("inputValueEntradaEdad", inputValue);
  if (inputValue >= 18) {
    let inset = "";
    inset =
      inset +
      `
    <div id="anuncioEntrada">
    </div>
    `;
    document.getElementById("respAnuncio").innerHTML = inset;
    // USAMOS OPERADOR OR
    // USAMOS OPERADOR OR
    let mostrando = "";
    let resulta = " Hola" + esp + (inputValueNombre || "Camarada") + esp + " tienes" + esp + inputValue + esp + "años" + esp + "bienvenido" + esp + "no olvides visitar nuestra Tienda";
    mostrando =
      mostrando +
      `<div>
      <h3> 
      <p>${resulta} </p>
      </h3>
     </div>
      `;
    document.getElementById("anuncioEntrada").innerHTML = mostrando;
    document.getElementById("acceso").remove();
  } else if (inputValue < 17) {
    bloquearAcceso();
  }
};
//funcion para bloquear acceso con un swal fire
function bloquearAcceso() {
  Swal.fire({
    title: "<h5> Al parecer eres menor de edad</h5>",
    icon: "warning",
    html: " NO tomes antes de los 18 te recomendamos visitar este sitio web " + "<a href=https://www.clinicaalemana.cl/centro-de-extension/material-educativo/no-tomes-antes-de-los-18> VISITAR </a> ",
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    showConfirmButton: false,
    confirmButtonText: false,
    confirmButtonAriaLabel: false,
    allowOutsideClick: false,
  });
}
//array disponibles aun
let carritoDeCompras = [];
let esp = " ";
//funcion para mostrar items disponibles en pantalla Tienda
const mostrarItemsEnTienda = () => {
  fetch("../data.json")
    .then((res) => res.json())
    .then((json) => {
      inventarioVinateria = json.itemsDisponebles;
      let html = "";
      for (let i = 0; i < inventarioVinateria.length; i++) {
        html =
          html +
          `
      <div  >
        <p><img src="${inventarioVinateria[i].imagen}"/> </p>
        <p> ${inventarioVinateria[i].nombreProducto} </p>
        <p> $${inventarioVinateria[i].precio}</p>
        <p >${inventarioVinateria[i].tipoDeLicor}</p>
        <p>
        <span onclick=addToCart(${inventarioVinateria[i].id}); > 🛒 </span>
        </p>
      </div>
      `;
      }
      document.getElementById("itemsAmostrar").innerHTML = html;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
//funcion para aniadir productos al carrito
const addToCart = (id) => {
  fetch("../data.json")
    .then((res) => res.json())
    .then((json) => {
      inventarioVinateria = json.itemsDisponebles;
      const productoIntroduzido = inventarioVinateria.find((item) => item.id == id);
      if (regresoGcarrito) {
        carritoDeCompras = regresoGcarrito;
      }
      carritoDeCompras.push(productoIntroduzido);
      let carritoGuardado = JSON.stringify(carritoDeCompras); //guarde elementos push el localstore
      localStorage.setItem("carritoGuardado", carritoGuardado);
      Swal.fire({
        // aqui utilize 1 libreria
        position: "top-end",
        icon: "success",
        title: "<p style=color:black>Agregaste un articulo a  tu carrito</p>",
        showConfirmButton: false,
        background: "url(../imagenes/madera.jpg)",
        timer: 650,
      });
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
//funcion 3 para quitar items en carrito AQUI use swwet alert
const quitarDelCarrito = (id) => {
  Swal.fire({
    title: "<h5 style=color:black >Quieres eliminar este producto de tu carrito ?</h5> ",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonColor: "#92d1ff",
    denyButtonColor: "fffec5",
    confirmButtonText: "<i style=color:black > QUITAR </i>",
    denyButtonText: "<i style=color:black > CANCELAR </i>",
    background: "url(../imagenes/madera.jpg)",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        title: " <p style=color:black> Producto eliminado </p>",
        icon: "success",
        showConfirmButton: false,
        timer: 500,
        background: "url(../imagenes/madera.jpg)",
      });
      if (regresoGcarrito) {
        carritoDeCompras = regresoGcarrito;
        carritoDeCompras.splice(id, 1);
        carritoGuardado = JSON.stringify(carritoDeCompras); //guarde elementos borrados del carrito el localstore
        localStorage.setItem("carritoGuardado", carritoGuardado);
        mostrarEnPagCarrito();
      } else {
        carritoDeCompras.splice(id, 1);
        mostrarItemsEnCarrito();
      }
    } else if (result.isDenied) {
      mostrarItemsEnCarrito();
    }
  });
};
// funcion que muestra los articulos en la pagina de carrito al cerrar navegador
const mostrarEnPagCarrito = () => {
  if (regresoGcarrito) {
    carritoDeCompras = regresoGcarrito;
    mostrarItemsEnCarrito();
  }
};
// mostrar items agregados en carrito y mi acumulador esta aqui adentro
const mostrarItemsEnCarrito = () => {
  const prueba = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
  if (carritoDeCompras.length == 0) {
    document.getElementById("itemsEnElCarrito").innerHTML = "<h3 class = 'animate__animated animate__flash' >INGRESA PRODUCTOS A TU CARRITO</h3>";
    document.getElementById("acumuladorTotal").innerHTML = esp;
    pasarApagar("vacio");
  } else {
    let html = "";
    for (let i = 0; i < carritoDeCompras.length; i++) {
      html =
        html +
        `
      <div>
      <container>
      <p> <img src="${carritoDeCompras[i].imagen}" /></p>
      <p> ${carritoDeCompras[i].nombreProducto}</p>
      <p> ${carritoDeCompras[i].tipoDeLicor}</p>
      <p> $${carritoDeCompras[i].precio}</p>
      <span onclick=quitarDelCarrito(${[i]});>🗑️</span>
      </container>
      </div>
      `;
      document.getElementById("itemsEnElCarrito").innerHTML = html;
    }
    let acumulador = "";
    acumulador =
      acumulador +
      `
        <div>
          <h2>Total</h2>
          <h3>$${prueba}</h3> 
          <button onclick="pasarApagar('reset')"> Reiniciar Carrito </button>
          <button onclick="pasarApagar('programar')"> programar </button>
          <button onclick="pasarApagar('pagar')"> pagar </button>
        </div >
      `;
    document.getElementById("acumuladorTotal").innerHTML = acumulador;
  }
};
//funcion buscador por tipos de licor funciona con minusculas!!!
const buscadorItems = (entradaAbuscar) => {
  fetch("../data.json")
    .then((res) => res.json())
    .then((json) => {
      inventarioVinateria = json.itemsDisponebles;
      entradaAbuscar = document.getElementById("ingresoBuscadorItems").value;
      //const sugerencias = document.querySelector(".sugerencias");
      entradaAbuscar === "" && mostrarItemsEnTienda();
      document.getElementById("ingresoBuscadorItems").value = "";
      inventarioVinateria = inventarioVinateria.filter((el) => el.tipoDeLicor.includes(entradaAbuscar));
      let html = "";
      for (let i = 0; i < inventarioVinateria.length; i++) {
        html =
          html +
          `
      <div  >
        <p><img src="${inventarioVinateria[i].imagen}"/> </p>
        <p> "${inventarioVinateria[i].nombreProducto}" </p>
        <p> $${inventarioVinateria[i].precio}</p>
        <p >${inventarioVinateria[i].tipoDeLicor}</p>
        <p>
        <span onclick=addToCart(${inventarioVinateria[i].id}); > 🛒 </span>
        </p>
      </div>
      `;
      }
      document.getElementById("itemsAmostrar").innerHTML = html;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
//switch para barra carrito de compra reiniciar,programar,pagarcarrito
const pasarApagar = (valor) => {
  switch (valor) {
    case "pagar":
      Swal.fire({
        title: "<strong style=color:white> Pagar carrito </strong>",
        html: "<p style=color:white>has concluido tu compra? Ve a metodo de pago</p>, " + "<p>💳</p> ",
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "<a style=color:black  class=fa fa-thumbs-up onclick=procesadorDePago()>VAMOS</a> ",
        confirmButtonAriaLabel: "Thumbs up, great!",
        confirmButtonColor: "#92d1ff",
        cancelButtonText: '<i style=color:black class="fa fa-thumbs-down" > SEGUIR COMPRANDO</i>',
        cancelButtonAriaLabel: "Thumbs down",
        cancelButtonColor: "#fffec5",
        footer: '<a style=color:white href="animejs.com">Mas informacion sobre seguridad y pagos</a>',
        backdrop: "#bfbfbf5f",
        background: "#000000",
      });
      break;
    case "programar":
      let programadorComprasImp = "";
      const dt = DateTime.local();
      programadorComprasImp += `
      <label>
      <h5> ${dt}  </h5>
      <input type="date" id="fechaProgramacion" name="trip-start" min="2022-01-01" max="2025-12-31" required >
      <span class="validity"> </span>
      <button type="button" onclick="procesadorFechaProgram('procesar')">Enviar</button>
      <button type="button" onclick="procesadorFechaProgram('cancelar')"> Cancelar</button>
      </label>
      `;
      document.getElementById("programadorCompras").innerHTML = programadorComprasImp;
      break;
    case "reset":
      Swal.fire({
        title: "<h5 style=color:black >Seguro que quieres Reiniciar tu Carrito de compras ?</h5> ",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: "#92d1ff",
        denyButtonColor: "fffec5",
        confirmButtonText: "<i style=color:black > Borrar </i>",
        denyButtonText: "<i style=color:black > CANCELAR </i>",
        background: "url(../imagenes/madera.jpg)",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: " <p style=color:black> Carrito vacio </p>",
            icon: "success",
            showConfirmButton: false,
            timer: 500,
            background: "url(../imagenes/madera.jpg)",
          });
          if (regresoGcarrito) {
            carritoDeCompras = regresoGcarrito;
            carritoDeCompras.splice(carritoDeCompras);
            carritoGuardado = JSON.stringify(carritoDeCompras); //guarde elementos borrados del carrito el localstore
            localStorage.setItem("carritoGuardado", carritoGuardado);
            mostrarEnPagCarrito();
          }
        } else if (result.isDenied) {
          mostrarItemsEnCarrito();
        }
      });
      break;
  }
};
// procesamos la fecha en la que se programa la compra
const procesadorFechaProgram = (opcion) => {
  if (opcion === "procesar") {
    let valorProcesadroFechaProgram = document.getElementById("fechaProgramacion").value;
    valorProcesadroFechaProgram ? Swal.fire("informacion guardada correctamente puedes pasar a pagar tu pedido") : Swal.fire("aun no introduces la fecha paga tu pedido si no quieres programar");
    localStorage.setItem("valorProcesadroFechaProgram", valorProcesadroFechaProgram);
    document.getElementById("fechaProgramacion").value = " ";
    document.getElementById("programadorCompras").remove();
  } else if (opcion === "cancelar") {
    document.getElementById("programadorCompras").remove();
  }
};
//funcion que porcesa in para pago
function procesadorDePago() {
  let formularioParaPago = " ";
  let regresoProgramacionCompra = localStorage.getItem("valorProcesadroFechaProgram");
  formularioParaPago += `
  <form>
  <p> ${regresoProgramacionCompra ? "Tu compra estara lista para recoger el" + esp + regresoProgramacionCompra : " "}<p/>
   <p> ${regresoProgramacionCompra ? " " : "Tu compra estara lista para recoger en 25 min"}<p/>
   <p> Pedido a nombre de ${nombreIgresadoParaUsar}</p>
   <input id="entradaApellido" type="text" placeholder="apellido" required />
   <input id="entradaCorreo" type="email" placeholder="correo electronico" pattern=".+@hotmail.com" size="30" required />
   <button type="button" onclick="ticketCompra()">OK</button>
  </form>
  `;
  document.getElementById("formularioPago").innerHTML = formularioParaPago;
}
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// Funcion que me imprime la confirmacion de la compra
//
const ticketCompra = () => {
  let regresoProgramacionCompra = localStorage.getItem("valorProcesadroFechaProgram");
  let entradaApellido = document.getElementById("entradaApellido").value;
  let entradaCorreo = document.getElementById("entradaCorreo").value;
  if (entradaCorreo == "") {
    procesadorDePago();
  } else {
    document.getElementById("itemsEnElCarrito").remove();
    document.getElementById("acumuladorTotal").remove();
    localStorage.setItem("entradaApellido1", entradaApellido);
    localStorage.setItem("entradaCorreo1", entradaCorreo);

    let regEntradaApellido = localStorage.getItem("entradaApellido1");
    let regEntradaCorreo = localStorage.getItem("entradaCorreo1");
    let impTicketCompra = " ";
    impTicketCompra += `
  <div>
  <h3> Gracias por tu compra <br> Datos de Confirmacion </h3>
  <h4> Nombre: ${nombreIgresadoParaUsar + esp + regEntradaApellido} </h4>
  <h4> Correo Electronico:${regEntradaCorreo}</h4>
  <h4>Fecha en la que estara listo el pedido: ${regresoProgramacionCompra || "Tu compra estara lista para recoger en aprox.25min"} </h4>
  <h4> Presenta este codigo para recoger tu entrega: ${random(1000, 1500)} </h4>
  </div>
  `;
    document.getElementById("formularioPago").innerHTML = impTicketCompra;
  }
};
//
//llamamos un api para mostrar cotailes mediante la barra de letras de la pagina Bebidas
function buscarA(link) {
  fetch(link)
    .then((r) => r.json())
    .then((json) => {
      let arrayA = json.drinks;
      console.log(arrayA);
      let a = "";
      arrayA.forEach((drinks) => {
        a += `
      <div>
        <p><img src=" ${drinks.strDrinkThumb}"></p>
        <h1> ${drinks.strDrink}</h1>
        <ul>
        <li> <p> ${drinks.strMeasure1 + drinks.strIngredient1}</P></li>
        <li><p> ${drinks.strMeasure2 + drinks.strIngredient2 || ""}</P></li>
        <li> <p> ${drinks.strMeasure3 + drinks.strIngredient3 || ""}</P></li>
        <li><p> ${drinks.strMeasure4 + drinks.strIngredient4 || ""}</P></li>
        <li><p> ${drinks.strMeasure5 + drinks.strIngredient5 || " "}</P></li>
        <li> <p> ${drinks.strInstructionsES || " "}</p></li>
        </ul>
      </div>
      `;
      });
      document.getElementById("buscadorDeBebidas").innerHTML = a;
    })
    .catch((e) => {
      console.log(e);
    });
}
// funcion para mostrar ejemplos de pebidas
function llamarApi() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
    .then((res) => res.json())
    .then((json) => {
      let coctailAraray = json.drinks;
      coctailAraray = coctailAraray.slice(95, 105);
      console.log(coctailAraray);
      let bebidasApi = "";
      coctailAraray.forEach((drinks) => {
        bebidasApi += `
<div>
<p><img src=" ${drinks.strDrinkThumb}"></p>
<p> ${drinks.strDrink} </p>
</div>
`;
      });
      document.getElementById("usandoApi").innerHTML = bebidasApi;
    })
    .catch((e) => {
      console.log(e);
    });
}
let boxComents = [];
class comentariosPorIng {
  constructor(comentario) {
    this.comentario = comentario;
  }
}
let comentarioIngresado2 = new comentariosPorIng("'Mi compra llego en Buen estado Muchas Gracias'");
boxComents.push(comentarioIngresado2);
let regresoComents = localStorage.getItem("comentariosR");
regresoComents = JSON.parse(regresoComents);
console.log(regresoComents);
// funcion para mostrar comentarios en tienda
const mostrarComents = () => {
  if (regresoComents) {
    boxComents = regresoComents;
  }
  let cajaComents = " ";

  for (let i = 0; i < boxComents.length; i++) {
    cajaComents += `
  <div>
  <p>${boxComents[i].comentario}</p>
  </div>
  `;
    document.getElementById("comentariosHechos").innerHTML = cajaComents;
  }
  let guardadorDeComentarios = JSON.stringify(boxComents);
  localStorage.setItem("comentariosR", guardadorDeComentarios);
};
mostrarComents();
const IngresadorDeComentarios = () => {
  let comentarioIngresado1 = new comentariosPorIng(document.getElementById("comentarioIngresadoAlaCaja").value);
  document.getElementById("comentarioIngresadoAlaCaja").value = "";
  boxComents.push(comentarioIngresado1);
  mostrarComents();
};
//funcion para mostrar posibles resultados en busqueda e=tienda
const autocompletador = () => {
  fetch("../data.json")
    .then((res) => res.json())
    .then((json) => {
      inventarioVinateria = json.itemsDisponebles;
      let imprimirSugerencia = " ";
      document.getElementById("ingresoBuscadorItems").addEventListener("input", () => {
        entradaAbuscar = document.getElementById("ingresoBuscadorItems").value;
        if (entradaAbuscar == "") {
          imprimirSugerencia = "";
          document.getElementById("sugerencias").innerHTML = imprimirSugerencia;
        } else if (entradaAbuscar) {
          inventarioVinateriaR = inventarioVinateria.filter((el) => el.tipoDeLicor.includes(entradaAbuscar));
          let autocompletadorResultados = inventarioVinateriaR.map((el) => el.tipoDeLicor);
          imprimirSugerencia = `
        <div>
        <li> ${autocompletadorResultados[0] || ""} </li>
        </div>
        `;
          document.getElementById("sugerencias").innerHTML = imprimirSugerencia;
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
autocompletador();

mostrarItemsEnTienda();
