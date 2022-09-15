// variables con las que regreso los valores para guardar edad del index
let regreso = localStorage.getItem("inputValueEntradaEdad");
let regresoOn = parseInt(regreso);
//variables con las que regreso el carrito de compras
let regresoGcarrito = localStorage.getItem("carritoGuardado");
regresoGcarrito = JSON.parse(regresoGcarrito);
//
//
//1er fetch
fetch("../data.json")
  .then((res) => res.json())
  .then((json) => {
    let nuevoarray = json;
    console.log(nuevoarray);
    let arrayArticulosEnJson = JSON.stringify(nuevoarray); //guarde elementos push el localstore
    localStorage.setItem("arrayArticulosEnJson", arrayArticulosEnJson);
  })
  .catch((e) => {
    console.log(e + "error");
  });

let traerarrayArticulosEnJson = localStorage.getItem("arrayArticulosEnJson");
traerarrayArticulosEnJson = JSON.parse(traerarrayArticulosEnJson);
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
//array disponibles
let inventarioVinateria = traerarrayArticulosEnJson;
let carritoDeCompras = [];
let artPreparacionBebidas = [];
let ingredientes = [];
//USAMOS SPREAD AQUI sacamos copia
const inventarioVinateriaCopia = [...inventarioVinateria];
let esp = " ";
//funcion 1 para mostrar items disponibles en pantalla
const mostrarItemsEnTienda = () => {
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
};
//funcion 2 para aniadir productos al carrito
const addToCart = (id) => {
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
// funcion 4 para mostrar mi carrito en otra pagina cuando la pag carge
const mostrarEnPagCarrito = () => {
  if (regresoGcarrito) {
    carritoDeCompras = regresoGcarrito;
    mostrarItemsEnCarrito();
  }
};

// funcion 5 mostrar items agregados en carrito y mi acumulador esta aqui adentro
const mostrarItemsEnCarrito = () => {
  const prueba = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
  if (carritoDeCompras.length == 0) {
    document.getElementById("itemsEnElCarrito").innerHTML = "<h3 class = 'animate__animated animate__flash' >INGRESA PRODUCTOS A TU CARRITO</h3>";
    document.getElementById("acumuladorTotal").innerHTML = esp;
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
          <button onclick="pasarApagar()"> pagar </button>
        </div >
      `;
    document.getElementById("acumuladorTotal").innerHTML = acumulador;
  }
};
//funcion buscador por tipos de licor funciona con minusculas!!!
const buscadorItems = (entradaAbuscar) => {
  inventarioVinateria = [...inventarioVinateriaCopia];
  entradaAbuscar = document.getElementById("ingresoBuscadorItems").value;
  document.getElementById("ingresoBuscadorItems").value = "";
  if (entradaAbuscar == "") {
    mostrarItemsEnTienda();
  }
  inventarioVinateria = inventarioVinateria.filter((el) => el.tipoDeLicor.includes(entradaAbuscar));
  mostrarItemsEnTienda();
};
//funcion 5 acceso pagina para el index Usamos OPERADOR TERNARIO!!!1
function respuesta() {
  let esp = " ";
  let inputValue = document.getElementById("entradaEdad").value;
  let inputValueNombre = document.getElementById("entradaNombre").value;
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
}
// duncion para bloquear acceso con un swal fire
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
//funcion 7 que mostrara arrticulos bebidas en pagina bebidas
function mostrarEnBebidas() {
  let artB = " ";
  for (let i = 0; i < artPreparacionBebidas.length; i++) {
    artB += `
    <div >
      <p><img src="${artPreparacionBebidas[i].imagen}" ></p>
      <p> ${artPreparacionBebidas[i].tituloArt}</p>
      <p> ${artPreparacionBebidas[i].descripcion} </p>
      <span onclick=respuestaArtBebidas("ingredientes");>ingredientes</span>
      <span onclick=respuestaArtBebidas();>preparacion</span>
    </div>
    `;
  }
  document.getElementById("aquiVanArtBebidas").innerHTML = artB;
}
function pasarApagar() {
  Swal.fire({
    title: "<strong style=color:white> Pagar carrito </strong>",
    html: "<p style=color:white>has concluido tu compra? Ve a metodo de pago</p>, " + "<p>💳</p> ",
    showCloseButton: false,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<a style=color:black class="fa fa-thumbs-up href="//sweetalert2.github.io">VAMOS</a> ',
    confirmButtonAriaLabel: "Thumbs up, great!",
    confirmButtonColor: "#92d1ff",
    cancelButtonText: '<i style=color:black class="fa fa-thumbs-down" > SEGUIR COMPRANDO</i>',
    cancelButtonAriaLabel: "Thumbs down",
    cancelButtonColor: "#fffec5",
    footer: '<a style=color:white href="">Mas informacion sobre seguridad y pagos</a>',
    backdrop: "#bfbfbf5f",
    background: "#000000",
  });
}
//
//
//Aqui 2do fetch
//
//
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
mostrarItemsEnTienda();
