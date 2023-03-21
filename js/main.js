//Creo la clase Producto, con las propiedades id, nombre, precio y cantidad:

class Producto {
  constructor(id, nombre, precio, cantidad, src) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.src = src;
  }
}

//Creo productos y los almaceno en un array:

const producto1 = new Producto(1, "Chipa", 300, 1, "../images/chipa.jpg");
const producto2 = new Producto(
  2,
  "Sandwich de Miga",
  250,
  1,
  "../images/sandwich.jpg"
);
const producto3 = new Producto(
  3,
  "Medialunas de Manteca",
  150,
  1,
  "../images/medialunas.jpg"
);
const producto4 = new Producto(
  4,
  "Cookies con Chips",
  350,
  1,
  "../images/cookies.jpg"
);
const producto5 = new Producto(
  5,
  "Alfajor de Maicena",
  200,
  1,
  "../images/alfajormaicena.jpg"
);
const producto6 = new Producto(
  6,
  "Pastafrola de Batata",
  1200,
  1,
  "../images/batata.jpg"
);
const producto7 = new Producto(
  7,
  "Pastafrola de Membrillo",
  1200,
  1,
  "../images/membrillo.jpg"
);
const producto8 = new Producto(
  8,
  "Berlines Rellenos de Dulce de Leche",
  300,
  1,
  "../images/berlinesddl.jpg"
);
const producto9 = new Producto(
  9,
  "Berlines Rellenos de Pastelera",
  300,
  1,
  "../images/berlinespastelera.jpg"
);
const producto10 = new Producto(
  10,
  "Budin de Banana",
  900,
  1,
  "../images/budinbanana.jpg"
);
const producto11 = new Producto(
  11,
  "Budin de Limon",
  900,
  1,
  "../images/budinlimon.jpg"
);
const producto12 = new Producto(
  12,
  "Budin de Naranja",
  900,
  1,
  "../images/budinnaranja.jpg"
);
const producto13 = new Producto(13, "Churros", 150, 1, "../images/churros.jpg");
const producto14 = new Producto(
  14,
  "Churros Rellenos de Dulce de Leche",
  180,
  1,
  "../images/churrosrelleno.jpg"
);
const producto15 = new Producto(
  15,
  "Conito de Dulce de Leche",
  250,
  1,
  "../images/conitosddl.jpg"
);
const producto16 = new Producto(
  16,
  "Cookie de Chocolate",
  350,
  1,
  "../images/galletaschocolate.jpg"
);
const producto17 = new Producto(17, "Pepas", 350, 1, "./images/pepas.jpg");
const producto18 = new Producto(18, "Trufas", 350, 1, "./images/trufas.jpg");
const producto19 = new Producto(
  19,
  "Pastelitos Rellenos de Dulce de Leche",
  300,
  1,
  "../images/pastelitosddl.jpg"
);
const producto20 = new Producto(
  20,
  "Torta Fritas",
  150,
  1,
  "../images/tortasfritas.jpg"
);

const productos = [
  producto1,
  producto2,
  producto3,
  producto4,
  producto5,
  producto6,
  producto7,
  producto8,
  producto9,
  producto10,
  producto11,
  producto12,
  producto13,
  producto14,
  producto15,
  producto16,
  producto17,
  producto18,
  producto19,
  producto20,
];

//Muestro los productos modificando el DOM.

const contenedorProductos = document.getElementById("contenedorProductos");

productos.forEach((producto) => {
  const divProducto = document.createElement("div");
  divProducto.classList.add("card", "col-xl-3", "col-md-6", "col-sm-12");
  divProducto.innerHTML = `
                          <div>
                              <img src= ${producto.src} class="card-img-top img-fluid py-3">
                              <div class="card-body">
                                  <h3 class="card-title"> ${producto.nombre} </h3>
                                  <p class="card-text"> ${producto.precio} </p>
                                  <button id="boton${producto.id}" class="btn btn-primary"> Comprar </button>
                              </div>
                          </div>`;

  contenedorProductos.appendChild(divProducto);

  //Agregar un evento al boton Comprar:

  const boton = document.getElementById(`boton${producto.id}`);
  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
});

//Creo el carrito de compras y una función que busque el producto por id y lo agregue al carrito.

const carrito = [];

//Versión Simple:

/*
const agregarAlCarrito = (id) => {
  const producto = productos.find(producto => producto.id === id);
  carrito.push(producto);
}
*/

//Versión que chequea las cantidades:

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
  }
  actualizarCarrito();
};

//Muestro el carrito de compras modificando el DOM.

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", actualizarCarrito);

function actualizarCarrito() {
  let aux = "";
  carrito.forEach((producto) => {
    aux += `
              <div class="card col-xl-3 col-md-6 col-sm-12">
                  <img src="${producto.src}" class="card-img-top img-fluid py-3">
                  <div class="card-body">
                      <h3 class="card-title"> ${producto.nombre} </h3>
                      <p class="card-text"> ${producto.precio} </p>
                      <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                  </div>
              </div>
              `;
  });

  contenedorCarrito.innerHTML = aux;
  calcularTotalCompra();
}

//Agrego una función que elimine el producto del carrito:

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  carrito.splice(carrito.indexOf(producto), 1);
  actualizarCarrito();
};

///Función para vaciar todo el carrito por completo:

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  carrito.splice(0, carrito.length);
  actualizarCarrito();
});

//Creo una función que me calcule el total del carrito:

const totalCompra = document.getElementById("totalCompra");

const calcularTotalCompra = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  totalCompra.innerHTML = total;
};
