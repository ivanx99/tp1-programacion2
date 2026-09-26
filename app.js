
console.log("Aplicación inicializada");

document.addEventListener('DOMContentLoaded', () => {
    const btnHambuerguesa = document.querySelector ('.btn-hamburguesa');
    const menuLista = document.getElementById('menu-lista');
    if (btnHambuerguesa && menuLista) {
        btnHambuerguesa.addEventListener('click', () => {
            menuLista.classList.toggle('mostrar');
        });
    }
});

const productos = [
  {
    id: 1,
    nombre: "Canción Animal",
    artista: "Soda Stereo",
    precio: 21000,
    imagen: "imagenes/cancion-animal.jpg",
    stock: true
  },
  {
    id: 2,
    nombre: "Plastic Hearts",
    artista: "Miley Cyrus",
    precio: 19900,
    imagen: "imagenes/plastic-hearts.jpg",
    stock: true
  },
  {
    id: 3,
    nombre: "Oktubre",
    artista: "Patricio Rey y sus Redonditos de Ricota",
    precio: 24500,
    imagen: "imagenes/oktubre.jpg",
    stock: true
  },
  {
    id: 4,
    nombre: "AM",
    artista: "Arctic Monkeys",
    precio: 18500,
    imagen: "imagenes/am.jpg",
    stock: true
  },
  {
    id: 5,
    nombre: "Discovery",
    artista: "Daft Punk",
    precio: 22500,
    imagen: "imagenes/discovery.jpg",
    stock: true
  },
  {
    id: 6,
    nombre: "Future Nostalgia",
    artista: "Dua Lipa",
    precio: 21000,
    imagen: "imagenes/future-nostalgia.jpg",
    stock: true
  },
  {
    id: 7,
    nombre: "Bocanada",
    artista: "Gustavo Cerati",
    precio: 18500,
    imagen: "imagenes/bocanada.jpg",
    stock: false
  },
  {
    id: 8,
    nombre: "Artaud",
    artista: "Pescado Rabioso",
    precio: 24500,
    imagen: "imagenes/artaud.jpg",
    stock: true
  }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const contadores = document.querySelectorAll("#cart-count, #contador-carrito");
  const cantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);

  contadores.forEach(contador => {
    contador.textContent = `(${cantidad})`;
  });
}

document.querySelectorAll(".agregar").forEach(boton => {
  boton.addEventListener("click", () => {
    const id = Number(boton.dataset.id);
    const producto = productos.find(producto => producto.id === id);

    if (!producto) return;

    if (!producto.stock) {
      alert("Este producto no tiene stock disponible.");
      return;
    }

    const existente = carrito.find(producto => producto.id === id);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        ...producto,
        cantidad: 1
      });
    }

    guardarCarrito();
    actualizarContador();
    alert("Producto agregado al carrito.");
  });
});

const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");

function mostrarCarrito() {
  if (!listaCarrito) return;

  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <tr>
        <td colspan="5">El carrito está vacío.</td>
      </tr>
    `;

    if (totalCarrito) totalCarrito.textContent = "$0";
    actualizarContador();
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    listaCarrito.innerHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString("es-AR")}</td>
        <td>
          <button class="btn-cantidad" data-id="${producto.id}" data-cambio="-1">−</button>
          ${producto.cantidad}
          <button class="btn-cantidad" data-id="${producto.id}" data-cambio="1">+</button>
        </td>
        <td>$${subtotal.toLocaleString("es-AR")}</td>
        <td>
          <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
        </td>
      </tr>
    `;
  });

  totalCarrito.textContent = "$" + total.toLocaleString("es-AR");
  actualizarContador();
}

function cambiarCantidad(id, cambio) {
  const producto = carrito.find(producto => producto.id === id);

  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(producto => producto.id !== id);
  }

  guardarCarrito();
  mostrarCarrito();
}

function eliminarProducto(id) {
  const producto = carrito.find(producto => producto.id === id);

  if (!producto) return;

  const confirmar = confirm(
    `¿Está seguro de eliminar "${producto.nombre}" del carrito?`
  );

  if (!confirmar) return;

  carrito = carrito.filter(producto => producto.id !== id);
  guardarCarrito();
  mostrarCarrito();
}


