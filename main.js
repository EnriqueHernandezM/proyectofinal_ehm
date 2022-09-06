// variables con las que regreso los valores para guardar edad del index
let regreso = localStorage.getItem("inputValueEntradaEdad");
let regresoOn = parseInt(regreso);
//variables con las que regreso el carrito de compras
let regresoGcarrito = localStorage.getItem("carritoGuardado");
regresoGcarrito = JSON.parse(regresoGcarrito);
//array disponibles
let inventarioVinateria = [];
let carritoDeCompras = [];
let artPreparacionBebidas = [];
let ingredientes = [];
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
// objetos constructor de artPrepararBebidas
class BebidasApreparar {
  constructor(imagen, tituloArt, descripcion) {
    this.imagen = imagen;
    this.tituloArt = tituloArt;
    this.descripcion = descripcion;
  }
}
//constructor para ingredientes
class IngredientesParaBebidas {
  constructor(ingrediente1, ingrediente2, ingrediente3, ingrediente4, ingrediente5) {
    this.ingrediente1 = ingrediente1;
    this.ingrediente2 = ingrediente2;
    this.ingrediente3 = ingrediente3;
    this.ingrediente4 = ingrediente4;
    this.ingrediente5 = ingrediente5;
  }
}
// objetos a agregar a inventarioVinaterias
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
//USAMOS SPREAD AQUI sacamos copia
const inventarioVinateriaCopia = [...inventarioVinateria];
//objetos a integrar en artPreparacionBebidas
const art1 = new BebidasApreparar("../imagenes/miamiVice.jpg", "miami Vice", "combinacion entre pinia colada y fresa");
const art2 = new BebidasApreparar("../imagenes/piniaColada.jpg", "miami Vice", "combinacion entre pinia colada y fresa");
const art3 = new BebidasApreparar("../imagenes/bebMargarita.jpg", "miami Vice", "combinacion entre pinia colada y fresa");

artPreparacionBebidas.push(art1, art2, art3);
//objetos a integrar en ingredientes
const ingMiami = new IngredientesParaBebidas("60 mL ron blanco", "1 taza rodajas de fresas picadas", "30 mL zumo de limón", "30 mL zumo de limón", "60 mL jugo de piña");
const ingMargarita = new IngredientesParaBebidas("60 mL ron blanco", "1 taza rodajas de fresas picadas", "30 mL zumo de limón", "30 mL zumo de limón", "60 mL jugo de piña");
ingredientes.push(ingMiami, ingMargarita);
// var espacio
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
        <p>${inventarioVinateria[i].tipoDeLicor}</p>
        <p>
        <span onclick=addToCart(${inventarioVinateria[i].id});>🛒</span>
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
};
//funcion 3 para quitar items en carrito
const quitarDelCarrito = (id) => {
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
const mostrarRegreso = () => {
  regreso >= 18 ? document.getElementById("acceso").remove() : document.getElementById("acceso");
};
mostrarRegreso();
//funcion 6 que permite acc a index poremos usar un a lib aqui
const respuesta = () => {
  let inputValue = document.getElementById("entradaEdad").value;
  let inputValueNombre = document.getElementById("entradaNombre").value;
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
  } else {
    inputValue = 0;
    alert("no llenaste los campos requeridos");
  }
};
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
function respuestaArtBebidas(ingredientesB) {
  let ing = " ";
  ing += `
  <div>
    <ul>
    <li>${ingredientes[1].ingrediente1}</li>
    <li>${ingredientes[1].ingrediente2}</li>
    <li>${ingredientes[1].ingrediente3}</li>
    <li> ${ingredientes[1].ingrediente4}</li>
    <li> ${ingredientes[1].ingrediente5}</li>
    </ul>
  </div>
  `;
  let prep = "";
  prep += `
  <div>
  <p>Agregue las fresas, la mitad del ron, el jugo de lima y 1 taza de hielo picado a la licuadora y mezcle hasta que quede suave. Vierte la bebida en la copa Huracán y coloca el vaso en el congelador.
  Agregue el resto del ron, la crema de coco y el jugo de piña a la licuadora. Agregue 1 taza de hielo picado y mezcle hasta que quede suave. Con cuidado vierta encima de la bebida que colocó en el congelador. Decorar con una rodaja de piña</p>
  </div>
  `; //Usamos OPERADOR TERNARIO!!!1
  ingredientesB == "ingredientes" ? (document.getElementById("prueba").innerHTML = ing) : (document.getElementById("prueba").innerHTML = prep);
}
//Terminan Funciones.
const anunciarTequilasEnIndex = () => {
  //FuncionCREADA PARA DESTRUCTURIZACION DE ARRAY!!!!!
  const [, , , p1, p2, p3] = inventarioVinateria;
  tequ = "";
  tequ += `
  <div>
  <h2> Tenemos de los mejores Tequilas!!! ${p1.nombreProducto}, ${p2.nombreProducto}, ${p3.nombreProducto}</h2>
  </div>
  `;
  document.getElementById("anuncioDestructuracion").innerHTML = tequ;
};
mostrarItemsEnTienda();
