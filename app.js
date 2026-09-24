const productos = [
  {
    id: 1,
    nombre: "Canción Animal",
    artista: "Soda Stereo",
    precio: 21000,
    imagen: "imagenes/cancion-animal.jpg"
  },
  {
    id: 2,
    nombre: "Plastic Hearts",
    artista: "Miley Cyrus",
    precio: 19900,
    imagen: "imagenes/plastic-hearts.jpg"
  },
  {
    id: 3,
    nombre: "Oktubre",
    artista: "Patricio Rey y sus Redonditos de Ricota",
    precio: 24500,
    imagen: "imagenes/oktubre.jpg"
  },
  {
    id: 4,
    nombre: "AM",
    artista: "Arctic Monkeys",
    precio: 18500,
    imagen: "imagenes/am.jpg"
  },
  {
    id: 5,
    nombre: "Discovery",
    artista: "Daft Punk",
    precio: 22500,
    imagen: "imagenes/discovery.jpg"
  },
  {
    id: 6,
    nombre: "Future Nostalgia",
    artista: "Dua Lipa",
    precio: 21000,
    imagen: "imagenes/future-nostalgia.jpg"
  },
  {
    id: 7,
    nombre: "Bocanada",
    artista: "Gustavo Cerati",
    precio: 18500,
    imagen: "imagenes/bocanada.jpg"
  },
  {
    id: 8,
    nombre: "Artaud",
    artista: "Pescado Rabioso",
    precio: 24500,
    imagen: "imagenes/artaud.jpg"
  }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const botonesAgregar = document.querySelectorAll(".agregar");

botonesAgregar.forEach(boton => {

  boton.addEventListener("click", () => {

    const id = Number(boton.dataset.id);

    const producto = productos.find(producto => producto.id === id);

    if (!producto) {
      return;
    }


    const productoCarrito = carrito.find(item => item.id === id);

    if (productoCarrito) {

      productoCarrito.cantidad++;

    } else {

      carrito.push({
        ...producto,
        cantidad: 1
      });

    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");

  });

});

const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");

if (listaCarrito) {

  mostrarCarrito();

}


function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;

        listaCarrito.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>$${p.precio.toLocaleString("es-AR")}</td>
                <td>${p.cantidad}</td>
                <td>$${subtotal.toLocaleString("es-AR")}</td>
                <td><button onclick="eliminarProducto(${p.id})">Eliminar</button></td>
            </tr>
        `;
    });

    totalCarrito.textContent = "$" + total.toLocaleString("es-AR");
}



function cambiarCantidad(id, cambio) {

  const producto = carrito.find(item => item.id === id);

  if (!producto) {
    return;
  }

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {

    carrito = carrito.filter(item => item.id !== id);

  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}



function eliminarProducto(id) {

  carrito = carrito.filter(item => item.id !== id);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();

}
const btnComprar = document.getElementById("btn-comprar");

if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        window.location.href = "comprar.html";
    });
}