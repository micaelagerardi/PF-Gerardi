//Muestro los productos modificando el DOM

const contenedorProductos = document.getElementById("contenedorProductos");

// Llamo a json para mostrar los productos

fetch("./productos.json")
  .then((response) => response.json())
  .then((response) => {
    productos.forEach((producto) => {
      const divProducto = document.createElement("div");
      divProducto.classList.add("card", "col-xl-3", "col-md-6", "col-sm-12");
      divProducto.innerHTML = `
                          <div class= "card-img">
                              <img src= ${producto.src} class="card-img-top img-fluid py-3" height="80px">
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
  });

//Creo el carrito de compras y una función que busque el producto por id y lo agregue al carrito.

const carrito = [];

// Agrego al carrito:

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
              <div class="card-products">
                  <img src="${producto.src}" class="card-img-top img-fluid py-3" height="80px" >
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
