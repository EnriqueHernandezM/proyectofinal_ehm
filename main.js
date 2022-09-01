// variables con las que regreso los valores para guardar edad del index
let regreso = localStorage.getItem("inputValueEntradaEdad");
let regresoOn = parseInt(regreso);
//variables con las que regreso el carrito de compras
let regresoGcarrito = localStorage.getItem("carritoGuardado");
regresoGcarrito = JSON.parse(regresoGcarrito);
//array disponibles
let inventarioVinateria = [];
let carritoDeCompras = [];
//array de objetos constructror array itrms disp
class ItemsDisponibles {
  constructor(imagen, id, nombreProducto, tipoDeLicor, precio) {
    this.imagen = imagen;
    this.id = id;
    this.nombreProducto = nombreProducto;
    this.tipoDeLicor = tipoDeLicor;
    this.precio = precio;
  }
}

const item1 = new ItemsDisponibles("../imagenes/i111jack.jpg", 111, "Jack Daniels", "whiskey", 400);
const item2 = new ItemsDisponibles("../imagenes/i444redL.jpg", 444, "Red Label", "whiskey", 370);
const item3 = new ItemsDisponibles("../imagenes/i131wiliam.jpg", 131, "Wiliam Lawson", "whiskey", 350);
const item4 = new ItemsDisponibles("../imagenes/i112DonJ.jpg", 112, "Don julio", "tequila", 300);
const item5 = new ItemsDisponibles("../imagenes/i107jose.jpg", 107, "Jose Cuervo", "tequila", 250);
const item6 = new ItemsDisponibles("../imagenes/i124jimador.jpg", 124, "Jimador", "tequila", 200);
const item7 = new ItemsDisponibles("../imagenes/i180capitan.jpg", 180, "Capitan Morgan", "ron", 240);
const item8 = new ItemsDisponibles("../imagenes/i100Bac.jpeg", 100, "Bacardi", "ron", 260);
const item9 = new ItemsDisponibles("../imagenes/i166kraken.jpg", 166, "Kraken", "ron", 340);
const item10 = new ItemsDisponibles("../imagenes/i125black.jpg", 125, "Red Label Black", "whiskey", 600);
const item11 = new ItemsDisponibles("../imagenes/213absolut.jfif", 213, "Absolut Vodka", "vodka", 400);
const item12 = new ItemsDisponibles("../imagenes/222smirnof.jpg", 222, "Smirnof", "vodka", 300);

inventarioVinateria.push(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12);
const inventarioVinateriaCopia = [...inventarioVinateria];
// var espacio
let esp = " ";
//funcion 1 para mostrar items disponibles en pantalla
function mostrarItemsEnTienda() {
  let html = "";
  for (let i = 0; i < inventarioVinateria.length; i++) {
    html =
      html +
      `
      <div  >
        <p><img src="${inventarioVinateria[i].imagen}"/> </p>
        <p> "${inventarioVinateria[i].nombreProducto}" </p>
        <p> $${inventarioVinateria[i].precio}</p>
        <p>${inventarioVinateria[i].tipoDeLicor}</p>
        <p>
        <span onclick=addToCart(${inventarioVinateria[i].id});>🛒</span>
        </p>
      </div>
      `;
  }
  document.getElementById("itemsAmostrar").innerHTML = html;
}
//funcion 2 para aniadir productos al carrito
function addToCart(id) {
  const productoIntroduzido = inventarioVinateria.find((item) => item.id == id);
  if (regresoGcarrito) {
    carritoDeCompras = regresoGcarrito;
  }
  carritoDeCompras.push(productoIntroduzido);
  let carritoGuardado = JSON.stringify(carritoDeCompras); //guarde elementos push el localstore
  localStorage.setItem("carritoGuardado", carritoGuardado);
}
//funcion 3 para quitar items en carrito
function quitarDelCarrito(id) {
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
}
// funcion 4 para mostrar mi carrito en otra pagina cuando la pag carge
function mostrarEnPagCarrito() {
  if (regresoGcarrito) {
    carritoDeCompras = regresoGcarrito;
    mostrarItemsEnCarrito();
  }
}
// funcion 5 mostrar items agregados en carrito y mi acumulador esta aqui adentro
function mostrarItemsEnCarrito() {
  const prueba = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
  if (carritoDeCompras.length == 0) {
    document.getElementById("itemsEnElCarrito").innerHTML = "<h3>INGRESA PRODUCTOS A TU CARRITO</h3>";
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
          <button> pagar</button>
        </div>
      `;
    document.getElementById("acumuladorTotal").innerHTML = acumulador;
  }
}
//funcion buscador por tipos de licor funciona con minusculas!!!
function buscadorItems(entradaAbuscar) {
  inventarioVinateria = [...inventarioVinateriaCopia];
  entradaAbuscar = document.getElementById("ingresoBuscadorItems").value;
  document.getElementById("ingresoBuscadorItems").value = "";
  if (entradaAbuscar == "") {
    mostrarItemsEnTienda();
  }
  inventarioVinateria = inventarioVinateria.filter((el) => el.tipoDeLicor.includes(entradaAbuscar));
  mostrarItemsEnTienda();
}
//funcion 5 acceso pagina para el index
const mostrarRegreso = () => {
  if (regresoOn >= 18) {
    document.getElementById("acceso").remove();
  }
};
mostrarRegreso();
//funcion que permite acc a index poremos usar un a lib aqui
function respuesta() {
  let inputValue = document.getElementById("entradaEdad").value;
  localStorage.setItem("inputValueEntradaEdad", inputValue);

  while (inputValue <= 17) {
    let resp = "No tienes la edad suficiente para entrar en este sitio";
    alert(resp);
  }
  if (inputValue >= 18) {
    let inset = "";
    inset =
      inset +
      `
    <div id="anuncioEntrada">
    </div>
    `;
    document.getElementById("respAnuncio").innerHTML = inset;
    let mostrando = "";
    let resulta = " Hola tienes" + esp + inputValue + esp + "años" + esp + "bienvenido" + esp + "no olvides visitar nuestra Tienda";
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
  } else {
    inputValue = 0;
    alert("no llenaste los campos requeridos");
  }
}
//Terminan Funciones.
mostrarItemsEnTienda();