if (listaCarrito) {
  mostrarCarrito();

  listaCarrito.addEventListener("click", event => {
    if (event.target.classList.contains("btn-cantidad")) {
      cambiarCantidad(
        Number(event.target.dataset.id),
        Number(event.target.dataset.cambio)
      );
    }

    if (event.target.classList.contains("btn-eliminar")) {
      eliminarProducto(Number(event.target.dataset.id));
    }
  });
}

const botonComprar = document.getElementById("btn-comprar");

if (botonComprar && listaCarrito) {
  botonComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    window.location.href = "comprar.html";
  });
}

const formulario = document.getElementById("formulario-compra");

if (formulario) {
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const envio = document.getElementById("metodo-envio");
  const fecha = document.getElementById("fecha-entrega");
  const terminos = document.getElementById("terminos");

  function error(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
  }

  function limpiarError(id) {
    document.getElementById(id).textContent = "";
  }

  function validarNombre() {
    if (nombre.value.trim().length < 3) {
      error("error-nombre", "Ingrese un nombre válido.");
      return false;
    }

    limpiarError("error-nombre");
    return true;
  }

  function validarEmail() {
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    if (!valido) {
      error("error-email", "Ingrese un correo electrónico válido.");
      return false;
    }

    limpiarError("error-email");
    return true;
  }

function validarTelefono() {
  const telefonoLimpio = telefono.value.trim();

  const valido = /^[0-9]{8,15}$/.test(
    telefonoLimpio.replace(/[\s-]/g, "")
  );

  if (!valido) {
    error("error-telefono", "Ingrese un teléfono válido.");
    return false;
  }

  limpiarError("error-telefono");
  return true;
}


  function validarEnvio() {
    if (!envio.value) {
      error("error-envio", "Seleccione una forma de envío.");
      return false;
    }

    limpiarError("error-envio");
    return true;
  }

  function validarFecha() {
    if (!fecha.value) {
      error("error-fecha", "Seleccione una fecha.");
      return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const minimo = new Date(hoy);
    minimo.setDate(hoy.getDate() + 2);

    const maximo = new Date(hoy);
    maximo.setDate(hoy.getDate() + 10);

    const seleccionada = new Date(fecha.value + "T00:00:00");

    if (seleccionada < minimo || seleccionada > maximo) {
      error("error-fecha", "La fecha debe ser entre 2 y 10 días desde hoy.");
      return false;
    }

    limpiarError("error-fecha");
    return true;
  }

  function validarPago() {
    const pago = document.querySelector('input[name="medioPago"]:checked');

    if (!pago) {
      error("error-pago", "Seleccione un medio de pago.");
      return false;
    }

    limpiarError("error-pago");
    return true;
  }

  function validarTerminos() {
    if (!terminos.checked) {
      error("error-terminos", "Debe aceptar los términos y condiciones.");
      return false;
    }

    limpiarError("error-terminos");
    return true;
  }

  nombre.addEventListener("input", validarNombre);
  email.addEventListener("input", validarEmail);
  telefono.addEventListener("input", validarTelefono);
  envio.addEventListener("change", validarEnvio);
  fecha.addEventListener("change", validarFecha);
  terminos.addEventListener("change", validarTerminos);

  document.querySelectorAll('input[name="medioPago"]').forEach(radio => {
    radio.addEventListener("change", validarPago);
  });

  formulario.addEventListener("submit", event => {
    event.preventDefault();

    const valido =
      validarNombre() &&
      validarEmail() &&
      validarTelefono() &&
      validarEnvio() &&
      validarFecha() &&
      validarPago() &&
      validarTerminos();

    if (!valido) {
      alert("Por favor, corrija los errores del formulario.");
      return;
    }

    if (carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    const pago = document.querySelector('input[name="medioPago"]:checked');

    const intereses = Array.from(
      document.querySelectorAll('input[name="intereses"]:checked')
    ).map(checkbox => checkbox.value);

    const total = carrito.reduce(
      (suma, producto) => suma + producto.precio * producto.cantidad,
      0
    );

    const pedido = {
      id: Date.now(),
      fechaCompra: new Date().toLocaleDateString("es-AR"),
      comprador: {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        telefono: telefono.value.trim()
      },
      envio: {
        metodo: envio.value,
        fechaEntrega: fecha.value
      },
      medioPago: pago.value,
      intereses,
      productos: [...carrito],
      total
    };

    const historial =
      JSON.parse(localStorage.getItem("historialCompras")) || [];

    historial.push(pedido);

    localStorage.setItem(
      "historialCompras",
      JSON.stringify(historial)
    );

    carrito = [];
    guardarCarrito();
    actualizarContador();

    alert("Compra realizada correctamente.");
    window.location.href = "historial.html";
  });
}

const listaHistorial = document.getElementById("lista-historial");
const historialVacio = document.getElementById("historial-vacio");

function obtenerHistorial() {
  return JSON.parse(localStorage.getItem("historialCompras")) || [];
}

function mostrarHistorial() {
  if (!listaHistorial) return;

  const historial = obtenerHistorial();

  listaHistorial.innerHTML = "";

  if (historial.length === 0) {
    if (historialVacio) historialVacio.style.display = "block";
    return;
  }

  if (historialVacio) historialVacio.style.display = "none";

historial.forEach(pedido => {
  const productosComprados = pedido.productos
    .map(producto => `
      <li>
        ${producto.nombre} x${producto.cantidad}
        - $${(producto.precio * producto.cantidad).toLocaleString("es-AR")}
      </li>
    `)
    .join("");

  const cantidadProductos = pedido.productos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );


    listaHistorial.innerHTML += `
      <article class="pedido">
        <h3>Pedido #${pedido.id}</h3>
        <p><strong>Fecha:</strong> ${pedido.fechaCompra}</p>
        <p><strong>Comprador:</strong> ${pedido.comprador.nombre}</p>
        <p><strong>Email:</strong> ${pedido.comprador.email}</p>
        <p><strong>Teléfono:</strong> ${pedido.comprador.telefono}</p>
        <p><strong>Envío:</strong> ${pedido.envio.metodo}</p>
        <p><strong>Fecha de entrega/retiro:</strong> ${pedido.envio.fechaEntrega}</p>
        <p><strong>Medio de pago:</strong> ${pedido.medioPago}</p>
        <h4>Productos:</h4>
        <ul>${productosComprados}</ul>
        <p><strong>Cantidad de productos:</strong> ${cantidadProductos}</p>
        <p><strong>Total:</strong> $${pedido.total.toLocaleString("es-AR")}</p>
        <button class="editar-pedido" data-id="${pedido.id}">Editar</button>
        <button class="eliminar-pedido" data-id="${pedido.id}">Eliminar</button>
      </article>
    `;
  });
}

if (listaHistorial) {
  mostrarHistorial();

  listaHistorial.addEventListener("click", event => {
    const id = Number(event.target.dataset.id);

    if (event.target.classList.contains("eliminar-pedido")) {
      eliminarPedido(id);
    }

    if (event.target.classList.contains("editar-pedido")) {
      editarPedido(id);
    }
  });
}

function eliminarPedido(id) {
  if (!confirm("¿Seguro que desea eliminar esta compra?")) return;

  const historial = obtenerHistorial().filter(
    pedido => pedido.id !== id
  );

  localStorage.setItem(
    "historialCompras",
    JSON.stringify(historial)
  );

  mostrarHistorial();
}

function editarPedido(id) {
  const historial = obtenerHistorial();
  const pedido = historial.find(pedido => pedido.id === id);

  if (!pedido) return;

  const nuevoNombre = prompt(
    "Ingrese el nuevo nombre y apellido:",
    pedido.comprador.nombre
  );

  if (nuevoNombre === null) return;

  if (nuevoNombre.trim().length < 3) {
    alert("Ingrese un nombre válido.");
    return;
  }

  const nuevoTelefono = prompt(
    "Ingrese el nuevo teléfono:",
    pedido.comprador.telefono
  );

  if (nuevoTelefono === null) return;

  if (!/^[0-9]{8,15}$/.test(nuevoTelefono.trim())) {
    alert("Ingrese un teléfono válido.");
    return;
  }

  pedido.comprador.nombre = nuevoNombre.trim();
  pedido.comprador.telefono = nuevoTelefono.trim();

  localStorage.setItem(
    "historialCompras",
    JSON.stringify(historial)
  );

  mostrarHistorial();
  alert("Compra modificada correctamente.");
}

actualizarContador();

