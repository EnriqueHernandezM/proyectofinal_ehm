//primer funcion
function datosDeIngreso(nombre, edad, apellido) {
  let esp = " ";
  nombre = prompt("Esta es una pagina solo para mayores de edad INGRESA tus datos para continuar Nombre ");
  apellido = prompt("igresa tu  apellido");
  edad = parseInt(prompt("ingresa tu edad"));
  while (edad <= 17) {
    alert("no tienes la edad suficiente para navegar en este sitio");
  }
  if (edad >= 18) {
    let resulta = "Hola" + esp + nombre + esp + apellido + esp + "tienes" + esp + edad + esp + "años" + esp + "bienvenido";
    alert(resulta);
  } else {
    edad = 0;
    while (edad == 0) {
      alert("no llenaste los campos requeridos");
    }
  }
}
//segundaFuncion
function calculadoraDePrecios(calcular, precio1, precio2) {
  calcular = prompt("deseas calcular algunos productos con el descuento aplicado si / no");
  while (calcular != "no") {
    precio1 = parseInt(prompt("ingresa el precio del primer articulo"));
    precio2 = parseInt(prompt("ingresa el precio de tu segundo articulo (ingresa 0 si unicamente es 1 producto)"));
    if (preguntaInicial == "lunes") {
      let caculoDeDescuento = (precio1 + precio2) * 0.15;
      resultadoConDescuento = precio1 + precio2 - caculoDeDescuento;
      alert(resultadoConDescuento);
      calcular = prompt("deseas calcular otros producto con el descuento aplicado si / no");
    } else if (preguntaInicial == "martes") {
      let caculoDeDescuento = (precio1 + precio2) * 0.1;
      resultadoConDescuento = precio1 + precio2 - caculoDeDescuento;
      alert(resultadoConDescuento);
      calcular = prompt("deseas calcular otros producto con el descuento aplicado si / no");
    } else if (preguntaInicial == "viernes") {
      let caculoDeDescuento = (precio1 + precio2) * 0.1;
      resultadoConDescuento = precio1 + precio2 - caculoDeDescuento;
      alert(resultadoConDescuento);
      calcular = prompt("deseas calcular otros producto con el descuento aplicado si / no");
    } else {
      alert("no itrodujiste ningun dato introduze no para salir");
    }
  }
}
//Terminan Funciones
datosDeIngreso();
//array de ojetos
const inventarioVinateria = [
  { id: 111, nombreProducto: "Jack Daniels", tipoDeLicor: "whiskey", precio: 400 },
  { id: 141, nombreProducto: "Red Label", tipoDeLicor: "whiskey", precio: 370 },
  { id: 131, nombreProducto: "wiliam Lawson", tipoDeLicor: "whiskey", precio: 350 },
  { id: 111, nombreProducto: "Don Julio", tipoDeLicor: "tequila", precio: 300 },
  { id: 107, nombreProducto: "Jose Cuervo", tipoDeLicor: "tequila", precio: 250 },
  { id: 124, nombreProducto: "Jimador", tipoDeLicor: "tequila", precio: 200 },
  { id: 180, nombreProducto: "Capitan Morgan", tipoDeLicor: "ron", precio: 240 },
  { id: 100, nombreProducto: "Bacardi", tipoDeLicor: "ron", precio: 260 },
  { id: 166, nombreProducto: "Kraken", tipoDeLicor: "ron", precio: 340 },
  { id: 125, nombreProducto: "Red Label Black", tipoDeLicor: "whiskey", precio: 600 },
];
console.log(inventarioVinateria);

let preguntaEntrarAbuscador = prompt("deseas buscar alguno de nuestros productos? \n 1)Buscar Por Tipo de licor \n 2)Buscar por nombre de licor");
switch (preguntaEntrarAbuscador) {
  case "1":
    // buscador por tipo de licor
    const buscadorPorTipos = prompt("ingresa el tipo de licor que buscas");
    const VamosAfiltrarTipos = inventarioVinateria.filter((producto) => producto.tipoDeLicor == buscadorPorTipos);
    console.log(VamosAfiltrarTipos);
    if (VamosAfiltrarTipos.length == []) {
      alert("No encontramos resultados para tu busqueda");
    } else {
      const filtradoTipo = VamosAfiltrarTipos.map((el) => el.nombreProducto + "precio: " + el.precio);

      alert("Estos son los productos que encontramos" + "\n" + filtradoTipo.join("\n"));
    }
    break;
  case "2":
    //buscador pro nombre de licor
    const buscadorPorNombre = prompt("ingresa el nombre del licor que buscas");
    const vamosAfiltrarNombres = inventarioVinateria.filter((nomb) => nomb.nombreProducto.includes(buscadorPorNombre));
    console.log(vamosAfiltrarNombres);
    if (vamosAfiltrarNombres.length == []) {
      alert("No encontramos resultados para tu busqueda");
    } else {
      const filtradoNombre = vamosAfiltrarNombres.map((art) => art.nombreProducto + "precio: " + art.precio);
      alert("Estos son los productos que encontramos" + "\n" + filtradoNombre.join("\n"));
    }
    break;
  default:
    break;
}
let preguntaInicial = prompt("Queres conocer promociones ingresa el dia en que quieres consultarlas o introduze 'no' para continuar");
if (preguntaInicial == "lunes") {
  alert("Los lunes tenemos 15% de descuento en vinos, tequila y agua mineral");
  calculadoraDePrecios();
} else if (preguntaInicial == "martes") {
  alert("Los martes tenemos 10% de descuento en whiskey y MSI en tdc");
  calculadoraDePrecios();
} else if (preguntaInicial == "viernes") {
  alert("Los viernes tenemos toda la tienda con 10% de descuento");
  calculadoraDePrecios();
} else if (preguntaInicial == "miercoles" || preguntaInicial == "jueves" || preguntaInicial == "sabado" || preguntaInicial == "domingo") {
  alert("UPS por el momento no tenemos promociones para este dia");
}
